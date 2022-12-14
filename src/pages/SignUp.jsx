import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  padding: 20px 20px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const Brand = styled.h1`
  text-align: center;
`;
const Text = styled.p`
  text-align: center;
  color: red;
`;
const Input = styled.input`
  padding: 15px 20px;
  margin-top: 20px;
`;
const Button = styled.button`
  padding: 15px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  border: solid 1px black;
  &:hover {
    background-color: palevioletred;
    color: white;
    border: none;
    transition: all 0.2s ease-in;
  }
`;
const Select = styled.select`
  margin-top: 5px;
  width: 50%;
`;
const Option = styled.option``;
const Span = styled.span`
  margin-top: 20px;
`;
const SignUp = () => {
  const [register, setRegister] = useState({
    email: " ",
    username: " ",
    password: " ",
    role: " ",
  });
  const [errorMessage, setErrorMessage] = useState(" ");
  console.log(register);
  const handleRegister = (e) => {
    if (
      (register.email == ' '  ||
      register.password == ' ' ||
      register.username == ' '  )
    ) {
      alert("Please enter information first")
      return false
    } 
    else if ( register.role == ' '){
      alert("Please enter information first")
      return false
    }
    else {
      e.preventDefault();
      axios
        .post("http://localhost:6969/api/create-new-user", {
          email: register.email,
          password: register.password,
          username: register.username,
          role: register.role,
        })
        .then((res) => setErrorMessage(res.data.message.errMessage))
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    if (errorMessage === "ok") {
      alert("Sucessfull")
      navigate("/login");
    }
  }, [errorMessage]);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Wrapper>
      <Container width={300} height={600}>
        <Brand>Welcome to BookService</Brand>
        <Input
          placeholder="Email"
          type="text"
          name="email"
          required
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />
        <Input
          placeholder="Username"
          type="text"
          name="username"
          required
          onChange={(e) =>
            setRegister({ ...register, username: e.target.value })
          }
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          required
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
        />
        <Span>Choose your role:</Span>
        <Select
          name="role"
          required
          onChange={(e) => setRegister({ ...register, role: e.target.value })}
        >
          <Option disabled selected></Option>
          <Option>Admin</Option>
          <Option>User</Option>
        </Select>
        <Text>{errorMessage}</Text>
        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={handleLogin}>Login</Button>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
