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
  Avatar
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ViewBookPageContext } from "../../context";
import { passingUserId } from "../../context";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BookIcon from '@mui/icons-material/Book';
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
  },
});

const BuyPage = () => {
  //initial
  const userIdData = localStorage["userId"];
  const username = localStorage["username"];
  const navigate = useNavigate();

  //states
  const [orderData, setOrderData] = useState([]);
  const [bookDataByOrderId, setBookDataByOrderId] = useState([]);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(true);

  //call apis
  const getOrderData = async () => {
    const data = await axios.get("http://localhost:6969/api/get-all-order", {
      params: {
        userId: userIdData,
      },
    });
    setOrderData(data.data.orders);
    // console.log(orderData)
  };
  useEffect(() => {
    getOrderData();
  }, []);
  //functions
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = async (index, orderId) => {
    const bookData = await axios.get(
      "http://localhost:6969/api/get-book-by-orderid",
      {
        params: {
          orderId: orderId,
        },
      }
    );
    setBookDataByOrderId(bookData.data);
    console.log(bookDataByOrderId);
    setOpen(open === index ? -1 : index);
  };
  const handleNavigateLogOut = () => {
    if (window.confirm("Are you sure want to logout?") === true) {
      navigate("/");
    }
  };
  const handleCartNavigation = () => {
    navigate("/cart");
  };
  const handleNavigateMainPage = () => {
    navigate("/user-main-page")
  };

  const handleChangeType = (id,type) =>{
    const updateStatus = "Canceled"
    type = updateStatus
    if(window.confirm("Are your sure want to Cancel your order?")===true){
      axios.put("http://localhost:6969/api/update-status",{
        id:id,
        type:type
      })
      window.location.reload(true)
    }
    else{
      return false
    }
  }
  return (
    <CssBaseline>
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
            <IconButton
              size="large"
              color="inherit"
              onClick={handleCartNavigation}
            >
              <Badge color="cart">
                <ShoppingCartOutlinedIcon />
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
        <main style={{ marginTop: "100px" }}>
          <Container maxWidth="md">
            <List
              sx={{
                width: "100%",
                maxWidth: "md",
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  color="primary"
                  sx={{ fontSize: 20 }}
                  component="div"
                  id="nested-list-subheader"
                >
                  Your orders
                </ListSubheader>
              }
            >
              {orderData.map((item, index) => (
                <>
                  <ListItemButton onClick={() => handleClick(index, item.id)}>
                    <ListItemIcon>
                      <LocalMallIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Order number"
                      secondary={item.id}
                    />
                    <ListItemText  primary="Books ordered" secondary={item.amount} />
                    <ListItemText  primary="Status" secondary={item.type}/>
                    {item.type==="Ready"? <Button color="primary" variant="contained" sx={{marginRight:5}} onClick={()=>handleChangeType(item.id,item.type)}>Cancel order</Button>: <Button color="primary" variant="contained" sx={{marginRight:5}} disabled>Canceled</Button>}
                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {bookDataByOrderId.map((bookItem, bookIndex) => (
                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <BookIcon />
                          </ListItemIcon>
                          <ListItemAvatar>
                            <Avatar src={bookItem.image} variant="rounded" sx={{width:120,height:160}}/>
                          </ListItemAvatar>
                          <ListItemText primary="Book name" secondary={bookItem.name} sx={{marginLeft:5,width:20 }} />
                          <ListItemText primary="Author" secondary={bookItem.author} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  ))}
                </>
              ))}
            </List>
          </Container>
        </main>
      </ThemeProvider>
    </CssBaseline>
  );
};

export default BuyPage;
