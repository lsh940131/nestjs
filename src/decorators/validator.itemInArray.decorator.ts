import { Type } from "@nestjs/common";
import { ValidationOptions, registerDecorator } from "class-validator";

/**
 * 특정값만 들어오게
 * @param {Array<any>} conditions
 * @param {?ValidationOptions} [validationOptions]
 * @returns {(object: any, propertyName: string) => void}
 */
export const ValidateItemInArray = (conditions: Array<any>, validationOptions?: ValidationOptions) => {
	return (object: Record<string, any>, propertyName: string) => {
		registerDecorator({
			name: "ValidateItemInArray",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: {
				message: `Invalid input value. You must input the '${propertyName}' one of [${conditions.join()}]`,
				...validationOptions,
			},
			validator: {
				validate(value: Type) {
					const result = conditions.find((x) => x === value);
					return result ? true : false;
				},
			},
		});
	};
};
