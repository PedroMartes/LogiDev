import { useState } from 'react';
import { Menu } from '../../components/Menu/Menu';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import styles from './Nif.module.css';
import logo from '../../assets/img/img-1.png';
import * as Icon from 'react-bootstrap-icons'
import { useNavigate, useLocation } from 'react-router';

export function Nif() {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [nif, setNif] = useState('');
  const navigate = useNavigate();

  // Permite apenas números no input
  const handleNifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setNif(value);
  };

  // Handler do botão Confirmar
  const handleConfirm = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    console.log('Botão clicado!');
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      navigate(location.state?.from);
    }, 2000);
  };

  return (
    <div>
      <NavBarGeral />
      <Menu />
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <h1 className={styles.identificationTitle}>Identificação</h1>
          <div className={styles.identificationBox}>
            <label className={styles.inputLabel}>
              Número de identificação Fiscal
            </label>
            <input
              type="text"
              placeholder="NIF:"
              className={styles.inputText}
              value={nif}
              onChange={handleNifChange}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={20}
              autoComplete="off"
            />
          </div>
          <button
            className={styles.confirmButton}
            type="button"
            onClick={handleConfirm}
          >
            Confirmar
          </button>

          {showNotification && (
            <div className={styles.floatingNotification}>
              <div className={styles.notificationHeader}>
                <img src={logo} alt="Logo" style={{ height: '32px', marginRight: '12px', verticalAlign: 'middle' }} />
                <p>LogiDev</p>
              </div>
              <div className={styles.notificationContent}>
                <p className={styles.permissaoNotificacao}>Autorizado <Icon.CheckCircleFill /></p>
                <p className={styles.nomeNif}>Marcos Fernando</p>
                <p className={styles.dataNotificacao}>08:54 26/05/2025</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}