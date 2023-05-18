import Joi from "joi";
import {
	CHASSIS_CHARACTERS_LIMIT,
	CNH_CHARACTERS_LIMIT,
	CPF_CHARACTERS_LIMIT,
	MAX_BRAND_MODEL_CHARACTERS_LIMIT,
	MAX_CHARACTERS_NAME,
	MAX_COMMON_STRING_CHARACTERS_LIMIT,
	MIN_BRAND_MODEL_CHARACTERS_LIMIT,
	MIN_CHARACTERS_NAME,
	MIN_COMMON_STRING_CHARACTERS_LIMIT,
	MIN_STATE_CHARACTERS_LIMIT,
	RG_CHARACTERS_LIMIT,
	VEHICLE_PLATE_CHARACTERS_LIMIT,
	ZIPCODE_CHARACTERS_LIMIT,
} from "../utils/consts";

export const bodyUserCreateValidator = () =>
	Joi.object({
		fullName: Joi.string()
			.min(MIN_CHARACTERS_NAME)
			.max(MAX_CHARACTERS_NAME)
			.required(),
		birthDate: Joi.string().required(),
		email: Joi.string().email().required(),
		cellphone: Joi.string().optional(),
		isThirdPartyUser: Joi.boolean().required(),
		documents: Joi.object({
			rg: Joi.string()
				.min(RG_CHARACTERS_LIMIT)
				.max(RG_CHARACTERS_LIMIT)
				.required(),
			cpf: Joi.string()
				.min(CPF_CHARACTERS_LIMIT)
				.max(CPF_CHARACTERS_LIMIT)
				.required(),
			cnh: Joi.string()
				.min(CNH_CHARACTERS_LIMIT)
				.max(CNH_CHARACTERS_LIMIT)
				.required(),
			passport: Joi.string().optional(),
		}).required(),
		address: Joi.object({
			zipcode: Joi.string()
				.min(ZIPCODE_CHARACTERS_LIMIT)
				.max(ZIPCODE_CHARACTERS_LIMIT)
				.required(),
			street: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
			number: Joi.number().required(),
			complement: Joi.string()
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
			state: Joi.string()
				.min(MIN_STATE_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
			country: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
			neighborhood: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
		}).required(),
	});

export const bodyUserUpdateValidator = () =>
	Joi.object({
		fullName: Joi.string()
			.optional()
			.min(MIN_CHARACTERS_NAME)
			.max(MAX_CHARACTERS_NAME),
		birthDate: Joi.string().optional(),
		email: Joi.string().email().optional(),
		cellphone: Joi.string().optional(),
		isThirdPartyUser: Joi.boolean().optional(),
		address: Joi.object({
			id: Joi.number().optional(),
			zipcode: Joi.string()
				.optional()
				.min(ZIPCODE_CHARACTERS_LIMIT)
				.max(ZIPCODE_CHARACTERS_LIMIT),
			street: Joi.string()
				.optional()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
			number: Joi.number().optional(),
			complement: Joi.string()
				.optional()
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
			state: Joi.string()
				.optional()
				.min(MIN_STATE_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
			country: Joi.string()
				.optional()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
			neighborhood: Joi.string()
				.optional()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
		}).optional(),
	});

export const bodyEventCreateValidator = () =>
	Joi.object({
		clientId: Joi.number().required(),
		vehicleId: Joi.number().required(),
		occurenceType: Joi.number().required(),
		occurenceDate: Joi.string().required(),
		occurenceCost: Joi.number().required(),
		thirdPartyUsers: Joi.array()
			.items(
				Joi.object({
					fullName: Joi.string()
						.min(MIN_CHARACTERS_NAME)
						.max(MAX_CHARACTERS_NAME)
						.required(),
					birthDate: Joi.string().required(),
					email: Joi.string().email().required(),
					cellphone: Joi.string().optional(),
					documents: Joi.object({
						rg: Joi.string()
							.min(RG_CHARACTERS_LIMIT)
							.max(RG_CHARACTERS_LIMIT)
							.required(),
						cpf: Joi.string()
							.min(CPF_CHARACTERS_LIMIT)
							.max(CPF_CHARACTERS_LIMIT)
							.required(),
						cnh: Joi.string()
							.min(CNH_CHARACTERS_LIMIT)
							.max(CNH_CHARACTERS_LIMIT)
							.required(),
						passport: Joi.string().optional(),
					}).required(),
					address: Joi.object({
						zipcode: Joi.string()
							.min(ZIPCODE_CHARACTERS_LIMIT)
							.max(ZIPCODE_CHARACTERS_LIMIT)
							.required(),
						street: Joi.string()
							.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
							.required(),
						number: Joi.number().required(),
						complement: Joi.string()
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
							.optional(),
						state: Joi.string()
							.min(MIN_STATE_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
							.required(),
						country: Joi.string()
							.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
							.required(),
						neighborhood: Joi.string()
							.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
							.required(),
					}).required(),
				})
			)
			.optional(),
		address: Joi.object({
			zipcode: Joi.string()
				.min(ZIPCODE_CHARACTERS_LIMIT)
				.max(ZIPCODE_CHARACTERS_LIMIT)
				.required(),
			street: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
			number: Joi.number().required(),
			complement: Joi.string()
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
			state: Joi.string()
				.min(MIN_STATE_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
			country: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
			neighborhood: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.required(),
		}).required(),
	});

export const bodyEventUpdateValidator = () =>
	Joi.object({
		occurenceType: Joi.number().optional(),
		occurenceDate: Joi.string().isoDate().optional(),
		occurenceCost: Joi.number().optional(),
		thirdPartyUsers: Joi.array()
			.items(
				Joi.object({
					email: Joi.string().email().optional(),
					cellphone: Joi.string().optional(),
					documents: Joi.object({
						rg: Joi.string()
							.min(RG_CHARACTERS_LIMIT)
							.max(RG_CHARACTERS_LIMIT)
							.optional(),
						cpf: Joi.string()
							.min(CPF_CHARACTERS_LIMIT)
							.max(CPF_CHARACTERS_LIMIT)
							.optional(),
						cnh: Joi.string()
							.min(CNH_CHARACTERS_LIMIT)
							.max(CNH_CHARACTERS_LIMIT)
							.optional(),
						passport: Joi.string().optional(),
					}).optional(),
					address: Joi.object({
						id: Joi.number().optional(),
						zipcode: Joi.string()
							.optional()
							.min(ZIPCODE_CHARACTERS_LIMIT)
							.max(ZIPCODE_CHARACTERS_LIMIT),
						street: Joi.string()
							.optional()
							.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
						number: Joi.number().optional(),
						complement: Joi.string()
							.optional()
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
						state: Joi.string()
							.optional()
							.min(MIN_STATE_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
						country: Joi.string()
							.optional()
							.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
						neighborhood: Joi.string()
							.optional()
							.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
							.max(MAX_COMMON_STRING_CHARACTERS_LIMIT),
					}).optional(),
				})
			)
			.optional(),
		address: Joi.object({
			zipcode: Joi.string()
				.min(ZIPCODE_CHARACTERS_LIMIT)
				.max(ZIPCODE_CHARACTERS_LIMIT)
				.optional(),
			street: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
			number: Joi.number().optional(),
			complement: Joi.string()
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
			state: Joi.string()
				.min(MIN_STATE_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
			country: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
			neighborhood: Joi.string()
				.min(MIN_COMMON_STRING_CHARACTERS_LIMIT)
				.max(MAX_COMMON_STRING_CHARACTERS_LIMIT)
				.optional(),
		}).optional(),
	});

export const bodyOccurenceTypeCreateUpdateValidator = () =>
	Joi.object({
		type: Joi.string().required(),
	});

export const bodyVehicleCreateValidator = () =>
	Joi.object({
		brand: Joi.string()
			.min(MIN_BRAND_MODEL_CHARACTERS_LIMIT)
			.max(MAX_BRAND_MODEL_CHARACTERS_LIMIT)
			.required(),
		model: Joi.string()
			.min(MIN_BRAND_MODEL_CHARACTERS_LIMIT)
			.max(MAX_BRAND_MODEL_CHARACTERS_LIMIT)
			.required(),
		fabricationYear: Joi.number().required(),
		modelYear: Joi.number().required(),
		chassis: Joi.string()
			.min(CHASSIS_CHARACTERS_LIMIT)
			.max(CHASSIS_CHARACTERS_LIMIT)
			.required(),
		plate: Joi.string()
			.min(VEHICLE_PLATE_CHARACTERS_LIMIT)
			.max(VEHICLE_PLATE_CHARACTERS_LIMIT)
			.required(),
		mileage: Joi.number().required(),
		owner: Joi.number().required(),
	});

export const bodyVehicleUpdateValidator = () =>
	Joi.object({
		brand: Joi.string()
			.min(MIN_BRAND_MODEL_CHARACTERS_LIMIT)
			.max(MAX_BRAND_MODEL_CHARACTERS_LIMIT)
			.optional(),
		model: Joi.string()
			.min(MIN_BRAND_MODEL_CHARACTERS_LIMIT)
			.max(MAX_BRAND_MODEL_CHARACTERS_LIMIT)
			.optional(),
		fabricationYear: Joi.number().optional(),
		modelYear: Joi.number().optional(),
		chassis: Joi.string()
			.min(CHASSIS_CHARACTERS_LIMIT)
			.max(CHASSIS_CHARACTERS_LIMIT)
			.optional(),
		plate: Joi.string()
			.min(VEHICLE_PLATE_CHARACTERS_LIMIT)
			.max(VEHICLE_PLATE_CHARACTERS_LIMIT)
			.optional(),
		mileage: Joi.number().optional(),
		ownerId: Joi.number().optional(),
	});

export const generalParamsIdValidator = () =>
	Joi.object({
		id: Joi.string().required(),
	});
