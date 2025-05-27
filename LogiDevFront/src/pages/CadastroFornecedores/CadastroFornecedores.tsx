import React, { useState } from 'react';
import styles from './CadastroFornecedores.module.css';
import axios from "axios";
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useNavigate } from 'react-router';

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

  const navigate = useNavigate();

  const handleNif = () => {
    navigate('/nif')
  };

  return (
    <div>
      <NavBarGeral />
      <Menu />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.cadastroFornecedoresTitle}>Cadastrar Fornecedor</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Nome do fornecedor"
                required
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.halfFormGroup}>
                <input
                  type="text"
                  id="contato"
                  value={contato}
                  onChange={e => setContato(e.target.value)}
                  placeholder="Contato"
                  required
                />
              </div>
              <div className={styles.halfFormGroup}>
                <input
                  type="text"
                  id="telefone"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                  placeholder="Telefone"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail"
                required
              />
            </div>
            <button type="submit" onClick={handleNif} className={styles.button}>
              Enviar
            </button>
          </form>

          <div className={styles.verificarWrapper}>
            <a href="/controle/produtos" className={styles.verificarEstoque}>
              Verificar no estoque &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};