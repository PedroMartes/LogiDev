import React, { useState } from 'react';
import styles from './CadastroFornecedores.module.css';
import axios from "axios";
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
<<<<<<< HEAD
=======
// import { useNavigate } from 'react-router';
>>>>>>> dev
import { FooterGeral } from '../../components/Footer/Footer';

export const CadastroFornecedores: React.FC = () => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Erro ao cadastrar fornecedor!');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
    console.log("Enviando fornecedor...");

  const fornecedor = { nome, contato, telefone, email };
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      'http://localhost:8080/fornecedores/create',
      fornecedor,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Resposta do backend:", response);
    setShowSuccess(true);
    setNome('');
    setContato('');
    setTelefone('');
    setEmail('');
    setTimeout(() => setShowSuccess(false), 3000);
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 409 ||
        (typeof error.response.data === 'string' &&
          error.response.data.toLowerCase().includes('já cadastrado')))
    ) {
      setErrorMsg('Fornecedor já cadastrado!');
    } else {
      setErrorMsg('Erro ao cadastrar fornecedor!');
    }
<<<<<<< HEAD
  };

=======
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
    console.error(error);
  }
};
>>>>>>> dev

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
            <button type="submit" className={styles.buttonEnviar}>
              Enviar
            </button>
          </form>

          <div className={styles.verificarWrapper}>
            <a href="/controle/produtos" className={styles.verificarEstoque}>
              Verificar no estoque &rarr;
            </a>
          </div>

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
              <div className={styles.alertaErroMsg}>Fornecedor cadastrado com sucesso!</div>
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
      <FooterGeral/>
    </div>
  );
};