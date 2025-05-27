import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sobre } from './pages/Sobre/Sobre'
import { Home } from './pages/Home/Home'
import { Page404 } from './pages/Pagina404/Pagina404'
import { ControleProdutos } from './pages/Controle/ControleProduto'
import { ControleCadastros } from './pages/ControleCadastros/ControleCadastros'
import { GraficoProdutos} from './pages/Graficos/GraficoProdutos'
import { CadastroProdutos  } from './pages/CadastroProdutos/CadastroProduto'
import { CadastroFornecedores  } from './pages/CadastroFornecedores/CadastroFornecedores'
import { CadastroCategorias  } from './pages/CadastroCategorias/CadastroCategorias'
import GraficoFornecedores from './pages/Graficos/GraficoFornecedor'
import { Historico } from './pages/Historico/historico'
import CurvaABC from './pages/CurvaABC/CurvaABC'
import { Alerta } from './pages/Alerta/alerta'
import { NovoAlerta } from './pages/Alerta/novoAlerta'
import { ControleFornecedores } from './pages/Controle/controleFornecedores'
import { ControleCategorias } from './pages/Controle/ControleCategorias'


const Router = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>  
                   
                    <Route path='/cadastro/produtos' element={<CadastroProdutos />} />
                    <Route path='/cadastro/fornecedores' element={<CadastroFornecedores />} />
                    <Route path='/cadastro/categorias' element={<CadastroCategorias />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/sobre' element={<Sobre />} />
                    <Route path='/controle/produtos' element={<ControleProdutos />} />
                    <Route path='/controle/categorias' element={<ControleCategorias />} />
                    <Route path='/controle/fornecedores' element={<ControleFornecedores />} />
                    <Route path='/controle/cadastros' element={<ControleCadastros />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path='/controle/grafico/produtos' element={< GraficoProdutos />} />
                    <Route path='/controle/grafico/fornecedores' element={< GraficoFornecedores />} />
                    <Route path='/historico' element={< Historico />} />
                    <Route path='/curvaABC' element={< CurvaABC />} />
                    <Route path='/alertas' element={< Alerta />} />
                    <Route path='/alertas/novoAlerta' element={< NovoAlerta />} />
                    <Route path='/controle/grafico/produtos' element={< GraficoProdutos />} />
                    <Route path='/controle/grafico/fornecedores' element={< GraficoFornecedores />} />
                    <Route path='/historico' element={< Historico />} />
                    <Route path='/curvaABC' element={< CurvaABC />} />
                    <Route path='/alertas/novoAlerta' element={< NovoAlerta />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;