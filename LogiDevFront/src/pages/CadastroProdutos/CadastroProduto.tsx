import React, { useState, useEffect } from 'react';
import styles from './CadastroProduto.module.css';
import axios from 'axios';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useNavigate } from 'react-router';
import { FooterGeral } from '../../components/Footer/Footer';

interface ICategoria {
  id: number;
  nome: string;
}

interface IFornecedor {
  id: number;
  nome: string;
}

export const CadastroProdutos: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fornecedores, setFornecedores] = useState<IFornecedor[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Erro ao cadastrar produto!');

  useEffect(() => {
    axios
      .get("http://localhost:8080/categorias/get", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setCategorias(response.data))
      .catch(error => console.error("Erro ao buscar categorias:", error));
    axios
      .get("http://localhost:8080/fornecedores/get", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao buscar fornecedores:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const produto = {
      nome,
      descricao,
      preco: Number(preco),
      quantidade: Number(quantidade),
      fornecedorId: Number(fornecedor),
      categoriaId: Number(categoria)
    };
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/produtos/create', produto, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
          }
      );
      setShowSuccess(true);
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
      setFornecedor('');
      setCategoria('');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 409 ||
          (typeof error.response.data === 'string' &&
            error.response.data.toLowerCase().includes('já cadastrado')))
      ) {
        setErrorMsg('Produto já cadastrado!');
      } else {
        setErrorMsg('Erro ao cadastrar produto!');
      }
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleNif = () => {
    navigate('/nif', { state: { from: '/cadastro/produtos' } });
  };

  return (
    <>
      <div>
        <NavBarGeral />
        <Menu />
        <div className={styles.containerCadastroProdutos}>
          <div className={styles.cardCadastroProdutos}>
            <h1 className={styles.cadastroProdutosTitle}>Cadastrar produto</h1>
            <form onSubmit={handleSubmit} className={styles.formCadastroProdutos}>
              <div className={styles.formGroupCadastroProdutos}>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do produto"
                  required className={styles.inputCadastroProdutos}
                />
              </div>
              <div className={styles.formRowCadastroProdutos}>
                <div className={styles.halfFormGroupCadastroProdutos}>
                  <select
                    id="fornecedor"
                    value={fornecedor}
                    onChange={(e) => setFornecedor(e.target.value)}
                    required
                    className={styles.selectCadastroProdutos}
                    style={{ fontStyle: fornecedor ? "normal" : "italic", color: fornecedor ? "#444" : "#bdbdbd" }}
                  >
                    <option value="" disabled>Id do fornecedor</option>
                    {fornecedores.map((f) => (
                      <option key={f.id} value={f.id}>{f.nome}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.halfFormGroupCadastroProdutos}>
                  <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className={styles.selectCadastroProdutos}
                    style={{ fontStyle: categoria ? "normal" : "italic", color: categoria ? "#444" : "#bdbdbd" }}
                  >
                    <option className={styles.idCategoria} value="" disabled>Id da categoria</option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formGroupCadastroProdutos}>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição" className={styles.inputCadastroProdutos}
                  required
                />
              </div>
              <div className={styles.formRowCadastroProdutos}>
                <div className={styles.halfFormGroupCadastroProdutos}>
                  <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="Quantidade"
                    required className={styles.inputCadastroProdutos}
                  />
                </div>
                <div className={styles.halfFormGroupCadastroProdutos}>
                  <input
                    type="number"
                    id="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="preço unitário"
                    required className={styles.inputCadastroProdutos}
                  />
                </div>
              </div>
              <button type="submit" className={styles.buttonCadastroProdutos}>
                Enviar
              </button>
            </form>
          </div>

          <div className={styles.verificarWrapperCadastroProdutos}>
            <a href="/controle/produtos" className={styles.verificarEstoqueCadastroProdutos}>
              Verificar no estoque &rarr;
            </a>
          </div>

          {/* ALERTA DE ERRO */}
          {showError && (
            <div className={styles.alertaErro}>
              <div className={styles.alertaErroHeader}>
                <span className={styles.alertaErroTitle}>Erro!!</span>
                <button
                  className={styles.alertaErroClose}
                  onClick={() => setShowError(false)}
                  aria-label="Fechar"
                  type="button"
                >
                  ×
                </button>
              </div>
              <div className={styles.alertaErroMsg}>{errorMsg}</div>
              <button
                className={styles.alertaErroOkBtn}
                onClick={() => setShowError(false)}
                type="button"
              >
                OK
              </button>
            </div>
          )}

          {/* ALERTA DE SUCESSO */}
          {showSuccess && (
            <div className={styles.alertaErro}>
              <div className={styles.alertaErroHeader}>
                <span className={styles.alertaErroTitle}>Sucesso!</span>
                <button
                  className={styles.alertaErroClose}
                  onClick={() => setShowSuccess(false)}
                  aria-label="Fechar"
                  type="button"
                >
                  ×
                </button>
              </div>
              <div className={styles.alertaErroMsg}>Produto cadastrado com sucesso!</div>
              <button
                className={styles.alertaErroOkBtn}
                onClick={() => setShowSuccess(false)}
                type="button"
              >
                OK
              </button>
            </div>
          )}

        </div>
      </div>
      <FooterGeral />
    </>
  );
};