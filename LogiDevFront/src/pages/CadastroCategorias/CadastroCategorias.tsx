import React, { useState } from 'react';
import styles from './CadastroCategorias.module.css';
import axios from 'axios';

export const CadastroCategorias: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoria = { nome, descricao };

    try {
      await axios.post('http://localhost:8080/categorias/create', categoria);
      alert('Categoria cadastrada com sucesso!');
      setNome('');
      setDescricao('');
    } catch (error) {
      alert('Erro ao cadastrar categoria!');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.cadastroCategoriasTitle}>Cadastro de Categorias</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome da Categoria:</label>
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
        <button type="submit" className={styles.button}>
          Cadastrar Categoria
        </button>
      </form>
    </div>
  );
};
