import { User } from "../entities/User";
import {
	AddressData,
	DocumentData,
	IUserService,
} from "../iservices/IUserService";
import { UserRepository } from "../repositories/UserRepository";
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

	async saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		isThirdPartyUser: boolean,
		cellphone: string,
		documentData: DocumentData,
		addressData: AddressData
	): Promise<User> {
		const { cpf, rg, cnh } = documentData;

		const {
			zipcode,
			street,
			number,
			complement,
			state,
			country,
			neighborhood,
		} = addressData;

		const createdAddress = await this._addressService.saveAddress(
			zipcode,
			street,
			number,
			state,
			country,
			neighborhood,
			complement
		);

		const createdDocument = await this._documentService.saveDocument(
			rg,
			cpf,
			cnh
		);

		const result = await this._userRepository.saveUser(
			fullName,
			birthDate,
			email,
			isThirdPartyUser,
			cellphone,
			createdAddress.id,
			createdDocument.id
		);
		return result;
	}
}
