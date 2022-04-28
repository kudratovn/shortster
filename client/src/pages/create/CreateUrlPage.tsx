import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { ShortCodeDTO } from "../../models/dto/ShortCodeDTO";

export type CreateUrlPageProps = {};
export const CreateUrlPage: React.FC<CreateUrlPageProps> = () => {
  const initialValues: ShortCodeDTO = {
    url: "",
    autoGenerate: true,
    short_code: null
  }

  const validationSchema = yup.object().shape({
    url: yup.string().url().required('Url is required'),
    autoGenerate: yup.boolean().required('Auto generate is required'),
    short_code: yup.string().when("autoGenerate", { is: false, then: yup.string().min(4, 'Name must be at least 4 characters').matches(/[^a-zA-Z0-9]/, "Name must be character or number").required('Short code is required') })
  });
  return <>
    <main className="create-url ctn-center">
      <section className="container">

      </section>
    </main>
  </>
};