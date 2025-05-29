// src/components/componentsPerfil.tsx
import React, { useState } from 'react';
import styles from './componentsPerfil.module.css';

 export const ComponentsPerfil: React.FC = () => {
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("marcos.fernando@email.com");
  const [emailUpdated, setEmailUpdated] = useState<boolean>(false);
  const [showComponent, setShowComponent] = useState<boolean>(true);

  // Se o usuário clicar em "Sair da conta", o componente não é renderizado.
  if (!showComponent) return null;

  const handleEditClick = () => {
    setIsEditingEmail(true);
    // Remove uma eventual mensagem de sucesso anterior
    setEmailUpdated(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    // Aqui você pode implementar uma chamada de API para atualizar o e-mail.
    // Neste exemplo, simulamos o envio e a confirmação instantânea.
    setIsEditingEmail(false);
    setEmailUpdated(true);
  };

  const handleLogout = () => {
    // Remove o componente da tela.
    setShowComponent(false);
  };

  return (
    <div className={styles.profileComponent}>
      <div className={styles.profileHeader}>
        <img
          src="/profile-icon.png" // Substitua pelo caminho do seu ícone ou importe a imagem
          alt="Profile Icon"
          className={styles.profileIcon}
        />
        <div className={styles.profileInfo}>
          <h2 className={styles.userName}>Marcos Fernando</h2>

          {/* Exibe o input de edição se estiver em modo de edição */}
          {isEditingEmail ? (
            <div className={styles.editEmail}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Digite seu novo e-mail"
                className={styles.inputEmail}
              />
              <button onClick={handleSendEmail} className={styles.buttonSave}>
                Enviar
              </button>
            </div>
          ) : (
            <>
              <p className={styles.emailText}>{email}</p>
              {emailUpdated && (
                <div className={styles.updateSuccess}>
                  <i className={styles.iconCheck}>✓</i>
                  <span>E-mail atualizado com sucesso!</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.profileOptions}>
        <div className={styles.option} onClick={handleEditClick}>
          <i className={styles.iconEnvelope}>✉</i>
          <span>Alterar e-mail</span>
        </div>
        <div className={styles.option} onClick={handleLogout}>
          <i className={styles.iconLogout}>⏻</i>
          <span>Sair da conta</span>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPerfil;
