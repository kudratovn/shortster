import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { urlService } from "../../services/Url";
import { STATUSES, TypeStatuses } from "../../constants/server";
import { Header } from "../../components/Header";

export type RedirectPageProps = {};
export const RedirectPage: React.FC<RedirectPageProps> = () => {
  const [status, setStatus] = useState<TypeStatuses | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const initialValues = {
    short_code: ""
  };

  const validationSchema = yup.object().shape({
    short_code: yup.string().min(4, 'Name must be at least 4 characters').matches(/[A-Z0-9]*/, "Name must be character or number")
  });

  async function onSubmit(values: typeof initialValues) {
    const payload = {
      short_code: values.short_code
    }
    const res = await urlService.redirect(payload.short_code);
    setStatus(res.status);
    if(res.status === STATUSES.SUCCESS) {
      // @ts-ignore
      setRedirectUrl(res.data);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if(status === STATUSES.ERROR) {
      formik.setFieldError("short_code", "Shot code is invalid.")
    }
  }, [status])

  useEffect(() => {
    if(redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl])

  return <>
    <Header />
    <main className="create-url">
    <section>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <h1>Redirect with short code</h1>
          <div className="form-item">
            <label htmlFor="short_code">Enter the code</label>
            <input 
              type="text" 
              name="short_code"
              onChange={formik.handleChange}
              value={formik.values.short_code}
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
              <button type="submit">Redirect</button>
            </div>
        </form>
      </div>
    </section>
  </main>
  </>
};