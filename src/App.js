import BookEdit from "./pages/BookEdit";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import MainPageNotEdit from "./pages/MainPageNotEdit";
import BookAdd from "./pages/BookAdd";
import MainPageUser from "./pages/user/MainPageUser";
import ViewBookPage from "./pages/user/ViewBookPage";
import MainPageUserNotLogged from "./pages/user/MainPageUserNotLogged";
import ViewBookPageNotLogged from "./pages/user/ViewBookPageNotLogged";
import CartPageUser from "./pages/user/CartPageUser"
import BuyPage from "./pages/user/BuyPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/mainpage-edit" element={<MainPage/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/edit-book" element={<BookEdit/>}/>
          <Route path="/add-book" element={<BookAdd/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
          {/* <Route path="/" element={<MainPageNotEdit/>}/> */}
          {/* user */}
          <Route path="/user-main-page" element={<MainPageUser/>}/>
          <Route path="/user-view-book-page" element={<ViewBookPage/>}/>
          {/* user not logged */}
          <Route path="/" element={<MainPageUserNotLogged/>}/>
          <Route path="/user-view-book-page-notlogged" element={<ViewBookPageNotLogged/>}/>
          {/* cart section */}
          <Route path="/cart" element={<CartPageUser/>}/>
          {/* buy page */}
          <Route path="/buy-page" element={<BuyPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
