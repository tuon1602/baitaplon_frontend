import React, { cloneElement } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

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
const Image = styled.image`
  width:${(props)=>props.width}px;
  height:${(props)=>props.height}px;
`;
const TextArea = styled.textarea`
  height: 150px;
`;
const ValidateText = styled.p`
  color:red
`
const BookAdd = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [bookDetail, setBookDetail] = useState({
    name: " ",
    author: " ",
    description: " ",
    dateCreated: " ",
    pageCounter: ' ',
    category: " ",
    image: " "
  });
  console.log(bookDetail);
  const [message, setMessage] = useState("");
  const handleCreateBook = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/api/create-new-book", {
        name: bookDetail.name,
        author: bookDetail.author,
        description: bookDetail.description,
        dateCreated: bookDetail.dateCreated,
        pageCounter: bookDetail.pageCounter,
        category: bookDetail.category,
        image:bookDetail.image
      })
      .then((res) => setMessage(res.data.message.errMessage))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (message === "ok") {
      alert("Create book successful")
      navigate("/mainpage-edit");
    }
  }, [message]);
  const handleReturnHomePage = () => {
    navigate("/mainpage-edit");
  };
  const onImageChangeTo64 = (event) => {
    const file = event.target.files[0]
    // file.preview= URL.createObjectURL(file)
    // setImage(file)
    const reader = new FileReader()
    reader.onloadend = ()=>{
      setImage(reader.result.toString())
    } 
    reader.readAsDataURL(file) 
   }
   const handleRemoveImage = ()=>{
    setImage(" ")
   }
   if(image){
    bookDetail.image = image
   }
  return (
    <Wrapper>
      <Title>Sách</Title>
      <InformationWrapper>
        <Information1>
          <Flex_Column_Wrapper>
            <Flex_column right={40}>
              <Label bottom={20}>Tiêu đề</Label>
              <Input
                required
                type="text"
                name="name"
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, name: e.target.value })
                }
              />
            </Flex_column>
            <Flex_column>
              <Label bottom={20}>Tác giả</Label>
              <Input
                type="text"
                name="author"
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
                height={200}
                type="text"
                name="description"
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
                type="date"
                name="dateCreated"
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, dateCreated: e.target.value })
                }
              />
            </Flex_column>
            <Flex_column>
              <Label bottom={20}>Số trang</Label>
              <Input
                type="number"
                name="pageCounter"
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, pageCounter: e.target.value })
                }
              />
            </Flex_column>
          </Flex_Column_Wrapper>
          <Flex_Column_Wrapper top={20}>
            <Flex_column right={40}>
              <Label bottom={20}>Thể loại</Label>
              {/* <Input type='text'/> */}
              <Select
                name="category"
                onChange={(e) =>
                  setBookDetail({ ...bookDetail, category: e.target.value })
                }
              >
                <Option></Option>
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
          <Flex_Column_Wrapper top={15} left={100}>
            {image &&(<img src={image} width="80%"/>)}
          </Flex_Column_Wrapper>
        </Information2>
      </InformationWrapper>
      <ValidateText style={{textAlign:"center"}}>{message}</ValidateText>
      <Footer top={30}>
        <Button onClick={handleReturnHomePage}>Return to HomePage</Button>
        <Button onClick={handleCreateBook}>Add</Button>
      </Footer>
    </Wrapper>
  );
};

export default BookAdd;
