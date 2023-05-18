export const idParamsInputMock = 1;

export const successDocumentResponseFromDatabase = {
	id: 1,
	createdAt: "2023-05-17T23:27:55.440Z",
	updatedAt: "2023-05-17T23:27:55.440Z",
	cnh: "XXX",
	cpf: "YYY",
	rg: "WWW",
	passport: "LLL",
	user: {
		fullName: "João",
		birthDate: "2000-05-17T00:00:00.440Z",
		cellphone: "61 9999-9999",
		email: "joao@email.com",
		isThirdPartyUser: false,
		id: 1,
		addresses: {
			id: 1,
			createdAt: "2023-05-17T23:27:55.440Z",
			updatedAt: "2023-05-17T23:27:55.440Z",
			street: "Avenida do Contorno",
			zipcode: "30123456",
			country: "Brazil",
			complement: "Near the bakery",
			number: 302,
			neighborhood: "Centro",
			state: "MG",
		},
		createdAt: "2023-05-17T23:27:55.440Z",
		updatedAt: "2023-05-17T23:27:55.440Z",
	},
} as any;
