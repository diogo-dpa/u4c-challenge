export const idParamsInputMock = 1;

export const saveVehicleInputRequest = {
	brand: "Fiat",
	model: "Uno",
	mileage: 40000,
	chassis: "XXX",
	fabricationYear: 2009,
	modelYear: 2009,
	plate: "XXX1111",
} as any;

export const successVehicleResponseFromDataBase = {
	id: 1,
	createdAt: "2023-05-17T23:27:55.440Z",
	updatedAt: "2023-05-17T23:27:55.440Z",
	...saveVehicleInputRequest,
} as any;
