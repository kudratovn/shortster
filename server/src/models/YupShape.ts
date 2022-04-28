import { AnySchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import Reference from 'yup/lib/Reference';

export type YupShape<T> = {
  [K in keyof T]: AnySchema | Reference | Lazy<any, any>;
};