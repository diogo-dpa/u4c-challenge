import { User } from "../config/entities/User";
import { IUserService } from "../iservices/IUserService";
import { UserRepository } from "../repositories/UserRepository";
import {
	INVALID_ADDRESS_ID_ERROR_MESSAGE,
	USER_NOT_FOUND_ERROR_MESSAGE,
} from "../utils/consts";
import { FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE } from "../utils/consts";
import { AddressData, DocumentData } from "../utils/interfaces";
import { AddressService } from "./AddressService";
import { DocumentService } from "./DocumentService";

export class UserService implements IUserService {
	private _userRepository: UserRepository;
	private _documentService: DocumentService;
	private _addressService: AddressService;
	constructor(
		userRepository: UserRepository,
		documentService: DocumentService,
		addressService: AddressService
	) {
		this._userRepository = userRepository;
		this._documentService = documentService;
		this._addressService = addressService;
	}
	public async getUser(id: number): Promise<User> {
		const foundUser = await this._userRepository.getUser(id);

		if (!foundUser) throw Error(USER_NOT_FOUND_ERROR_MESSAGE);

		return foundUser;
	}

	public async deleteUser(id: number): Promise<void> {
		const userDataFound = await this._userRepository.getUser(id);

		if (!userDataFound) throw Error(USER_NOT_FOUND_ERROR_MESSAGE);

		const { addresses, document } = userDataFound;

		await this._userRepository.deleteUser(id);

		if (addresses.length > 0) {
			const addressPromises = addresses.map((addr) =>
				this._addressService.deleteAddress(addr.id)
			);
			Promise.all([...addressPromises]);
		}

		if (document.id) {
			await this._documentService.deleteDocument(document.id);
		}
	}

	async saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
		documentData: DocumentData,
		addressData: AddressData
	): Promise<User> {
		const { cpf, rg, cnh, passport } = documentData;

		const existsUserByDocument = await this._documentService.getDocumentByCPF(
			documentData.cpf
		);

		let userResult = {} as User;

		if (
			existsUserByDocument?.user?.id &&
			existsUserByDocument?.user?.isThirdPartyUser
		) {
			userResult = await this._userRepository.updateUser(
				existsUserByDocument.user.id,
				{
					isThirdPartyUser: false,
				}
			);
		} else {
			const createdDocument = await this._documentService.saveDocument(
				rg,
				cpf,
				cnh,
				passport
			);

			userResult = await this._userRepository.saveUser(
				fullName,
				birthDate,
				email,
				cellphone,
				isThirdPartyUser,
				addressData,
				createdDocument.id
			);
		}

		return userResult;
	}

	public async updateUser(id: number, newUserData: User): Promise<User> {
		const { fullName, birthDate, addresses } = newUserData;

		if (!!fullName || !!birthDate)
			throw Error(FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE);

		let userData = {
			...newUserData,
		};

		if (addresses.length > 0) {
			const a = addresses.map((add) => Object.entries(add));
			if (
				addresses
					.map((add) =>
						Object.entries(add)
							.flat()
							.some((key) => key[0] === "id" && !!key[1])
					)
					.some((f) => f)
			)
				throw Error(INVALID_ADDRESS_ID_ERROR_MESSAGE);

			const addressFoundPromises = addresses.map((x) =>
				this._addressService.getAddress(x.id)
			);

			const addressFoundResult = await Promise.all([...addressFoundPromises]);

			const updatedAddresses = addresses.map((o) => {
				const completeDataAddressFound = addressFoundResult.find(
					(x) => x.id === o.id
				);
				return {
					...o,
					...completeDataAddressFound,
				};
			});

			userData = {
				...newUserData,
				addresses: [...updatedAddresses],
			};
		}

		return await this._userRepository.updateUser(id, userData);
	}
}
