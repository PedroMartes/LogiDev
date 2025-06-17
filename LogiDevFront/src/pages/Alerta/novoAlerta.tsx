import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './novoAlerta.module.css';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { FooterGeral } from '../../components/Footer/Footer';

export const NovoAlerta: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [consequencia, setConsequencia] = useState('');
  const [acao, setAcao] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Erro ao cadastrar alerta!');

  const [errors, setErrors] = useState({
    titulo: false,
    descricao: false,
    consequencia: false,
    acao: false,
  });

  const inputTituloRef = useRef<HTMLInputElement>(null);
  const inputDescricaoRef = useRef<HTMLInputElement>(null);
  const inputConsequenciaRef = useRef<HTMLInputElement>(null);
  const inputAcaoRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const cancelarAlerta = () => {
    setTitulo('');
    setDescricao('');
    setConsequencia('');
    setAcao('');
    setErrors({
      titulo: false,
      descricao: false,
      consequencia: false,
      acao: false,
    });
    navigate('/alertas');
  };

  const salvarAlerta = async () => {
    const newErrors = {
      titulo: !titulo,
      descricao: !descricao,
      consequencia: !consequencia,
      acao: !acao,
    };
    setErrors(newErrors);

    // Se algum campo estiver vazio, não salva
    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/alertas/create', {
        titulo,
        descricao,
        consequencia,
        acao
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowSuccess(true);
    } catch (error: any) {
      setErrorMsg('Erro ao cadastrar alerta!');
      console.error(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      console.error(error);
    }
  };

  const fecharPopup = () => {
    setShowPopup(false);
    navigate('/alertas');
  };

  // Função para fechar o alerta de sucesso e redirecionar
  const fecharAlertaSucesso = () => {
    setShowSuccess(false);
    navigate('/alertas');
  };

  return (
    <div>
      <NavBarGeral />
      <Menu />
      <div className={styles.ContainerNovoAlerta}>
        <h1 className={styles.TituloNovoAlerta}>Adicionar Alerta</h1>
        <h2 className={styles.SubtituloNovoAlerta}>Novo Alerta</h2>
        <div className={styles.TabelaNovoAlerta}>
          <div className={styles.CabecalhoTabelaNovoAlerta}>Alertas</div>
          <div
            className={styles.LinhaTabelaNovoAlerta}
            onClick={() => inputTituloRef.current?.focus()}
          >
            <span className={styles.ColunaTituloNovoAlerta}>Título do Alerta:</span>
            <div style={{ width: '100%' }}>
              <input
                id="inputTitulo"
                className={`${styles.ColunaValorNovoAlerta} ${styles.InputNovoAlerta}`}
                type="text"
                value={titulo}
                autoComplete="off"
                onChange={e => {
                  setTitulo(e.target.value);
                  setErrors(prev => ({ ...prev, titulo: false }));
                }}
                ref={inputTituloRef}
              />
              {errors.titulo && (
                <div className={styles.inputErrorMsg}>
                  <span className={styles.inputErrorIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" style={{ verticalAlign: 'middle' }}>
                      <circle cx="9" cy="9" r="9" fill="#e53935" />
                      <path d="M6 6L12 12M12 6L6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.inputErrorText}>Campo não preenchido</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.LinhaTabelaNovoAlerta}
            onClick={() => inputDescricaoRef.current?.focus()}
          >
            <span className={styles.ColunaTituloNovoAlerta}>Descrição:</span>
            <div style={{ width: '100%' }}>
              <input
                id="inputDescricao"
                className={`${styles.ColunaValorNovoAlerta} ${styles.InputNovoAlerta}`}
                type="text"
                value={descricao}
                autoComplete="off"
                onChange={e => {
                  setDescricao(e.target.value);
                  setErrors(prev => ({ ...prev, descricao: false }));
                }}
                ref={inputDescricaoRef}
              />
              {errors.descricao && (
                <div className={styles.inputErrorMsg}>
                  <span className={styles.inputErrorIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" style={{ verticalAlign: 'middle' }}>
                      <circle cx="9" cy="9" r="9" fill="#e53935" />
                      <path d="M6 6L12 12M12 6L6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.inputErrorText}>Campo não preenchido</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.LinhaTabelaNovoAlerta}
            onClick={() => inputConsequenciaRef.current?.focus()}
          >
            <span className={styles.ColunaTituloNovoAlerta}>Consequência:</span>
            <div style={{ width: '100%' }}>
              <input
                id="inputConsequencia"
                className={`${styles.ColunaValorNovoAlerta} ${styles.InputNovoAlerta}`}
                type="text"
                value={consequencia}
                autoComplete="off"
                onChange={e => {
                  setConsequencia(e.target.value);
                  setErrors(prev => ({ ...prev, consequencia: false }));
                }}
                ref={inputConsequenciaRef}
              />
              {errors.consequencia && (
                <div className={styles.inputErrorMsg}>
                  <span className={styles.inputErrorIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" style={{ verticalAlign: 'middle' }}>
                      <circle cx="9" cy="9" r="9" fill="#e53935" />
                      <path d="M6 6L12 12M12 6L6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.inputErrorText}>Campo não preenchido</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.LinhaTabelaNovoAlerta}
            onClick={() => inputAcaoRef.current?.focus()}
          >
            <span className={styles.ColunaTituloNovoAlerta}>Ação:</span>
            <div style={{ width: '100%' }}>
              <input
                id="inputAcao"
                className={`${styles.ColunaValorNovoAlerta} ${styles.InputNovoAlerta}`}
                type="text"
                value={acao}
                autoComplete="off"
                onChange={e => {
                  setAcao(e.target.value);
                  setErrors(prev => ({ ...prev, acao: false }));
                }}
                ref={inputAcaoRef}
              />
              {errors.acao && (
                <div className={styles.inputErrorMsg}>
                  <span className={styles.inputErrorIcon}>
                    <svg width="18" height="18" viewBox="0 0 18 18" style={{ verticalAlign: 'middle' }}>
                      <circle cx="9" cy="9" r="9" fill="#e53935" />
                      <path d="M6 6L12 12M12 6L6 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.inputErrorText}>Campo não preenchido</span>
                </div>
              )}
            </div>
          </div>
          <div className={styles.LinhaBotoesNovoAlerta}>
            <button
              className={styles.BotaoCancelarNovoAlerta}
              type="button"
              onClick={cancelarAlerta}
            >
              Cancelar
            </button>
            <button
              className={styles.BotaoSalvarNovoAlerta}
              type="button"
              onClick={salvarAlerta}
            >
              Salvar Alerta
            </button>
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

        {/* ALERTA DE SUCESSO */}
        {showSuccess && (
          <div className={styles.alertaErro}>
            <div className={styles.alertaErroHeader}>
              <span className={styles.alertaErroTitle}>Sucesso!</span>
              <button
                className={styles.alertaErroClose}
                onClick={fecharAlertaSucesso}
                aria-label="Fechar"
                type="button"
              >
                ×
              </button>
            </div>
            <div className={styles.alertaErroMsg}>Alerta adicionado com sucesso!</div>
            <button
              className={styles.alertaErroOkBtn}
              onClick={fecharAlertaSucesso}
              type="button"
            >
              OK
            </button>
          </div>
        )}

      </div>
      <FooterGeral />
    </div>
  );
};

export default NovoAlerta;