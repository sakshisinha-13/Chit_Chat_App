import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Container>
        <BlurBackground />
        <LoginContainer>
          <h1>CHIT-CHAT</h1>
          <form onSubmit={handleSubmit} className="form-login">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              min="3"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button type="submit">Log In</button>
            <span>
              Don't have an account? <Link to="/register">Create One.</Link>
            </span>
          </form>
        </LoginContainer>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh; /* Full height of viewport */
  width: 100vw; /* Full width of viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://img.freepik.com/psd-gratuitas/fundo-3d-para-cafeteria_23-2150817358.jpg?t=st=1710546692~exp=1710550292~hmac=c50ec6f1a837a32eecf3a7cc96a252f6f8d8cae9d017c00c50f1e5b0ef2c38cb&w=1060');
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  z-index: -1;
`;

const LoginContainer = styled.div`
  z-index: 1;
  background-color: aliceblue;
  width: 25vw; /* Width as a percentage of viewport width */
  min-width: 320px; /* Minimum width to maintain responsiveness */
  min-height: 370px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  h1 {
    font-family: 'Karla';
    font-size: 42px;
    color: #1e3932;
    line-height: 50px;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-login {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid grey;
    width: 100%;
    height: 18px;
    font-family: 'Karla';
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.1em;
    color: #767676;
    cursor: text;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }

  button {
    font-family: 'Karla';
    font-size: 18px;
    letter-spacing: 1px;
    color: #fff;
    border: 2px solid #006241;
    text-decoration: none;
    padding: 8px 50px;
    margin: 10px 0;
    border-radius: 50px;
    background-color: #006241;
    cursor: pointer;
    text-transform: uppercase;
    &:hover {
      background-color: #004d32;
      border: 2px solid #004d32;
    }
  }

  span {
    font-family: 'Karla';
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #767676;
    margin-top: 20px;
    a {
      color: #006241;
      font-weight: bold;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Login;
