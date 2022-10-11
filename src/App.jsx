import axios from "axios";
import { useState } from "react";

const init = {
  email: "",
  password: "",
  submit: false,
  login_data: {},
};

function App() {
  const [login, setLogin] = useState([{ ...init }]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, submit: true });
    axios
      .post(
        "http://localhost:8000/api/login",
        {
          email: login.email,
          password: login.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLogin({ ...login, login_data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                onChange={handleInput}
                type="email"
                id="form2Example1"
                className="form-control"
                name="email"
                value={login.email}
              />
              <label className="form-label" for="form2Example1">
                Email address
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                onChange={handleInput}
                type="password"
                id="form2Example2"
                className="form-control"
                name="password"
                value={login.password}
              />
              <label className="form-label" for="form2Example2">
                Password
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          {login.login_data && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Login Data</h5>
                <p className="card-text">{login.login_data.status}</p>
                <p className="card-text">{login.login_data.user.name}</p>
                <p className="card-text">{login.login_data.user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
