import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { urlService } from "../../services/Url";
import { STATUSES, TypeStatuses } from "../../constants/server";
import { Header } from "../../components/Header";
import { Url } from "../../models/Urls";

export type GetUrlPageProps = {};
export const GetUrlPage: React.FC<GetUrlPageProps> = () => {
  const [status, setStatus] = useState<TypeStatuses | null>(null);
  const [url, setUrl] = useState<Url | null>(null);
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
    const res = await urlService.get(payload.short_code);
    setStatus(res.status);
    console.log('data', res)
    if(res.status === STATUSES.SUCCESS) {
      // @ts-ignore
      setUrl(res.data);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if(status === STATUSES.ERROR) {
      formik.setFieldError("short_code", "Short code is invalid.")
    }
  }, [status]);

  const handleReset = () => {
    setStatus(null);
    setUrl(null);
    formik.setFieldValue("short_code", "");
  }

  return <>
    <Header />
    <main className="create-url">
    <section>
      <div className="container">
        {url ? 
          <div className="result-container">
            <h1>Short code retrieved</h1>
            <div className="url-items">
              <div className="url-item">
                <span>Registered at:</span>
                {/* @ts-ignore */}
                <span>{moment(url.created_at).format('lll')}</span>
              </div>
              <div className="url-item">
                <span>Last access:</span>
                {/* @ts-ignore */}
                <span>{url.times_redeemed > 0 ? moment(url.updated_at).format('lll') : 'Not used'}</span>
              </div>
              <div className="url-item">
                <span>Used times:</span>
                <span>{url.times_redeemed}</span>
              </div>
            </div>
            <br />
            <div className="form-item-btn">
              <button onClick={handleReset}>Reset</button>
            </div>
          </div> : 
          <form onSubmit={formik.handleSubmit}>
            <h1>Get short code</h1>
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
                <button type="submit">Get</button>
              </div>
          </form>
        }
      </div>
    </section>
  </main>
  </>
};