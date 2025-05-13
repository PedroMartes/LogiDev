import React, { useState } from 'react';
import styles from './CadastroFornecedores.module.css';
import axios from "axios";

export const CadastroFornecedores: React.FC = () => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fornecedor = { nome, contato, telefone, email };

    try {
      await axios.post('http://localhost:8080/fornecedores/create', fornecedor);
      alert('Fornecedor cadastrado com sucesso!');
      setNome('');
      setContato('');
      setTelefone('');
      setEmail('');
    } catch (error) {
      alert('Erro ao cadastrar fornecedor!');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Cadastro de Fornecedores</h1>
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
          <label htmlFor="contato">Contato:</label>
          <input
            type="text"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Cadastrar Fornecedor
        </button>
      </form>
    </div>
  );
};