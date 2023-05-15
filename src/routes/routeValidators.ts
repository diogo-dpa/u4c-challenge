import Joi from "joi";

export const bodyUserCreateValidator = () =>
	Joi.object({
		fullName: Joi.string().min(2).max(10).required(),
		birthDate: Joi.string().required(),
		email: Joi.string().email().required(),
		cellphone: Joi.string().optional(),
		isThirdPartyUser: Joi.boolean().required(),
		documents: Joi.object({
			rg: Joi.string().min(8).max(8).required(),
			cpf: Joi.string().min(11).max(11).required(),
			cnh: Joi.string().min(10).max(10).required(),
			passport: Joi.string().optional(),
		}).required(),
		address: Joi.object({
			zipcode: Joi.string().min(8).max(8).required(),
			street: Joi.string().min(5).max(50).required(),
			number: Joi.number().required(),
			complement: Joi.string().max(50).optional(),
			state: Joi.string().min(2).max(50).required(),
			country: Joi.string().min(4).max(50).required(),
			neighborhood: Joi.string().min(2).max(50).required(),
		}).required(),
	});

export const bodyUserUpdateValidator = () =>
	Joi.object({
		email: Joi.string().email().optional(),
		cellphone: Joi.string().optional(),
		isThirdPartyUser: Joi.boolean().optional(),
	});

export const bodyEventCreateValidator = () =>
	Joi.object({
		clientId: Joi.string().min(2).max(10),
		vehicleId: Joi.string().isoDate().required(),
		occurenceType: Joi.string().required(),
		occurenceDate: Joi.string().isoDate().required(),
		thirdPartyUsers: Joi.array()
			.items(
				Joi.object({
					fullName: Joi.string().min(2).max(10),
					birthDate: Joi.string().isoDate().required(),
					email: Joi.string().email().optional(),
					cellphone: Joi.string().optional(),
					isThirdPartyEvent: Joi.string().email().optional(),
					documents: Joi.object({
						rg: Joi.string().min(8).max(8).optional(),
						cpf: Joi.string().min(11).max(11).optional(),
						cnh: Joi.string().min(10).max(10).optional(),
						passport: Joi.string().optional(),
					}).optional(),
					address: Joi.object({
						zipcode: Joi.string().min(8).max(8).optional(),
						street: Joi.string().min(5).max(50).optional(),
						number: Joi.number().optional(),
						complement: Joi.string().max(50).optional(),
						state: Joi.string().min(5).max(50).optional(),
						country: Joi.string().min(4).max(50).optional(),
						neighborhood: Joi.string().min(2).max(50).optional(),
					}).required(),
				})
			)
			.optional(),
	});

export const bodyEventUpdateValidator = () =>
	Joi.object({
		clientId: Joi.string().min(2).max(10),
		vehicleId: Joi.string().isoDate().required(),
		occurenceType: Joi.string().required(),
		occurenceDate: Joi.string().isoDate().required(),
		thirdPartyUsers: Joi.array()
			.items(
				Joi.object({
					fullName: Joi.string().min(2).max(10),
					birthDate: Joi.string().isoDate().required(),
					email: Joi.string().email().optional(),
					cellphone: Joi.string().optional(),
					isThirdPartyEvent: Joi.string().email().optional(),
					documents: Joi.object({
						rg: Joi.string().min(8).max(8).optional(),
						cpf: Joi.string().min(11).max(11).optional(),
						cnh: Joi.string().min(10).max(10).optional(),
						passport: Joi.string().optional(),
					}).optional(),
					address: Joi.object({
						zipcode: Joi.string().min(8).max(8).optional(),
						street: Joi.string().min(5).max(50).optional(),
						number: Joi.number().optional(),
						complement: Joi.string().max(50).optional(),
						state: Joi.string().min(5).max(50).optional(),
						country: Joi.string().min(4).max(50).optional(),
						neighborhood: Joi.string().min(2).max(50).optional(),
					}).required(),
				})
			)
			.optional(),
	});

export const bodyOccurenceTypeCreateUpdateValidator = () =>
	Joi.object({
		type: Joi.string().required(),
	});

export const bodyVehicleCreateValidator = () =>
	Joi.object({
		brand: Joi.string().min(2).max(10),
		model: Joi.string().isoDate().required(),
		fabricationYear: Joi.string().email().required(),
		modelYear: Joi.string().optional(),
		chassis: Joi.string().email().required(),
		plate: Joi.string().email().required(),
		mileage: Joi.string().email().required(),
		ownerId: Joi.string().email().required(),
	});

export const bodyVehicleUpdateValidator = () =>
	Joi.object({
		brand: Joi.string().min(2).max(10).optional(),
		model: Joi.string().isoDate().optional(),
		fabricationYear: Joi.string().email().optional(),
		modelYear: Joi.string().optional(),
		chassis: Joi.string().email().optional(),
		plate: Joi.string().email().optional(),
		mileage: Joi.string().email().optional(),
		ownerId: Joi.string().email().optional(),
	});

export const generalParamsIdValidator = () =>
	Joi.object({
		id: Joi.string().required(),
	});
