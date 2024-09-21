import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import ShowPage from './Pages/MovieShow'

function App() {




    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route path="" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<ShowPage />} />
                    <Route path="/credits" element={<h1>Credits go here</h1>} />
                </Route>
            </Routes>
        </>
    )
}

export default App
