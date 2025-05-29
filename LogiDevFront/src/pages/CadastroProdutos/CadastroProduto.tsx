// CadastroProdutos.tsx
import React, { useState, useEffect } from 'react';
import styles from './CadastroProduto.module.css';
import axios from 'axios';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useNavigate } from 'react-router';

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/categorias/get")
      .then(response => setCategorias(response.data))
      .catch(error => console.error("Erro ao buscar categorias:", error));
    axios
      .get("http://localhost:8080/fornecedores/get")
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

    try {
      console.log(produto);
      await axios.post('http://localhost:8080/produtos/create', produto);
      alert('Produto cadastrado com sucesso!');
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
      setFornecedor('');
      setCategoria('');
    } catch (error) {
      alert('Erro ao cadastrar produto!');
      console.error(error);
    }
  };

   const navigate = useNavigate();
 
   const handleNif = () => {
     navigate('/nif', { state: { from: '/cadastro/produtos' } }); // ou use window.location.pathname para pegar a página atual
   };
  return (
    <>
      <div>

        <NavBarGeral />
        <Menu />
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.cadastroProdutosTitle}>Cadastrar produto</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do produto"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.halfFormGroup}>
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
                <div className={styles.halfFormGroup}>
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
              <div className={styles.formGroup}>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.halfFormGroup}>
                  <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder="Quantidade"
                    required
                  />
                </div>
                <div className={styles.halfFormGroup}>
                  <input
                    type="number"
                    id="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="preço unitário"
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.button}>
                Enviar
              </button>
            </form>
          </div>

          <div className={styles.verificarWrapper}>
    <a href="/controle/produtos" className={styles.verificarEstoque}>
      Verificar no estoque &rarr;
    </a>
  </div>
        </div>
      </div>
    </>
  );
};
