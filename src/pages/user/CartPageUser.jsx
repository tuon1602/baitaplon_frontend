import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
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
import HistoryIcon from '@mui/icons-material/History';
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
const BUTTON_TYPE = {
  INCREASE: 0,
  DECREASE: 1,
};

const CartPageUser = () => {
  const itemCount = useRef();
  const navigate = useNavigate();
  //take data from local storage
  const userIdData = localStorage["userId"];
  const username = localStorage["username"]
  // localStorage.removeItem('userId')
  // console.log(userIdData);
  //state
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [getData, setGetData] = useState([]);
  const [checked, setChecked] = useState(true);
  // const [amountCounter, setAmountCounter] = useState();
  const [bookIdList, setBookIdList] = useState();
  // console.log(amountCounter);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigateLogOut = () => {
    if(window.confirm("Are you sure want to logout?") ===true){
      navigate('/')
    }
    ;
  }
  const handleBuyNavigation = ()=>{
    navigate('/buy-page')
  }
  const handleNavigateMainPage=()=>{
    navigate('/user-main-page')
  }
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

  const handleChangeAmount = (item, index, buttonType) => {
    let currentAmount = item.amount;
    currentAmount =
      buttonType == BUTTON_TYPE.INCREASE
        ? currentAmount + 1
        : currentAmount - 1;

    axios
      .put("http://localhost:6969/api/update-amount", {
        id: item.id,
        amount: currentAmount,
      })
      .then((res) => console.log(res));

    setGetData((prev) => {
      let tmp = [...prev];
      tmp[index].amount = currentAmount;
      return tmp;
    });
  };

  const handleDeleteItem = (cartItem) => {
    if (window.confirm("Are you sure want to delete?") === true) {
      axios
        .delete("http://localhost:6969/api/delete-cart", {
          params: {
            id: cartItem.id,
          },
        })
        .then(getAllCartDataById);
    } else {
      return false;
    }
  };
  // var bookIdArray = []
  // var amountArray = []
  // var cartIdArray = []

  // getData.forEach(item=>{
  //   bookIdArray.push(item.bookId)
  //   amountArray.push(item.amount)
  //   cartIdArray.push(item.id)

  // })
  // // console.log(amountArray.reduce((sum,a)=>sum+a,0))
  // console.log(cartIdArray.toString())
  //fix this
  // itemCount.current = ids
  const handleBuyButton = () => {
    var bookIdArray = []
    var amountArray = []
    var cartIdArray = []
    getData.forEach(item=>{
      bookIdArray.push(item.bookId)
      amountArray.push(item.amount)
      cartIdArray.push(item.id)
    })
    if (window.confirm("This will delete all your cart") === true) {
      axios.post("http://localhost:6969/api/post-order", {
        userId: userIdData,
        type: "Ready",
        bookId:bookIdArray.toString(),
        amount:amountArray.reduce((sum,a)=>sum+a,0)
      }).then(res=>console.log(res));
      axios.delete("http://localhost:6969/api/delete-carts-when-navigate",{
        params:{
          userId:userIdData,
          idData:cartIdArray.toString()
        },
      })
      navigate("/buy-page");
    } else {
      return false;
    }
  };
  // return
  return (
    <ThemeProvider theme={theme}>
      <>
      <ThemeProvider theme={theme}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <IconButton
                size="large"
                color="inherit"
                edge="start"
                sx={{ mr: 2 }}
                onClick={handleNavigateMainPage}
              >
                <MenuBookIcon size="large" />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello {username}
              </Typography>
              <IconButton size="large" color="inherit" onClick={handleBuyNavigation}>
                <Badge color="cart">
                  <HistoryIcon />
                </Badge>
              </IconButton>
              {auth && (
                <>
                  <IconButton size="large" color="inherit" onClick={handleMenu}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleNavigateLogOut}>Log out</MenuItem>
                  </Menu>
                </>
              )}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <TableContainer sx={{marginTop:20}} component={Paper}>
          <Table sx={{ minWidth: 650 }}aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Book</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            {getData.map((item, index) => ( 
              <TableBody>
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
                      onClick={() =>
                        handleChangeAmount(item, index, BUTTON_TYPE.DECREASE)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    {item.amount}
                    <IconButton
                      onClick={() =>
                        handleChangeAmount(item, index, BUTTON_TYPE.INCREASE)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteItem(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <Grid container mt={5} justifyContent={"flex-end"} maxWidth="lg">
          {getData!="" ?  <Button
            variant="contained"
            color="alert"
            size="large"
            onClick={handleBuyButton}
            
          >
            Buy Now
          </Button> :<Button
            variant="contained"
            color="alert"
            size="large"
            onClick={handleBuyButton}
            disabled
            
          >
            Buy Now
          </Button> }
         
        </Grid>
      </>
    </ThemeProvider>
  );
};

export default CartPageUser;
