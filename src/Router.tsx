import { Faleconosco } from './components/Faleconosco'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<NavBar />} />
                <Route path='/contato' element={<Faleconosco />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;