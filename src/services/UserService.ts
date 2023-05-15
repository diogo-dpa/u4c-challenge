import { User } from "../config/entities/User";
import { IUserService } from "../iservices/IUserService";
import { UserRepository } from "../repositories/UserRepository";
import { AddressData, DocumentData } from "../utils/interfaces";
import { AddressService } from "./AddressService";
import { DocumentService } from "./DocumentService";

export class UserService implements IUserService {
	private _userRepository: UserRepository;
	private _documentService: DocumentService;
	constructor(
		userRepository: UserRepository,
		documentService: DocumentService,
		addressService: AddressService
	) {
		this._userRepository = userRepository;
		this._documentService = documentService;
	}
	public async getUser(id: number): Promise<User> {
		return await this._userRepository.getUser(id);
	}

	public async deleteUser(id: number): Promise<void> {
		await this._userRepository.deleteUser(id);
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

		const createdDocument = await this._documentService.saveDocument(
			rg,
			cpf,
			cnh
		);

		const result = await this._userRepository.saveUser(
			fullName,
			birthDate,
			email,
			cellphone,
			isThirdPartyUser,
			addressData,
			createdDocument.id
		);
		return result;
	}

	public async updateUser(
		id: number,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean
	): Promise<User> {
		return await this._userRepository.updateUser(
			id,
			email,
			isThirdPartyUser,
			cellphone
		);
	}
}
