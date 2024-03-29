import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from './Main';

//This component displays the login screen

function Login() {
  // State variables to manage form data, error messages, and navigation
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const [visitMain, setVisitMain] = useState(false);

  // Handle input changes and update the data state accordingly
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    localStorage.setItem('email', data.email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:3001/auth';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      setVisitMain(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      {visitMain && <Main />}
      {!visitMain && (
        <div className="login_container">
          <div className="login_form_container">
            <div className="left">
              <form className="form_container" onSubmit={handleSubmit}>
                <h1 className="h1">DAILY DIARY</h1>
                <h2 className="h2">Login to Your Account</h2>
                <label for="email">
                  User Email :{' '}
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className="input"
                  />
                </label>
                <label id="password">
                  Password :{' '}
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="input"
                  />
                </label>
                {error && <div className="error_msg">{error}</div>}
                <button type="submit" className="green_btn">
                  Sign In
                </button>
              </form>
            </div>
            <div className="right">
              <h1>New Here?</h1>
              <Link to="/signup">
                <button type="button" className="green_btn">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
}

export default Login;
