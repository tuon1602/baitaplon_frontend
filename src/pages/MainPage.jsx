import React from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import styled from 'styled-components'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonStyled = styled.button`
  padding: 0 20px;
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

  const handleEditNavigate= ()=>{
    navigate('/edit-book')
  }
  const handleLoginNavigate= ()=>{
    navigate('/login')
  }
  const handleDeleteBook =(book)=>{
    console.log("onelick",book)
    axios.delete('http://localhost:6969/api/delete-book',{
      data:{
        id:book.id
      }
    }).then(getData())
  }
  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <h1>BookManager</h1>
        <ButtonStyled onClick={handleEditNavigate}>AddBook</ButtonStyled>
        <ButtonStyled onClick={handleLoginNavigate}>Login</ButtonStyled>
        {/* <Button></Button> */}

        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Author</th>
          <th>Category</th>
          <th>Page Counter</th>
          <th>image</th>
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
              <td>{item.image}</td>
              <td>
              <Button variant="primary" onClick={handleEditNavigate}>Edit</Button>{' '}
              <Button variant="danger"onClick={()=>handleDeleteBook(item)}>Delete</Button>{' '}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
    </div>
  )
}

export default MainPage