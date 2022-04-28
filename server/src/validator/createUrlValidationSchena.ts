import { YupShape } from 'src/models/YupShape';
import * as yup from 'yup';

import { ShortCodeDTO } from 'src/models/dto/shortCodeDTO';

export const patchRuleValidationScheme = yup.object().shape<YupShape<Partial<ShortCodeDTO>>>({
  url: yup.string().url().required('Url is required'),
  autoGenerate: yup.boolean().required('Auto generate is required'),
  short_code: yup.string().when("autoGenerate", { is: (autoGenerate: boolean) => !autoGenerate, then: yup.string().min(4, 'Name must be at least 4 characters').matches(/[A-Z0-9]*/, "Name must be character or number") }).nullable()
});