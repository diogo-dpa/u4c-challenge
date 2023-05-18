export const idParamsInputMock = 1;

const saveEventCoreData = {
	occurenceType: 1,
	eventDate: "2023-05-10T00:28:17.937Z",
	eventCost: 30000,
	thirdPartyUsers: [
		{
			fullName: "José",
			birthDate: "2000-02-10T00:28:17.937Z",
			email: "jose@email.com",
			cellphone: "31997222498",
			documents: {
				rg: "AAA",
				cpf: "BBB",
				cnh: "CCC",
			},
			address: {
				zipcode: "30492025",
				street: "Rua Principal",
				number: 1,
				state: "MG",
				country: "Brazil",
				neighborhood: "Centro",
				complement: "Esquina",
			},
		},
	],
	address: {
		zipcode: "30300300",
		street: "Rua Principal 2",
		number: 10,
		state: "MG",
		country: "Brazil",
		neighborhood: "Pampulha",
		complement: "Perto do bar",
	},
};

export const saveEventInputRequest = {
	clientId: 1,
	vehicleId: 1,
	...saveEventCoreData,
} as any;

export const successGetUserResponseFromDatabase = {
	id: 2,
	createdAt: "2023-05-19T00:00:04.808Z",
	updatedAt: "2023-05-19T00:00:04.808Z",
	fullName: "José",
	birthDate: "2000-02-10T00:28:17.937Z",
	email: "jose@email.com",
	isThirdPartyUser: false,
	cellphone: "31997222498",
	document: {
		id: 1,
		createdAt: "2023-05-19T00:00:04.795Z",
		updatedAt: "2023-05-19T00:00:04.795Z",
		rg: "AAA",
		cpf: "BBB",
		cnh: "CCC",
		passport: "",
	},
	addresses: [
		{
			id: 1,
			createdAt: "2023-05-19T00:00:04.808Z",
			updatedAt: "2023-05-19T00:00:04.808Z",
			zipcode: "30492025",
			street: "Rua Principal",
			number: 1,
			complement: "Esquina",
			state: "MG",
			country: "Brazil",
			neighborhood: "Centro",
		},
	],
} as any;

export const successGetVehicleResponseFromDatabase = {
	id: 1,
	createdAt: "2023-05-19T00:00:09.867Z",
	updatedAt: "2023-05-19T00:00:09.867Z",
	brand: "Fiat",
	model: "Uno",
	fabricationYear: 2016,
	modelYear: 2016,
	chassis: "12345678912345678",
	plate: "AAA1234",
	mileage: 10000,
	owner: {
		...successGetUserResponseFromDatabase,
	},
} as any;

export const successGetDocumentResponseFromDatabase = {
	id: 1,
	createdAt: "2023-05-19T00:00:04.795Z",
	updatedAt: "2023-05-19T00:00:04.795Z",
	rg: "AAA",
	cpf: "BBB",
	cnh: "CCC",
	passport: "",
	user: {
		fullName: "José",
		birthDate: "2000-02-10T00:28:17.937Z",
		email: "jose@email.com",
		isThirdPartyUser: false,
		cellphone: "31997222498",
		id: 2,
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

export const successSaveThirdPartyUserResponseFromDataBase = {
	id: 2,
	createdAt: "2023-05-19T00:00:04.808Z",
	updatedAt: "2023-05-19T00:00:04.808Z",
	fullName: "José",
	birthDate: "2000-02-10T00:28:17.937Z",
	email: "jose@email.com",
	isThirdPartyUser: false,
	cellphone: "31997222498",
	document: {
		id: 1,
		createdAt: "2023-05-19T00:00:04.795Z",
		updatedAt: "2023-05-19T00:00:04.795Z",
		rg: "AAA",
		cpf: "BBB",
		cnh: "CCC",
		passport: "",
	},
	addresses: [
		{
			id: 1,
			createdAt: "2023-05-19T00:00:04.808Z",
			updatedAt: "2023-05-19T00:00:04.808Z",
			zipcode: "30492025",
			street: "Rua Principal",
			number: 1,
			complement: "Esquina",
			state: "MG",
			country: "Brazil",
			neighborhood: "Centro",
		},
	],
} as any;

export const saveEventPostProcessedInput = {
	client: [
		{
			...successGetUserResponseFromDatabase,
		},
	],
	vehicles: [
		{
			...successGetVehicleResponseFromDatabase,
		},
	],
	occurenceType: 1,
	eventDate: "2023-05-10T00:28:17.937Z",
	eventCost: 30000,
	thirdPartyUser: [
		{
			id: 2,
			createdAt: "2023-05-19T00:00:04.808Z",
			updatedAt: "2023-05-19T00:00:04.808Z",
			fullName: "José",
			birthDate: "2000-02-10T00:28:17.937Z",
			email: "jose@email.com",
			cellphone: "31997222498",
			isThirdPartyUser: false,
			document: {
				id: 1,
				createdAt: "2023-05-19T00:00:04.795Z",
				updatedAt: "2023-05-19T00:00:04.795Z",
				rg: "AAA",
				cpf: "BBB",
				cnh: "CCC",
				passport: "",
			},
			addresses: [
				{
					createdAt: "2023-05-19T00:00:04.808Z",
					updatedAt: "2023-05-19T00:00:04.808Z",
					id: 1,
					zipcode: "30492025",
					street: "Rua Principal",
					number: 1,
					state: "MG",
					country: "Brazil",
					neighborhood: "Centro",
					complement: "Esquina",
				},
			],
		},
	],
	address: {
		zipcode: "30300300",
		street: "Rua Principal 2",
		number: 10,
		state: "MG",
		country: "Brazil",
		neighborhood: "Pampulha",
		complement: "Perto do bar",
	},
};

export const successEventResponseFromDatabase = {
	client: [{ ...successGetUserResponseFromDatabase }],
	vehicles: [
		{
			...successGetVehicleResponseFromDatabase,
		},
	],
	occurenceType: 1,
	eventDate: "2023-05-10T00:28:17.937Z",
	eventCost: 30000,
	address: {
		zipcode: "30300300",
		street: "Rua Principal 2",
		number: 10,
		state: "MG",
		country: "Brazil",
		neighborhood: "Pampulha",
		complement: "Perto do bar",
		id: 2,
		createdAt: "2023-05-19T00:00:18.448Z",
		updatedAt: "2023-05-19T00:00:18.448Z",
	},
	thirdPartyUser: [
		{
			...successSaveThirdPartyUserResponseFromDataBase,
		},
	],
	id: 1,
	createdAt: "2023-05-19T00:00:18.448Z",
	updatedAt: "2023-05-19T00:00:18.448Z",
} as any;
