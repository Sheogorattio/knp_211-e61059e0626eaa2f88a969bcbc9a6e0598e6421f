import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

const StepOne = ({ onNext }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      login: "",
    },
  });

  const validateEmail = (value: any) => {
    if (!validator.isEmail(value)) {
      return "Invalid email address";
    }
    return undefined;
  };
  const onSubmit = (data: any) => {
    onNext(data);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="row justify-content-center">
          <div className="col-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  {...register("email", {
                    validate: validateEmail,
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputLogin" className="form-label">
                  Login
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputLogin"
                  {...register("login", {
                    minLength: {
                      value: 5,
                      message: "invalid login (min length <5)",
                    },
                    maxLength: {
                      value: 10,
                      message: "invalid login (max length >10)",
                    },
                  })}
                />
                {errors.login && <span>{errors.login.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepTwo = ({ onNext }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });
  const onSubmit = (data: any) => {
    onNext(data);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <div className="row justify-content-center">
          <div className="col-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputFirstName"
                  aria-describedby="firstNameHelp"
                  {...register("first_name", {
                    required: "First Name is empty",
                  })}
                />
                {errors.first_name && <span>{errors.first_name.message}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputLastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputLastName"
                  {...register("last_name", {
                    required: "First Name is empty",
                  })}
                />
                {errors.last_name && <span>{errors.last_name.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </form>
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
