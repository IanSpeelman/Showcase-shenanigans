import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import ShowPage from './Pages/MovieShow'
import { user } from './utils/types'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from 'jwt-decode'
import MovieCreate from './Pages/MovieCreate'
import Register from './Pages/Register'

interface jwtData extends JwtPayload {
    sub: string,
    unique_name: string,
    FirstName: string,
    LastName: string,
    role: string
}

function App() {

    const [user, setUser] = useState<user | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("JWT_Token")
        if (token) {
            const decodedToken = jwtDecode<jwtData>(token)
            setUser({
                id: parseInt(decodedToken.sub),
                email: decodedToken.unique_name,
                firstname: decodedToken.FirstName,
                lastname: decodedToken.LastName,
                role: decodedToken.role
            })
        }
    }, [])


    return (
        <>
            <Routes>
                <Route path='/' element={<Layout user={user} setUser={setUser} />} >
                    <Route path="" element={<Home />} />
                    <Route path="/movies" element={<Movies user={user} />} />
                    <Route path="/movies/:id" element={<ShowPage user={user} />} />
                    <Route path="/movies/add" element={<MovieCreate user={user} />} />
                    <Route path="/movies/edit/:id" element={<MovieCreate user={user} />} />
                    <Route path="/credits" element={<h1>Credits go here</h1>} />
                    <Route path="/register" element={<Register />} />

                </Route>
            </Routes>
        </>
    )
}

export default App
