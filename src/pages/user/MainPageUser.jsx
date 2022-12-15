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
  Alert
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
import { ViewBookPageContext } from "../../context";
import { passingUserId } from "../../context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8bbd0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f48fb1",
    },
    cart:{
      main:"#e91e63"
    }
  },
});

const array_is_unique = (array,size)=>{
  let flag = 0;
  for(let i =0;i<size-1;i++){
    for(let j=i+1;j<size;j++){
      if(array[i]==array[j]){
        flag=1
        break
      }
    }
  }
  return flag
}

const MainPageUser = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [book, setBook] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [bookIdArray,setBookIdArray] = useState([])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigateLogOut = () => {
    if(window.confirm("Are you sure want to logout?") ===true){
      navigate('/user-main-page-notlogged')
    }
    ;
  }
  const navigate = useNavigate();
  const { state } = useLocation();
  const userDetail = state;
  const role = state.userDetail.role;
  const username = state.userDetail.username;
  const userId = state.userDetail.id
  const getData = async () => {
    const data = await axios.get("http://localhost:6969/api/get-all-books");
    setBook(data.data.books);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleNavigateViewPage = (book) => {
    navigate("/user-view-book-page", {
      state: { book: book, userDetail: userDetail },
    });
  };
  const [viewBookPageData,setViewBookPageData] = useState({
    userData:username
  })
  const handleCartNavigation = ()=>{
    navigate('/cart')
  }
  const userIdData = localStorage.setItem("userId",userId)
  return (
    <>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <IconButton
                size="large"
                color="inherit"
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuBookIcon size="large" />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello {username}
              </Typography>
              <IconButton size="large" color="inherit" onClick={handleCartNavigation}>
                <Badge badgeContent={countCart} color="cart">
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
        </ThemeProvider>
        <main>
          <div>
            <Container maxWidth="sm" style={{ marginTop: "60px" }}>
              <Typography
                variant="h3"
                align="center"
                color="text-primary"
                gutterBottom
              >
                Welcome to BookService
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text-secondary"
                paragraph
              >
                Happy Buying our books , no advertising :D
              </Typography>
            </Container>
          </div>
          <Container maxWidth="md" style={{ marginTop: "60px" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3, lg: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {book.map((item, index) => (
                <Grid item>
                  <Card sx={{ width: 250, height: "100%" }}>
                    <CardMedia
                      image={item.image}
                      title="image"
                      style={{ paddingTop: "150%" }}
                    />
                    <CardContent>
                      <Typography noWrap gutterBottom variant="h5">
                        {item.name}
                      </Typography>
                      <Typography noWrap gutterBottom color="text-secondary">
                        {item.author}
                      </Typography>
                      <Typography noWrap
                        gutterBottom
                        color="text-secondary"
                        variant="body1"
                      >
                        {item.category}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          onClick={() => handleNavigateViewPage(item)}
                        >
                          View
                        </Button>

                      </ThemeProvider>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </>
  );
};

export default MainPageUser;
