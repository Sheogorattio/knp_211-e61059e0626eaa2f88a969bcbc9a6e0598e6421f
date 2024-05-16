import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // const [email, setEmail] = useState("test@gmail.com");
  // const [login, setLogin] = useState("admin");
  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    login: "admin",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlerCreateUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      if (response.status == 201) {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-6">
          <p>
            Email: {formData.email}. Login: {formData.login}
          </p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handlerCreateUser}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleChange}
              />
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
                name="login"
                onChange={handleChange}
              />
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

export default App;
