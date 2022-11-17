import React from "react";
import styled from 'styled-components'

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
  return (
    <Wrapper>
      <Container width={300} height={400}>
        <Logo src="../logo/logo.png" />
        <Input placeholder="Username" type="text" />
        <Input placeholder="Email" type="email"/>
        <Input placeholder="Password" type="password" />
        <Button>Register</Button>
        <Button>Login</Button>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
