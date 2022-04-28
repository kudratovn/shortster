import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as Yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
export declare class YupValidationPipe<T extends ObjectShape> implements PipeTransform {
    private readonly schema;
    constructor(schema: Yup.ObjectSchema<T>);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
