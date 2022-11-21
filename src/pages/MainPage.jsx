import React from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import styled from 'styled-components'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './table.css'
const ButtonStyled = styled.button`
  padding: 0 20px;
  width: ${props => props.width}px;
  height:${props => props.height}px;
  margin: 0 10px;
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
const SetStyled = styled.div`
  display:flex;
  justify-content:center;
  margin-bottom:40px;
`

function MainPage() {
  const navigate = useNavigate()
  const [Books, setBook] = useState([]);
  const getData = async () => {
    const data = await axios.get("http://localhost:6969/api/get-all-books")
    setBook(data.data.books);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleEditNavigate= (bookId)=>{
    navigate('/edit-book',{state:{id:bookId}})
    console.log(bookId)
  }
  const handleDeleteBook =(book)=>{
    console.log("onelick",book)
    axios.delete('http://localhost:6969/api/delete-book',{
      data:{
        id:book.id
      }
    }).then(getData())
  }
  const handleLogout=()=>{
    navigate('/')
  }
  const handleAddBookNavigate = ()=>{
    navigate('/add-book')
  }
  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <h1 style={{textAlign:'center'}}>BookManager</h1>
        <SetStyled>
          <ButtonStyled onClick={handleAddBookNavigate} width={100} height={30}>AddBook</ButtonStyled>
          {/* <ButtonStyled onClick={handleLoginNavigate}width={100} height={30}>Login</ButtonStyled> */}
          <ButtonStyled onClick={handleLogout}width={100} height={30}>LogOut</ButtonStyled>

        </SetStyled>
        
        {/* <Button></Button> */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Category</th>
              <th>Page Counter</th>
              <th>Date Added</th>
              <th>image</th>
              <th>Configuration</th>
            </tr>
          </thead>
          <tbody>
          {Books.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.author}</td>
                  <td>{item.category}</td>
                  <td>{item.pageCounter}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.image}</td>
                  <td>
                  <ButtonStyled height={40} width={70} variant="primary" onClick={()=>handleEditNavigate(item.id)}>Edit</ButtonStyled>
                  <ButtonStyled height={40} width={80} variant="danger"onClick={()=>handleDeleteBook(item)}>Delete</ButtonStyled>
                  </td>
                </tr>
              ))}
          </tbody>
    </Table>
    </div>
  )
}

export default MainPage