import { User } from "../config/entities/User";

export interface DocumentData {
	rg: string;
	cpf: string;
	cnh: string;
	passport?: string;
}

export interface AddressData {
	zipcode: string;
	street: string;
	number: number;
	complement?: string;
	state: string;
	country: string;
	neighborhood: string;
}

export interface UserData {
	fullName: string;
	birthDate: string;
	email: string;
	isThirdPartyUser: boolean;
	cellphone: string;
	documents: DocumentData;
	address: AddressData;
}

export interface UserDataUpdate {
	email?: string;
	isThirdPartyUser?: boolean;
	cellphone?: string;
	addresses?: AddressData[];
}

export interface EventData {
	clientId?: number;
	vehicleId?: number;
	occurenceType: number;
	occurenceDate?: string;
	occurenceCost?: number;
	thirdPartyUser?: UserData[];
	address?: AddressData;
}
