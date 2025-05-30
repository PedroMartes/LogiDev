import React, { useRef, useState } from "react";
import styles from "./Perfil.module.css";
import * as Icon from 'react-bootstrap-icons'

interface PerfilProps {
  onClose: () => void;
}

export const Perfil: React.FC<PerfilProps> = ({ onClose }) => {
  const [showAlterarCampo, setShowAlterarCampo] = useState(false);
  const [novoEmail, setNovoEmail] = useState("");
  const [email, setEmail] = useState("marcos.fernando@email.com");
  const [showSucesso, setShowSucesso] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function isEmailValido(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleAlterarEmailBtn = () => {
    setShowAlterarCampo((v) => !v);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleAlterarEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(novoEmail);
    setShowSucesso(true);
    setShowAlterarCampo(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoEmail(e.target.value);
  };

  const handleSair = () => {
    window.location.href = "/";
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null; // Isso faz com que o componente não seja renderizado
  }


  return (
    <div className={`${styles.perfilPopup} ${(showAlterarCampo || showSucesso) ? styles.perfilPopupExpandido : ""}`}>      <div className={styles.perfilPopupHeader}>
      <div className={styles.perfilPopupAvatar}>
        <i className="fas fa-user"></i><Icon.XLg className={styles.iconX} onClick={handleClose} />
      </div>
      <div>
        <div className={styles.perfilPopupNome}>Marcos Fernando</div>
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

// import { useState } from 'react';
// import styles from './Perfil.module.css';
// import * as Icon from 'react-bootstrap-icons';

// export function Perfil({ onClose }: { onClose: () => void }) {

//     const [isOpen, setIsOpen] = useState(true);

//     const handleClose = () => {
//         setIsOpen(false);
//         onClose();
//     };

//     if (!isOpen) {
//         return null; // Isso faz com que o componente não seja renderizado
//     }



//     return (
//         <>
//                 <div className={styles.container}>

//                     <div className={styles.faleConosco}>
//                         <form>
//                             <h1>Fale conosco</h1> <Icon.XLg className={styles.iconX} onClick={handleClose}/>
//                             <hr/>
//                             <p>Tire suas dúvidas, envie a sua mensagem e nós responderemos o mais breve possível. Obrigado!</p>
//                             <input className={styles.input}
//                             required
//                             placeholder=" Nome da Empresa:" />
//                             <input className={styles.input}
//                             required type='tel'
//                             placeholder="CNPJ/CPF:" />
//                             <input className={styles.input}
//                             required type='email'
//                             placeholder=" E-mail:" />
//                             <textarea className={styles.inputMensagem}
//                             required
//                             placeholder=" Sua Mensagem:"></textarea>
//                             <button type="submit" className={styles.botaoEnviar}>Enviar</button>
//                         </form>
//                     </div >
//                 </div >
//         </>
//     )
// }