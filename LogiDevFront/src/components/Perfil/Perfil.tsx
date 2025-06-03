import React, { useRef, useState, useEffect } from "react";
import styles from "./Perfil.module.css";
import * as Icon from 'react-bootstrap-icons'
import axios from "axios";

interface PerfilProps {
  onClose: () => void;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export const Perfil: React.FC<PerfilProps> = ({ onClose }) => {
  const [showAlterarCampo, setShowAlterarCampo] = useState(false);
  const [novoEmail, setNovoEmail] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [showSucesso, setShowSucesso] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const emailLogado = localStorage.getItem('email');
      if (!token || !emailLogado) return;

      try {
        const response = await axios.get('http://localhost:8080/usuarios/get', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const usuarios: Usuario[] = response.data.usuariosAchados;
        const usuarioLogado = usuarios.find((u) => u.email === emailLogado);
        if (usuarioLogado) {
          setUserName(usuarioLogado.nome);
          setEmail(usuarioLogado.email);
          setUsuarioLogado(usuarioLogado);
        } else {
          setUserName("Usuário");
          setEmail("");
          setUsuarioLogado(null);
        }
      } catch (error) {
        setUserName("Usuário");
        setEmail("");
      }
    };
    fetchUserData();
  }, []);

  function isEmailValido(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleAlterarEmailBtn = () => {
    setShowAlterarCampo((v) => !v);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

 const handleAlterarEmail = async (e: React.FormEvent) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const usuarioId = usuarioLogado?.id;
if (!token || !usuarioId) return;

  try {
   await axios.put(
  `http://localhost:8080/usuarios/update-email/${usuarioId}`,
  { email: novoEmail },
  { headers: { Authorization: `Bearer ${token}` } }
);
    setEmail(novoEmail);
    setShowSucesso(true);
    setShowAlterarCampo(false);
    localStorage.setItem('email', novoEmail); // Atualiza o localStorage também
  } catch (error) {
    console.error('Erro ao atualizar e-mail:', error);  
    alert('Erro ao atualizar e-mail!');
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoEmail(e.target.value);
  };

  const handleSair = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.perfilPopup} ${(showAlterarCampo || showSucesso) ? styles.perfilPopupExpandido : ""}`}>
      <div className={styles.perfilPopupHeader}>
        <div className={styles.perfilPopupAvatar}>
          <i className="fas fa-user"></i>
          <Icon.XLg className={styles.iconX} onClick={handleClose} />
        </div>
        <div>
          <div className={styles.perfilPopupNome}>{userName}</div>
          <div className={styles.perfilPopupEmail}>{email}</div>
        </div>
      </div>
      <hr style={{ border: "0.1vw solid #ccc", margin: "0.8vw 0 0 0" }} />
      {showSucesso && (
        <div className={styles.perfilPopupSucesso}>
          <i className="fas fa-check-circle"></i>
          E-mail atualizado com sucesso!
          <span
            className={styles.fecharSucesso}
            title="Fechar"
            onClick={() => setShowSucesso(false)}
          >
            &times;
          </span>
        </div>
      )}
      <div className={styles.perfilPopupOpcoes}>
        <div
          className={styles.perfilPopupOpcao}
          id="alterarEmailBtn"
          onClick={handleAlterarEmailBtn}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-envelope"></i>
          <span>Alterar e-mail</span>
        </div>
        {showAlterarCampo && (
          <form
            className={styles.perfilPopupAlterarCampo}
            id="alterarEmailCampo"
            onSubmit={handleAlterarEmail}
            style={{ display: "flex" }}
          >
            <input
              className={styles.perfilPopupInput}
              id="novoEmailInput"
              type="email"
              placeholder="Novo e-mail"
              value={novoEmail}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <button
              className={styles.perfilPopupBtnAlterar}
              id="btnAlterarEmail"
              type="submit"
              disabled={!isEmailValido(novoEmail)}
            >
              Alterar
            </button>
          </form>
        )}
        <div
          className={styles.perfilPopupSair}
          onClick={handleSair}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Sair da conta</span>
        </div>
      </div>
    </div>
  );
};