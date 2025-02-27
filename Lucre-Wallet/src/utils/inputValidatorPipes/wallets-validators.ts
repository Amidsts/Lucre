import * as joi from 'joi';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { WalletCurrency } from 'src/utils/types/wallet.interface';

export class ValidateInputPipe implements PipeTransform {
  constructor(private schema: joi.ObjectSchema<any>) {}

  transform(data: any, _metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(data);
    if (error) {
      throw new BadRequestException(
        `Validation failed ${error.details[0].message}`,
      );
    }

    return value;
  }
}

export const createWalletSchema = joi.object({
  currency: joi
    .string()
    .valid(...Object.values(WalletCurrency))
    .required(),
  userId: joi.string(),
});

// export const getWalletSchema = Joi.object({
//   currency: Joi.string().valid(WalletCurrency).required(),
//   userId: Joi.string(),
// });
