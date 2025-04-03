import { Faleconosco } from './components/Faleconosco'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sobre } from './components/Sobre'
import { Home } from './components/Home'
import { NavBar } from './components/NavBar'
import { Page404 } from './components/Pagina404'
import { Controller } from './components/Controller'

const Router = () => {

    return (
        <div>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/contato' element={<Faleconosco />} />
                    <Route path='/sobre' element={<Sobre />} />
                    <Route path='/controle' element={<Controller />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;