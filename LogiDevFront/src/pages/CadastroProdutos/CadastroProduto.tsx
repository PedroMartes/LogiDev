import React, { useState } from 'react';
import styles from './CadastroProduto.module.css';

export const CadastroProdutos: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const produto = { nome, descricao, preco, quantidade };
    console.log('Produto cadastrado:', produto);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend

    // Limpa o formulário após o envio
    setNome('');
    setDescricao('');
    setPreco('');
    setQuantidade('');
  };

  return (
    <div className={styles.container}>
      <h1>Cadastro de Produtos</h1>
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
        <button type="submit" className={styles.button}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};
