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
		fullName: Joi.string().optional().min(2).max(10),
		birthDate: Joi.string().optional(),
		email: Joi.string().email().optional(),
		cellphone: Joi.string().optional(),
		isThirdPartyUser: Joi.boolean().optional(),
		address: Joi.object({
			id: Joi.number().optional(),
			zipcode: Joi.string().optional().min(8).max(8),
			street: Joi.string().optional().min(5).max(50),
			number: Joi.number().optional(),
			complement: Joi.string().optional().max(50),
			state: Joi.string().optional().min(2).max(50),
			country: Joi.string().optional().min(4).max(50),
			neighborhood: Joi.string().optional().min(2).max(50),
		}).optional(),
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
		brand: Joi.string().min(2).max(10).required(),
		model: Joi.string().min(2).max(10).required(),
		fabricationYear: Joi.number().required(),
		modelYear: Joi.number().required(),
		chassis: Joi.string().min(17).max(17).required(),
		plate: Joi.string().min(7).max(7).required(),
		mileage: Joi.number().required(),
		owner: Joi.string().required(),
	});

export const bodyVehicleUpdateValidator = () =>
	Joi.object({
		brand: Joi.string().min(2).max(10).optional(),
		model: Joi.string().min(2).max(10).optional(),
		fabricationYear: Joi.number().optional(),
		modelYear: Joi.number().optional(),
		chassis: Joi.string().min(17).max(17).optional(),
		plate: Joi.string().min(7).max(7).optional(),
		mileage: Joi.number().optional(),
		ownerId: Joi.string().optional(),
	});

export const generalParamsIdValidator = () =>
	Joi.object({
		id: Joi.string().required(),
	});
