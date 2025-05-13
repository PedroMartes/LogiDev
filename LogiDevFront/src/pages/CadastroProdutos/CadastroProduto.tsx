import React, { useState, useEffect } from 'react';
import styles from './CadastroProduto.module.css';
import axios from "axios";

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
    axios.get("http://localhost:8080/categorias/get")
      .then(response => setCategorias(response.data))
      .catch(error => console.error("Erro ao buscar categorias:", error));
    axios.get("http://localhost:8080/fornecedores/get")
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao buscar fornecedores:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Busca os objetos completos pelo id selecionado
    const fornecedorObj = fornecedores.find(f => f.id === Number(fornecedor));
    const categoriaObj = categorias.find(c => c.id === Number(categoria));

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
    <div className={styles.container}>
      <h1 className={styles.cadastroProdutosTitle}>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <div className={styles.formGroup}>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
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
        <div className={styles.formGroup}>
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
        <button type="submit" className={styles.button}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};