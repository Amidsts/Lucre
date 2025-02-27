import * as joi from 'joi';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidateInputPipe implements PipeTransform {
    private schema;
    constructor(schema: joi.ObjectSchema<any>);
    transform(data: any, _metadata: ArgumentMetadata): any;
}
export declare const createWalletSchema: joi.ObjectSchema<any>;
