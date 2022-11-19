import React, { useEffect } from "react";
import styled from 'styled-components'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Container = styled.div`
  padding: 20px 20px;
  width: ${props => props.width}px;
  height:${props => props.height}px;
  border:1px solid black;
  display:flex;
  flex-direction:column;
`
const Logo = styled.image`
  width:100px;
  height:100px;
`
const Text = styled.p`
  text-align:center;
  color:red;
`
const Input = styled.input`
  padding:15px 20px;
  margin-top:20px;
`
const Button = styled.button`
  padding:15px 20px;
  margin-top:20px;
  border:none;
  border-radius:20px;
  cursor:pointer;
  border:solid 1px black;
  &:hover{
    background-color:palevioletred;
    color:white;
    border:none;
    transition: all 0.2s ease-in;
  }
`
const SignUp = () => {
  const [register,setRegister] = useState({
    email: " ",
    username:" ",
    password:" ",
  })
  const [errorMessage,setErrorMessage] =useState(" ")
  console.log(register)
  const handleRegister =(e) =>{
    e.preventDefault()
    axios.post("http://localhost:6969/api/create-new-user",{
      email:register.email,
      password:register.password,
      username:register.username
    }).then(res =>setErrorMessage(res.data.errMessage)).catch(err =>console.error(err))
  }
  useEffect(()=>{
    if(errorMessage==="ok"){
      navigate('/login')
    }
  },[errorMessage])
  const navigate= useNavigate()
  const handleLogin =()=>{
    navigate('/login')
  }
  return (
    <Wrapper>
      <Container width={300} height={400}>
        <Logo src="../logo/logo.png" />
        <Input placeholder="Email" type="text" name='email' required onChange={(e)=>setRegister({...register,email:e.target.value})} />
        <Input placeholder="Username" type="text" name='username'required onChange={(e)=>setRegister({...register,username:e.target.value})}/>
        <Input placeholder="Password" type="password" name='password' required onChange={(e)=>setRegister({...register,password:e.target.value})}/>
        <Text>{errorMessage}</Text>
        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={handleLogin}>Login</Button>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
