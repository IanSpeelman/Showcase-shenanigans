import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home/index'
import Movies from './pages/Movies/index'
import Theatres from './pages/Theatres/index'
import Contact from './pages/Contact/index'
import Layout from './pages/Layout/index'
import Login from './pages/Login/index'
import './app.css'
import Register from "./pages/Register"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { jwtData } from "./types"

function App() {
  const [user, setUser] = useState({ id: 0, email: "null", role: "null", firstName: "null", lastName: "null" })

  useEffect(() => {
    const token = localStorage.getItem("JWT_token")
    if (token) {
      console.log("token present")
      const decodedToken = jwtDecode<JwtPayload & jwtData>(token)
      setUser({
        id: decodedToken.sub ? parseInt(decodedToken.sub) : 0,
        email: decodedToken.unique_name,
        role: decodedToken.role,
        firstName: decodedToken.FirstName,
        lastName: decodedToken.LastName,
      })
    }
    else {

      console.log("token not present")
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies user={user} />} />
            <Route path="theatres" element={<Theatres />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login setUser={setUser} />} />
            <Route path="register" element={<Register setUser={setUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
