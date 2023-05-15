export interface DocumentData {
	rg: string;
	cpf: string;
	cnh: string;
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
