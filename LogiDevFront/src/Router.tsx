import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sobre } from './pages/Sobre/Sobre'
import { Home } from './pages/Home/Home'
import { Page404 } from './pages/Pagina404/Pagina404'
import { ControleProdutos } from './pages/Controle/ControleProduto'
import { ControleCadastros } from './pages/ControleCadastros/ControleCadastros'
import { GraficoProdutos } from './pages/Graficos/GraficoProdutos'
import { CadastroProdutos } from './pages/CadastroProdutos/CadastroProduto'
import { CadastroFornecedores } from './pages/CadastroFornecedores/CadastroFornecedores'
import { CadastroCategorias } from './pages/CadastroCategorias/CadastroCategorias'
import { GraficoFornecedores } from './pages/Graficos/GraficoFornecedor'
import { HistoricoProdutos } from './pages/Historico/HistoricoProdutos'
import { HistoricoCategorias } from './pages/Historico/HistoricoCategorias'
import { HistoricoFornecedores } from './pages/Historico/HistoricoFornecedores'
import CurvaABC from './pages/CurvaABC/CurvaABC'
import { Alerta } from './pages/Alerta/alerta'
import { NovoAlerta } from './pages/Alerta/novoAlerta'
import { ControleFornecedores } from './pages/Controle/controleFornecedores'
import { ControleCategorias } from './pages/Controle/ControleCategorias'
import { Nif } from './pages/NIF/Nif'
import { DetalheProduto } from './pages/DetalheProduto/Detalheproduto'
import { DetalheCategoria } from './pages/DetalheCategoria/DetalheCategoria'
import { DetalheFornecedor } from './pages/DetalheFornecedor/DetalheFornecedor'
import { ProtectedRoute } from "./Routerprotect";


// ...existing imports...

const Router = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Rotas públicas */}
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/sobre' element={<Sobre />} />
                    <Route path="*" element={<Page404 />} />

                    {/* Rotas protegidas */}
                    <Route
                        path="/detalhe/fornecedores/:id"
                        element={
                            <ProtectedRoute>
                                <DetalheFornecedor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/detalhe/categorias/:id'
                        element={
                            <ProtectedRoute>
                                <DetalheCategoria />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/detalhe/produtos/:id'
                        element={
                            <ProtectedRoute>
                                <DetalheProduto />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/cadastro/produtos'
                        element={
                            <ProtectedRoute>
                                <CadastroProdutos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/cadastro/fornecedores'
                        element={
                            <ProtectedRoute>
                                <CadastroFornecedores />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/cadastro/categorias'
                        element={
                            <ProtectedRoute>
                                <CadastroCategorias />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/controle/categorias'
                        element={
                            <ProtectedRoute>
                                <ControleCategorias />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/controle/fornecedores'
                        element={
                            <ProtectedRoute>
                                <ControleFornecedores />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/controle/cadastros'
                        element={
                            <ProtectedRoute>
                                <ControleCadastros />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/controle/produtos'
                        element={
                            <ProtectedRoute>
                                <ControleProdutos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/controle/grafico/produtos'
                        element={
                            <ProtectedRoute>
                                <GraficoProdutos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/controle/grafico/fornecedores'
                        element={
                            <ProtectedRoute>
                                <GraficoFornecedores />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/historico/produtos'
                        element={
                            <ProtectedRoute>
                                <HistoricoProdutos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/historico/fornecedores'
                        element={
                            <ProtectedRoute>
                                <HistoricoFornecedores />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/historico/categorias'
                        element={
                            <ProtectedRoute>
                                <HistoricoCategorias />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/curvaABC'
                        element={
                            <ProtectedRoute>
                                <CurvaABC />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/alertas'
                        element={
                            <ProtectedRoute>
                                <Alerta />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/alertas/novoAlerta'
                        element={
                            <ProtectedRoute>
                                <NovoAlerta />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/nif'
                        element={
                            <ProtectedRoute>
                                <Nif />
                            </ProtectedRoute>
                        }
                    />
                    {/* Página 404 protegida (opcional, pode deixar pública se preferir) */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router;

