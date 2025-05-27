import { useState } from 'react';
import { Menu } from '../../components/Menu/Menu';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import styles from './Nif.module.css';
import logo from '../../assets/img/img-1.png';
import * as Icon from 'react-bootstrap-icons'

export function Nif() {
  const [showNotification, setShowNotification] = useState(false);

  const handleConfirm = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Esconde após 3s
  };

  return (
    <div>
      <NavBarGeral />
      <Menu />
      <div className={styles["content-wrapper"]}>
        <div className={styles.card}>
          <h1 className={styles["identification-title"]}>Identificação</h1>
          <div className={styles["identification-box"]}>
            <label className={styles["input-label"]}>
              Número de identificação Fiscal
            </label>
            <input type="text" placeholder="NIF:" className={styles.inputText} />
          </div>
          <button className={styles["confirm-button"]} onClick={handleConfirm}>
            Confirmar
          </button>
          {showNotification && (
            <div className={styles.floatingNotification}>
              <div className={styles.notificationHeader}>
              <img src={logo} alt="Logo" style={{ height: '32px', marginRight: '12px', verticalAlign: 'middle' }} />
              <p>LogiDev</p>
              </div>

              <div className={styles.notificationContent}>
                <p className={styles.autorizado}>Autorizado <Icon.Check/></p>
              <p className={styles.NomeNif}>Marcos Fernando</p>
              <p className={styles.dataNotificacao}>08:54 26/05/2025</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}