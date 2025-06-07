import React, { useState } from 'react';
import styles from './CadastroCategorias.module.css';
import axios from "axios";
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useLocation, useNavigate } from 'react-router';
import { FooterGeral } from '../../components/Footer/Footer';

export const CadastroCategorias: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Erro ao cadastrar categoria!');
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state?.categoria && location.state?.nifConfirmado) {
      // Realiza o cadastro automaticamente
      const cadastrar = async () => {
        try {
          await axios.post('http://localhost:8080/categorias/create', location.state.categoria);
          setShowSuccess(true);
          setNome('');
          setDescricao('');
          setTimeout(() => setShowSuccess(false), 3000);
        } catch (error: any) {
          if (
            error.response &&
            (error.response.status === 409 ||
              (typeof error.response.data === 'string' &&
                error.response.data.toLowerCase().includes('já cadastrado')))
          ) {
            setErrorMsg('Categoria já cadastrada!');
          } else {
            setErrorMsg('Erro ao cadastrar categoria!');
          }
          setShowError(true);
          setTimeout(() => setShowError(false), 5000);
        }
      };
      cadastrar();
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoria = { nome, descricao };
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/categorias/create', categoria,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowSuccess(true);
      setNome('');
      setDescricao('');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 409 ||
          (typeof error.response.data === 'string' &&
            error.response.data.toLowerCase().includes('já cadastrado')))
      ) {
        setErrorMsg('Categoria já cadastrada!');
      } else {
        setErrorMsg('Erro ao cadastrar categoria!');
      }
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
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
          <a className={styles.verificarEstoque} href="/controle/categorias">
            Verificar no estoque &rarr;
          </a>
        </div>
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
          <div className={styles.alertaErroMsg}>Categoria cadastrada com sucesso!</div>
          <button
            className={styles.alertaErroOkBtn}
            onClick={() => setShowSuccess(false)}
            type="button"
          >
            OK
          </button>
        </div>
      )}

      <FooterGeral/>
    </>
  );
};