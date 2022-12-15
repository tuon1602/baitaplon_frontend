import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Stack,
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Alert,
  Box,
  Checkbox,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { passingUserId } from "../../context";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8bbd0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f48fb1",
    },
    cart: {
      main: "#e91e63",
    },
    alert: {
      main: "#DC143C",
      contrastText: "#fff",
    },
  },
});
const BUTTON_TYPE ={
    INCREASE:0,
    DECREASE:1
  }

const CartPageUser = () => {
  //take data from local storage
  const userIdData = localStorage["userId"];
  // localStorage.removeItem('userId')
  console.log(userIdData);
  //state
  const [getData, setGetData] = useState([]);
  const [checked, setChecked] = useState(true);
  const [amountCounter, setAmountCounter] = useState();
  console.log(amountCounter);
  //call api
  const getAllCartDataById = async () => {
    const data = await axios.get("http://localhost:6969/api/get-all-cart", {
      params: {
        userId: userIdData,
      },
    });
    setGetData(data.data.carts);
    console.log(getData);
  };
  useEffect(() => {
    getAllCartDataById();
  }, []);
  //handle event
  const handleCheckAll = (e) => {};

  const handleChangeAmount = (item,index,buttonType) =>{
    let currentAmount = item.amount
    currentAmount = buttonType == BUTTON_TYPE.INCREASE ? currentAmount +1 : currentAmount -1

    axios.put("http://localhost:6969/api/update-amount",{
        id:item.id,
        amount:currentAmount
    }).then(res => console.log(res))

    setGetData(prev =>{
        let tmp = [...prev]
        tmp[index].amount = currentAmount
        return tmp
    })
}
    const handleDeleteItem = (cartItem) =>{
        if(window.confirm("Are you sure want to delete?")===true){
             axios.delete("http://localhost:6969/api/delete-cart",{
            params:{
                id:cartItem.id
            }
        }).then(getAllCartDataById) 
        }
        else{
            return false
        }
    }

  // return
  return (
    <ThemeProvider theme={theme}>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Book</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData.map((item, index) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {item.Book.name}
                  </TableCell>
                  <TableCell align="right">{item.Book.author}</TableCell>
                  <TableCell align="right">
                    <Box
                      component="img"
                      sx={{ width: 100, height: 120 }}
                      src={item.Book.image}
                    ></Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                    disabled={item.amount === 1}
                      onClick={() => handleChangeAmount(item,index,BUTTON_TYPE.DECREASE)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {item.amount}
                    <IconButton
                      onClick={() => handleChangeAmount(item,index,BUTTON_TYPE.INCREASE)}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={()=>handleDeleteItem(item)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container mt={5} justifyContent={"flex-end"} maxWidth="lg">
          <Button variant="contained" color="alert" size="large">
            Buy Now
          </Button>
        </Grid>
      </>
    </ThemeProvider>
  );
};

export default CartPageUser;
