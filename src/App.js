import BookEdit from "./pages/BookEdit";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import MainPageNotEdit from "./pages/MainPageNotEdit";
import BookAdd from "./pages/BookAdd";
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
          <Route path="/" element={<MainPageNotEdit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
