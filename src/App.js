import BookEdit from "./pages/BookEdit";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<SignUp/>}/>
          <Route path="/edit-page" element={<BookEdit/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
