// CadastroProdutos.tsx
import React, { useState, useEffect } from 'react';
import styles from './CadastroProduto.module.css';
import axios from 'axios';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';

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

  return (

          <>
            <NavBarGeral />
            <Menu />
            <div className={styles.container}>
              <h1 className={styles.cadastroProdutosTitle}>Cadastro de Produtos</h1>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Campo Nome ocupa toda a largura no topo */}
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                {/* Linha 1: Fornecedor e Categoria lado a lado */}
                <div className={styles.formRow}>
                  <div className={styles.halfFormGroup}>
                    <label htmlFor="fornecedor">Fornecedor:</label>
                    <select
                      id="fornecedor"
                      value={fornecedor}
                      onChange={(e) => setFornecedor(e.target.value)}
                      required
                      className={styles.selectCadastroProdutos}
                    >
                      <option value="">Selecione</option>
                      {fornecedores.map((f) => (
                        <option key={f.id} value={f.id}>{f.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.halfFormGroup}>
                    <label htmlFor="categoria">Categoria:</label>
                    <select
                      id="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                      className={styles.selectCadastroProdutos}
                    >
                      <option value="">Selecione</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Linha 2: Preço e Quantidade lado a lado */}
                <div className={styles.formRow}>
                  <div className={styles.halfFormGroup}>
                    <label htmlFor="preco">Preço:</label>
                    <input
                      type="number"
                      id="preco"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.halfFormGroup}>
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input
                      type="number"
                      id="quantidade"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* Campo Descrição ocupa toda a largura no meio ou em baixo */}
                <div className={styles.formGroup}>
                  <label htmlFor="descricao">Descrição:</label>
                  <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.button}>
                  Cadastrar Produto
                </button>
              </form>
            </div>
          </>
          );
};
