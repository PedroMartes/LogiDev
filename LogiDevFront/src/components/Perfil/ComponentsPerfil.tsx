import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './componentsPerfil.module.css';

export const ComponentsPerfil: React.FC = () => {
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [emailUpdated, setEmailUpdated] = useState<boolean>(false);
  const [showComponent, setShowComponent] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:8080/usuarios/get', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserName(response.data.nome); // Ajuste conforme o campo retornado pela sua API
        setEmail(response.data.email);
      } catch (error) {
        // Trate o erro, por exemplo, deslogando o usuário
        setShowComponent(false);
      }
    };
    fetchUserData();
  }, []);

  if (!showComponent) return null;

  const handleEditClick = () => {
    setIsEditingEmail(true);
    setEmailUpdated(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    // Aqui você pode implementar uma chamada de API para atualizar o e-mail.
    setIsEditingEmail(false);
    setEmailUpdated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowComponent(false);
    // Você pode redirecionar para a página inicial se desejar
  };

  return (
    <div className={styles.profileComponent}>
      <div className={styles.profileHeader}>
        <img
          src="/profile-icon.png"
          alt="Profile Icon"
          className={styles.profileIcon}
        />
        <div className={styles.profileInfo}>
          <h2 className={styles.userName}>{userName}</h2>
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