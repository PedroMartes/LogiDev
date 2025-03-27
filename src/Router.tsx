import { Faleconosco } from './components/Faleconosco'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Sobre } from './components/Sobre'

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<NavBar />} />
                <Route path='/contato' element={<Faleconosco />} />
                <Route path='/sobre' element={<Sobre />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;