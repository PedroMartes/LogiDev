import React, { useState } from 'react';
import styles from './CadastroCategorias.module.css';
import axios from "axios";
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';

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
    }
  };

  return (
    <>
      <NavBarGeral />
      <Menu />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.cadastroCategoriasTitle}>Cadastrar categoria</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              id='nome'
              className={styles.inputCategoria}
              type="text"
              placeholder="Nome da categoria"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <textarea
              id='descricao'
              className={styles.inputDescricao}
              placeholder="Descrição"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              required
            />
            <button type="submit" className={styles.buttonEnviar}>
              Enviar
            </button>
          </form>
        </div>
        <div className={styles.verificarWrapper}>
          <a className={styles.verificarEstoque} href="/estoque">
            Verificar no estoque &rarr;
          </a>
        </div>
      </div>
    </>
  );
};