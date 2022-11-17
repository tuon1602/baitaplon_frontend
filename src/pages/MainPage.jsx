import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components'
import axios from 'axios'
import { useState,useEffect } from 'react'

const ButtonStyled = styled.button`

`

function MainPage() {

  const [Books, setBook] = useState([]);
  const getData = async () => {
    const data = (await axios.get("http://localhost:6969/api/get-all-books")).data;
    setBook(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <h1>BookManager</h1>
        <ButtonStyled>AddBook</ButtonStyled>
        <ButtonStyled>Login</ButtonStyled>
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
              <Button variant="primary">Edit</Button>{' '}
              <Button variant="danger">Delete</Button>{' '}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
    </div>
  )
}

export default MainPage