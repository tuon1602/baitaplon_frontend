import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
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
  Box,
  Divider,
  ButtonGroup,
  Avatar,
  TextareaAutosize,
  Rating,
  Alert,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ViewBookPageContext } from "../../context";
import CustomRating from "../../component/CustomRating";
import { ratingDataValue } from "../../context";

const labels = {
  1: "Garbage",

  2: "Poor",

  3: "Normal",

  4: "Good",

  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#f8bbd0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

const ViewBookPage = () => {
  const ViewBookPageData = useContext(ViewBookPageContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const book = state.book;
  const userDetailFromLocal = JSON.parse(localStorage.getItem("userDetail"))
  const user = userDetailFromLocal;
  // console.log(book.id );
  // for star rating
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  //state for calling api
  const [ratingData, setRatingData] = useState([]);
  const [userDataFromComment, setUserDataFromComment] = useState([]);
  // console.log(ratingData)
  const [contentChange, setContentChange] = useState("");
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [commentData, setCommentData] = useState("");
  //handle alert
  const [checkSuccessful, setCheckSuccessful] = useState(false);
  //handle amount change
  const [amountCounter, setAmountCounter] = useState(1);
  //handleCartvalidation
  const [cartMessage,setCartMessage] = useState("")
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigateLogOut = () => {
    if (window.confirm("Are you sure want to logout?") === true) {
      navigate("/");
    }
  };
  const handleNavigateMainPageLogged = () => {
    navigate(-1);
  };
  const handleContentOnChange = (e) => {
    setContentChange(e.target.value);
  };
  const handleCreateComment = () => {
    const username = user.username;
    const bookId = book.id;
    const content = contentChange;
    const rating = value;
    if (contentChange === "" || rating === "") {
      alert("You must fill in rating and comment");
      return false;
    }
    axios.post("http://localhost:6969/api/post-comment", {
      username: username,
      bookId: bookId,
      content: content,
      rating: rating,
    });
    alert("Comment sucessful");
    navigate(0);
  };
  // const getDataComment = async () => {
  //   const data = await axios.get("http://localhost:6969/api/get-all-comment",{
  //     params:{
  //       bookId:book.id
  //     }
  //   });
  //   setRatingData(data.data.comments);
  //   console.log(ratingData)
  // };
  // useEffect(() => {
  //   getDataComment();
  // }, []);
  const getUserComment = async () => {
    const data = await axios.get("http://localhost:6969/api/get-all-comment", {
      params: {
        bookId: book.id,
      },
    });
    setRatingData(data.data.comments);
    // console.log(ratingData);
  };
  useEffect(() => {
    getUserComment();
  }, []);
  // const getUserDetailFromComment = async () => {
  //   const data = await axios.get("http://localhost:6969/api/get-user-by-id",{
  //     params:{
  //       id:user.id
  //     }
  //   });
  //   setUserDataFromComment(data.data.user);
  // };
  // useEffect(() => {
  //   getUserDetailFromComment();
  // }, []);
  const handleDecreaseAmount = () => {
    setAmountCounter(amountCounter - 1);
  };
  const handleIncreaseAmount = () => {
    setAmountCounter(amountCounter + 1);
  };
  const handleAddToCart =  () => {
      axios.post("http://localhost:6969/api/post-cart",{
      bookId:book.id,
      userId:user.id,
      amount: amountCounter
    }).then((res)=>setCartMessage(res.data.message.message)).catch((err) => console.error(err));
  };
  useEffect(()=>{
    if(cartMessage==="ok"){
      alert("successfull")
    }
    else if(cartMessage==="failed"){
      alert("book is added")
    }
  },[cartMessage])
  const handleCartNavigation = ()=>{
    navigate('/cart')
  }
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
                onClick={handleNavigateMainPageLogged}
              >
                <MenuBookIcon size="large" />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hello {user.username}
              </Typography>
              <IconButton size="large" color="inherit" onClick={handleCartNavigation}>
                <ShoppingCartOutlinedIcon />
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
        <menu>
          {/* bookDetail section */}
          <div>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Container maxwidth="md" style={{ marginTop: "60px" }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3, lg: 4 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={4}>
                    <Box
                      component="img"
                      alt="book image"
                      src={book.image}
                      sx={{ maxHeight: "100%", width: 400 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    ></Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Container>
                      <Typography>Tác giả: {book.author}</Typography>
                      <Typography variant="h4" mt={1}>
                        {book.name}
                      </Typography>
                      <Typography
                        mt={2}
                        style={{ lineHeight: "170%", textAlign: "justify" }}
                      >
                        Nội dung: {book.description}
                      </Typography>
                      <Typography mt={3}>Số lượng</Typography>
                      <ButtonGroup
                        style={{ marginTop: "5px" }}
                        size="medium"
                        variant="contained"
                        aria-label="medium secondary button group"
                      >
                        {amountCounter === 1 ? (
                          <IconButton disabled onClick={handleDecreaseAmount}>
                            <RemoveIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={handleDecreaseAmount}>
                            <RemoveIcon />
                          </IconButton>
                        )}
                        <Typography mt={1}>{amountCounter}</Typography>
                        <IconButton onClick={handleIncreaseAmount}>
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>
                      <ThemeProvider theme={theme}>
                        <Button
                          style={{ marginLeft: "20px", marginTop: "-15px" }}
                          variant="contained"
                          onClick={handleAddToCart}
                        >
                          Add to Cart
                        </Button>
                      </ThemeProvider>
                    </Container>
                  </Grid>
                </Grid>
              </Container>
            </Stack>
          </div>
          {/* commentSection */}
          <div style={{ marginTop: "40px" }}>
            <Container maxWidth="md">
              <Grid container direction="column" gap={2}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={2}
                >
                  <Avatar sx={{ height: 56, width: 56 }}>
                    {user.username}
                  </Avatar>
                  <Typography>{user.username}</Typography>
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      value={value}
                      precision={1}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid container direction="column" gap={2}>
                  <TextareaAutosize
                    placeholder="Your comment"
                    minRows={4}
                    style={{ width: "50%", resize: "none" }}
                    onChange={handleContentOnChange}
                  />
                  <ThemeProvider theme={theme}>
                    <Button
                      style={{ width: "10%" }}
                      variant="contained"
                      color="primary"
                      onClick={handleCreateComment}
                    >
                      Post
                    </Button>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </Container>
          </div>
          <div style={{ marginTop: "40px" }}>
            <Container maxWidth="md">
              {ratingData.map((item, index) => (
                <>
                  <Grid container direction="row" gap={2} mt={3}>
                    <Avatar sx={{ width: 56, height: 56 }}>
                      {item.username}
                    </Avatar>
                    <Grid alignItems="center">
                      <Typography variant="h5">{item.username}</Typography>
                      {item.rating === 1 ? (
                        <Typography>Rating: Garbage</Typography>
                      ) : (
                        <Typography></Typography>
                      )}
                      {item.rating === 2 ? (
                        <Typography>Rating: Bad</Typography>
                      ) : (
                        <Typography></Typography>
                      )}
                      {item.rating === 3 ? (
                        <Typography>Rating: Normal</Typography>
                      ) : (
                        <Typography></Typography>
                      )}
                      {item.rating === 4 ? (
                        <Typography>Rating: Good</Typography>
                      ) : (
                        <Typography></Typography>
                      )}
                      {item.rating === 5 ? (
                        <Typography>Rating: Excellent</Typography>
                      ) : (
                        <Typography></Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginTop: "15px" }}>
                    <TextareaAutosize
                      value={item.content}
                      minRows={4}
                      style={{ width: "50%", resize: "none" }}
                      disabled
                    ></TextareaAutosize>
                  </Grid>
                </>
              ))}
            </Container>
          </div>
        </menu>
      </CssBaseline>
    </>
  );
};

export default ViewBookPage;
