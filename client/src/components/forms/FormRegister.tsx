import { Formik, Field, ErrorMessage } from "formik";
import yupRegisterSchema from "../../schemas/yupRegisterSchema";
import { useState } from "react";
import axios from "axios";
import SHA256 from "crypto-js/sha256"

function getSha256(text: string) {
  return SHA256(text).toString();
}

function FormRegister() {
  const [isFormValid, setFormValid] = useState(false);
  return (
    <Formik
      initialValues={{
        name: "",
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={yupRegisterSchema}
      validationOnInput
      onSubmit={(values) => {
        try
        {
          axios.post("http://localhost:3000/users",{
            login : values.login,
            email : values.email,
            password: getSha256(values.password)
          });
          console.log("Data: ", values);
        } 
        catch(e){
          console.log(e);
        }
      }}
    >
      {({ values, errors, touched, isValid, handleSubmit }) => {
        setFormValid(isValid);
        return (
          <form onSubmit={handleSubmit} className="container" noValidate>
            <h2 className="text-center mb-4">Реєстрація</h2>

            <div className="form-group">
              <label htmlFor="name">Ім'я</label>
              <Field
                name="name"
                type="text"
                className={`form-control ${
                  touched.name && errors.name ? "is-invalid" : ""
                }`}
                id="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login">Логін</label>
              <Field
                name="login"
                type="text"
                className={`form-control ${
                  touched.login && errors.login ? "is-invalid" : ""
                }`}
                id="login"
              />
              <ErrorMessage
                name="login"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                id="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field
                name="password"
                type="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                id="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Підтвердження пароля</label>
              <Field
                name="confirmPassword"
                type="password"
                className={`form-control ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                id="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary mt-4 ${!isFormValid && "disabled"}`}
              disabled={!isFormValid}
            >
              OK
            </button>
          </form>
        );
      }}
    </Formik>
  );
}
export default FormRegister;
