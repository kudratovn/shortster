import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import * as Yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

import { yupToFormErrors } from './TestYup';

@Injectable()
export class YupValidationPipe<T extends ObjectShape> implements PipeTransform {
  constructor(private readonly schema: Yup.ObjectSchema<T>) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    let errors: any = null;
    if (metadata.type !== 'body') {
      return value;
    }
    try {
      const result = await this.schema.validate(value, { abortEarly: false });
      return result;
    } catch (error) {
      errors = yupToFormErrors(error);
    }
    throw new BadRequestException('', errors);
  }
}