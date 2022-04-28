import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { ShortCodeDTO } from "../../models/dto/ShortCodeDTO";

import { urlService } from "./../../services/Url";

export type CreateUrlPageProps = {};
export const CreateUrlPage: React.FC<CreateUrlPageProps> = () => {
  const initialValues: ShortCodeDTO = {
    url: "",
    autoGenerate: true,
    short_code: null
  };

  const validationSchema = yup.object().shape({
    url: yup.string().url().required('Url is required'),
    autoGenerate: yup.boolean().required('Auto generate is required'),
    short_code: yup.string().when("autoGenerate", { is: (autoGenerate: boolean) => !autoGenerate, then: yup.string().min(4, 'Name must be at least 4 characters').matches(/[A-Z0-9]*/, "Name must be character or number") }).nullable()
  });

  async function onSubmit(values: typeof initialValues) {
    const payload: ShortCodeDTO = {
      url: values.url,
      autoGenerate: values.autoGenerate,
      short_code: values.short_code
    }
    const res = await urlService.createUrl(payload);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if(formik.values.short_code) {
      formik.setFieldValue("autoGenerate", false);
    } else {
      formik.setFieldValue("autoGenerate", true);
    }
  }, [formik.values.short_code])

  return <>
    <main className="create-url">
      <section>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <h1>Create short code</h1>
            <div className="form-item">
              <label htmlFor="url">Url</label>
              <input 
                type="text" 
                name="url"
                onChange={formik.handleChange}
                value={formik.values.url}
              />
            </div>
            <div className="form-item">
              <label htmlFor="short_code">Short name</label>
              <input 
                type="text" 
                name="short_code"
                onChange={formik.handleChange}
                value={formik.values.short_code || ""}
              />
            </div>
            {Object.keys(formik.errors).length > 0 && (
              <>
                <div className="lgn-error">
                  {Object.keys(formik.touched).map((key) => (
                    <div key={key}>
                      {/* @ts-ignore */}
                      <p className="lgn-error-p">{formik.errors[key]}</p>
                    </div>
                  ))}
                </div>
              </>
              )}
              <div className="form-item-btn">
                <button type="submit">Generate</button>
              </div>
          </form>
        </div>
      </section>
    </main>
  </>
};