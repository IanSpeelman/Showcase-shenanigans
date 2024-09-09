import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home/index'
import Movies from './pages/Movies/index'
import Theatres from './pages/Theatres/index'
import Contact from './pages/Contact/index'
import Layout from './pages/Layout/index'
import Login from './pages/Login/index'
import './app.css'
import Register from "./pages/Register"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="theatres" element={<Theatres />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
