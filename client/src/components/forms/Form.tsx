import axios from "axios";
import { useForm } from "react-hook-form";
import validator from "validator";

function Form() {
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
  const formDataSet = (data: any) => {
   
    console.log(data);
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-6"></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handleSubmit(formDataSet)} noValidate>
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
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
