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
import { HistoricoProdutos } from './pages/Historico/HistoricoProdutos'
import { HistoricoCategorias } from './pages/Historico/HistoricoCategorias'
import { HistoricoFornecedores } from './pages/Historico/HistoricoFornecedores'
import CurvaABC from './pages/CurvaABC/CurvaABC'
import { Alerta } from './pages/Alerta/alerta'
import { NovoAlerta } from './pages/Alerta/novoAlerta'
import { ControleFornecedores } from './pages/Controle/controleFornecedores'
import { ControleCategorias } from './pages/Controle/ControleCategorias'
import { Nif } from './pages/NIF/Nif'
import { DetalheProduto } from './pages/DetalheProduto/DetalheProduto'
import { DetalheCategoria } from './pages/DetalheCategoria/DetalheCategoria'
import { DetalheFornecedor } from './pages/DetalheFornecedor/DetalheFornecedor'


const Router = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>  
                    <Route path='/detalhe/fornecedores/:id' element={<DetalheFornecedor />} />
                    <Route path='/detalhe/categorias/:id' element={<DetalheCategoria />} />
                    <Route path='/detalhe/produtos/:id' element={<DetalheProduto />} />
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
                    <Route path='/historico/produtos' element={< HistoricoProdutos />} />
                    <Route path='/historico/fornecedores' element={< HistoricoFornecedores />} />
                    <Route path='/historico/categorias' element={< HistoricoCategorias />} />
                    <Route path='/curvaABC' element={< CurvaABC />} />
                    <Route path='/alertas' element={< Alerta />} />
                    <Route path='/alertas/novoAlerta' element={< NovoAlerta />} />
                    <Route path='/controle/grafico/produtos' element={< GraficoProdutos />} />
                    <Route path='/controle/grafico/fornecedores' element={< GraficoFornecedores />} />
                    <Route path='/curvaABC' element={< CurvaABC />} />
                    <Route path='/nif' element={< Nif />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;