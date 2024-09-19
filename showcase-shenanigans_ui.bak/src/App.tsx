import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home/index'
import Movies from './pages/Movies/index'
import Layout from './pages/Layout/index'
import Login from './pages/Login/index'
import './app.css'
import Register from "./pages/Register"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { jwtData } from "./types"
import MovieDetails from "./pages/Movies/Components/MovieDetails"
import Profile from "./pages/Profile"
import Contact from "./pages/Contact"
import AddMovie from "./pages/Movies/Components/AddMovie"
import AddSchedule from "./pages/Schedule/Index"

function App() {
    const [user, setUser] = useState({ id: 0, email: "null", role: "null", firstName: "null", lastName: "null" })

    useEffect(() => {
        const token = localStorage.getItem("JWT_token")
        if (token) {
            const decodedToken = jwtDecode<JwtPayload & jwtData>(token)
            setUser({
                id: decodedToken.sub ? parseInt(decodedToken.sub) : 0,
                email: decodedToken.unique_name,
                role: decodedToken.role,
                firstName: decodedToken.FirstName,
                lastName: decodedToken.LastName,
            })
        }
    }, [])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout user={user} setUser={setUser} />}>
                        <Route index element={<Home />} />
                        <Route path="movies" element={<Movies user={user} />} />
                        <Route path="movies/:id" element={<MovieDetails user={user} />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="login" element={<Login setUser={setUser} />} />
                        <Route path="register" element={<Register setUser={setUser} />} />
                        <Route path="addMovie" element={<AddMovie user={user} />} />
                        <Route path="movies/edit/:id" element={<AddMovie user={user} />} />
                        <Route path="movies/schedule/:id" element={<AddSchedule user={user} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
