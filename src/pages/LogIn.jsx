import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LogoImage from '../logo/logo.png'
import MainPage from './MainPage'

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
const FormHandle = styled.form`
  width:100%;
`
const LogIn = () => {
  const [login,setLogin] = useState({
    email:" ",
    password: " ",
  })
  const handleSubmit=(e) =>{
    e.preventDefault()
    axios.post("http://localhost:6969/api/login",{
      email:login.email,
      password:login.password
    }).then(res =>console.log(res)).catch(err =>console.error(err))
  }
  return (
    <FormHandle>
    <Wrapper>
      <Container width={300} height={400}>
          <Logo src="../logo/logo.png"/>
          <Input placeholder='Email' type='text' name='email' required onChange={(e)=>setLogin({...login,email:e.target.value})}/>
          <Input placeholder='Password' type='password' name='password' required onchange={(e)=>setLogin({...login,password:e.target.value})}/>
          <Button onClick={handleSubmit}>Login</Button>
          <Button>Register</Button>
      </Container>
    </Wrapper>
    </FormHandle>
 
  )
}

export default LogIn