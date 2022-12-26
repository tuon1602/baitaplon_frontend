import axios from 'axios'
import React, { useCallback, useState,useEffect} from 'react'
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
const Brand = styled.h1`
  text-align:center;
`
const Text = styled.p`
  color:red;
  text-align:center;
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
  const navigate=useNavigate()
  const [login,setLogin] = useState({
    email:" ",
    password: " ",
  })
  const [userDetail,setUserDetail] = useState([])
  const [message,setMessage] = useState('')
  const handleSubmit=(e) =>{
    if(login.email === ' ' || login.password ===' '){
      alert("Please enter information")
      return false
    }
    else{
      e.preventDefault()
     axios.post("http://localhost:6969/api/login",{
      email:login.email,
      password:login.password,
    }).then(res =>setMessage(res.data.message)).catch(err =>console.error(err))
    }
    
  }
  useEffect(()=>{
    // if(userDetail.role == "User"){
    //   navigate('/user-main-page')
    // }
    if(message==="ok" && userDetail.role==="User"){
      localStorage.setItem("userDetail",JSON.stringify(userDetail))
      navigate('/user-main-page',{state:{userDetail}})
    }
    else if(message==="ok" && userDetail.role==="Admin"){
      navigate('/mainpage-edit')
    }
  },[message]) 
      axios.get("http://localhost:6969/api/get-one-user",{
      params:{
        email:login.email
      }
    }).then(res => setUserDetail(res.data.user))
  const handleRegister= ()=>{
    navigate('/register')
  }
  return (
    <Wrapper>
      <Container width={300} height={400}>
          <Brand>BookService</Brand>
          <Input placeholder='Email' type='text' name='email' required onChange={(e)=>setLogin({...login,email:e.target.value})}/>
          <Input placeholder='Password' type='password' name='password' required onChange={(e)=>setLogin({...login,password:e.target.value})}/>
          <Text>{message}</Text>
          <Button onClick={handleSubmit}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>

      </Container>
    </Wrapper>
 
  )
}

export default LogIn