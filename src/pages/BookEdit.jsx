import React, { cloneElement } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { InputGroup } from "react-bootstrap";

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Input = styled.input`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
const Label = styled.label`
  font-size: 20;
  margin-bottom: ${(props) => props.bottom}px;
`;

const InformationWrapper = styled.div`
  display: flex;
`;
const Flex_column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => props.right}px;
`;

const Flex_Column_Wrapper = styled.div`
  display: flex;
  margin-top: ${(props) => props.top}px;
  margin-left:${(props) => props.left}px;
`;
const Information1 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Information2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  margin: 0 20px;
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  border: solid 1px black;
  &:hover {
    background-color: palevioletred;
    color: white;
    border: none;
    transition: all 0.2s ease-in;
  }
`;
const Footer = styled.div`
  margin-top: ${(props) => props.top}px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;
const Select = styled.select``;
const Option = styled.option``;
const TextArea = styled.textarea`
  height: 150px;
`;

const ValidateText = styled.p`
  color: red;
`;
const Image = styled.img`

`
const BookEdit = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const { state } = useLocation();
  const id = state.book.id;
  const name = state.book.name;
  const author = state.book.author;
  const description = state.book.description;
  const pageCounter = state.book.pageCounter;
  const category = state.book.category;
  const dateCreated = state.book.dateCreated;
  const image = state.book.image

  const [getBook, getBookDetail] = useState({
    id: id,
    name: name,
    author: author,
    description: description,
    dateCreated: dateCreated,
    pageCounter: pageCounter,
    category: category,
    image:image
  });
  const [bookDetail, setBookDetail] = useState({
    id: getBook.id,
    name: getBook.name,
    author: getBook.author,
    description: getBook.description,
    dateCreated: getBook.dateCreated,
    pageCounter: getBook.pageCounter,
    category: getBook.category,
    image:getBook.image
  });
  const [inputTrigger, setInputTrigger] = useState(true);
  const [importedImage,setimportedImage] = useState(bookDetail.image)

  // console.log(bookDetail);
  const handleUpdateBook = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:6969/api/edit-book", {
        id: bookDetail.id,
        name: bookDetail.name,
        author: bookDetail.author,
        description: bookDetail.description,
        dateCreated: bookDetail.dateCreated,
        pageCounter: bookDetail.pageCounter,
        category: bookDetail.category,
        image:bookDetail.image
      })
      .then((res) => setMessage(res.data.errMessage))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if(message ==="Missing input parameters"){
      alert("Please fill information")
    }
    if (message === "updated") {
      alert("Successfull")
      navigate("/mainpage-edit");
    }
  }, [message]);

  const handleNavigateMainPage = () => {
    navigate("/mainpage-edit");
  };
  const handleInputOnOff = () => {
    setInputTrigger(!inputTrigger);
  };
  const onImageChangeTo64 = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = ()=>{
      setBookDetail(prev=>({...prev,image:reader.result.toString()}))
    } 
    reader.readAsDataURL(file)
    }
   const handleRemoveImage = ()=>{
    setBookDetail(prev=>({...prev,image:""}))
   }

  console.log(bookDetail.image)
  return (
    <Wrapper>
      <Title>Sách</Title>
      <InformationWrapper>
        <Information1>
          <Flex_Column_Wrapper>
            <Flex_column right={40}>
              <Label bottom={20}>Tiêu đề</Label>
              <Input
                disabled={inputTrigger}
                required
                type="text"
                name="name"
                defaultValue={bookDetail.name}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, name: e.target.value })
                }
              />
              
            </Flex_column>
            <Flex_column>
              <Label bottom={20}>Tác giả</Label>
              <Input
                disabled={inputTrigger}
                required
                type="text"
                name="author"
                defaultValue={bookDetail.author}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, author: e.target.value })
                }
              />
            </Flex_column>
          </Flex_Column_Wrapper>
          <Flex_Column_Wrapper top={20}>
            <Flex_column>
              <Label bottom={20}>Mô tả về sách</Label>
              <TextArea
                disabled={inputTrigger}
                required
                height={200}
                type="text"
                name="description"
                defaultValue={bookDetail.description}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, description: e.target.value })
                }
              />
            </Flex_column>
          </Flex_Column_Wrapper>
          <Flex_Column_Wrapper top={20}>
            <Flex_column right={40}>
              <Label bottom={20}>Ngày phát hành</Label>
              <Input
                disabled={inputTrigger}
                required
                type="date"
                name="dateCreated"
                defaultValue={bookDetail.dateCreated}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, dateCreated: e.target.value })
                }
              />
            </Flex_column>
            <Flex_column>
              <Label bottom={20}>Số trang</Label>
              <Input
                disabled={inputTrigger}
                required
                type="number"
                name="pageCounter"
                defaultValue={bookDetail.pageCounter}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, pageCounter: e.target.value })
                }
              />
            </Flex_column>
          </Flex_Column_Wrapper>
          <Flex_Column_Wrapper top={20}>
            <Flex_column right={40}>
              <Label bottom={20}>Thể loại</Label>
              {/* <Input
                disabled={inputTrigger}
                type="text"
                name="category"
                defaultValue={bookDetail.category}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, category: e.target.value })
                }
              /> */}
              <Select
                required
                name="category"
                disabled={inputTrigger}
                defaultValue={bookDetail.category}
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, category: e.target.value })
                }
              >
                <Option selected disabled></Option>
                <Option>Kinh dị</Option>
                <Option>Học Đường</Option>
                <Option>Trinh thám</Option>
                <Option>Tiểu Thuyết</Option>
                <Option>Hư cấu</Option>
                <Option>Thiếu nhi</Option>
                <Option>Chính trị</Option>
                <Option>Văn học</Option>
              </Select>
            </Flex_column>
          </Flex_Column_Wrapper>
        </Information1>
        <Information2>
          <Flex_Column_Wrapper style={{display:"flex",alignItems:"center"}}>
          <Input
          
          placeholder="Upload"
          type="file"
          onChange={(e)=>onImageChangeTo64(e)}
        />
        <Button onClick={handleRemoveImage}>Remove</Button>
          </Flex_Column_Wrapper>
          <Flex_Column_Wrapper left={60} top={15}>
              <Image style={{width:"80%"}} src={bookDetail.image}/> 
          </Flex_Column_Wrapper>
        </Information2>
      </InformationWrapper>
      <Footer top={30}>
        <Button onClick={handleNavigateMainPage}>MainPage</Button>
        <Button onClick={handleUpdateBook}>Save</Button>
        <Button onClick={handleInputOnOff}>Edit</Button>
      </Footer>
    </Wrapper>
  );
};

export default BookEdit;
