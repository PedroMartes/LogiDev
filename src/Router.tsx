import { Faleconosco } from './components/FaleConosco/Faleconosco'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sobre } from './pages/Sobre/Sobre'
import { Home } from './pages/Home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { Page404 } from './pages/Pagina404/Pagina404'
import { Controle } from './pages/Controle/Controle'
import { ControleCadastros } from './pages/ControleCadastros/ControleCadastros'

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
                    <Route path='/controle' element={<Controle />} />
                    <Route path='/controle/cadastros' element={<ControleCadastros />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;