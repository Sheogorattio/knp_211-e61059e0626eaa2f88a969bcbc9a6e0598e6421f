import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { Formik, Field, ErrorMessage } from "formik";
import * as yupSchema from "../../schemas/yupAuth";

const StepOne = ({ onNext }: any) => {
  const [isValid, setIsValid] = useState(false);

  const onSubmit = (data: any) => {
    try{
      console.log(data);
      onNext(data);
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="row justify-content-center">
          <div className="col-6">
            <Formik
              initialValues={{ email: "", login: "" }}
              validationSchema={yupSchema.yupAuthSchemaOne}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, isValid, handleSubmit }) => {
                useEffect(() => {
                  setIsValid(isValid);
                }, [isValid]);

                return (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                      </label>
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
                    <div className="mb-3">
                      <label htmlFor="exampleInputLogin" className="form-label">
                        Login
                      </label>
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
                    <button
                      type="submit"
                      className={`btn btn-primary ${!isValid && "disabled"}`}
                      disabled={!isValid}
                    >
                      Next
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};


const StepTwo = ({ onNext }: any) => {
  const initialValues = {
    first_name: "",
    last_name: "",
  };

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="row justify-content-center">
          <div className="col-6">
            <Formik
              initialValues={initialValues}
              validationSchema={yupSchema.yupAuthSchemaTwo}
              onSubmit={onSubmit}
            >
              {({ errors, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <Field
                      name="first_name"
                      type="text"
                      className="form-control"
                      id="first_name"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <Field
                      name="last_name"
                      type="text"
                      className="form-control"
                      id="last_name"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Next
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepThree = ({ data, onSubmit }: any) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">User Info</h5>
        <p className="card-text">First Name: {data.first_name}</p>
        <p className="card-text">Last Name: {data.last_name}</p>
        <p className="card-text">Login: {data.login}</p>
        <p className="card-text">Email: {data.email}</p>
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

const FormAuth = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [formData, setFormData] = useState({});

  const onNextStep = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", { ...formData, ...data });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={onNextStep} />;
      case 2:
        return <StepTwo onNext={onNextStep} />;
      case 3:
        return <StepThree data={formData} onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default FormAuth;
