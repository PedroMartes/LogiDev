import { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu/Menu';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import styles from './Nif.module.css';
import logo from '../../assets/img/img-1.png';
import * as Icon from 'react-bootstrap-icons'
import { useNavigate, useLocation } from 'react-router';
import { FooterGeral } from '../../components/Footer/Footer';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export function Nif() {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [showDenied, setShowDenied] = useState(false);
  const [nif, setNif] = useState('');
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [ usuarioLogado, setUsuarioLogado ] = useState<Usuario | null>(null);


useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const emailLogado = localStorage.getItem('email');
    if (!token || !emailLogado) return;

    try {
      const response = await fetch('http://localhost:8080/usuarios/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      const usuarios: Usuario[] = data.usuariosAchados;
      const usuarioLogado = usuarios.find((u) => u.email === emailLogado);
      if (usuarioLogado) {
        setUserName(usuarioLogado.nome);
        setUsuarioLogado(usuarioLogado);
      } else {
        setUserName("Indefinido");
        setUsuarioLogado(null);
      }
    } catch (error) {
      setUserName("Usuário");
    }
  }; 
   fetchUserData();
}, []);

  // Permite apenas números no input
  const handleNifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setNif(value);
  };

  // Handler do botão Confirmar
const handleConfirm = (e?: React.MouseEvent<HTMLButtonElement>) => {
  if (e) e.preventDefault();
  const userId = localStorage.getItem('userId');
  if (nif === String(userId)) {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      navigate(location.state?.from, {
        state: {
          ...location.state,
          nifConfirmado: true
        }
      });
    }, 2000);
  } else {
    setShowDenied(true);
    setTimeout(() => setShowDenied(false), 2000);
  }
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
            disabled={nif.length === 0}
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
                <p className={styles.nomeNif}>{userName}</p>
                <p className={styles.dataNotificacao}>{new Date().toLocaleString('pt-BR')}</p>
              </div>
            </div>
          )}
          {showDenied && (
  <div className={styles.floatingNotification} style={{ borderColor: '#e74c3c' }}>
    <div className={styles.notificationHeader}>
      <img src={logo} alt="Logo" style={{ height: '32px', marginRight: '12px', verticalAlign: 'middle' }} />
      <p>LogiDev</p>
    </div>
    <div className={styles.notificationContent}>
      <p className={styles.permissaoNotificacao} style={{ color: '#e74c3c' }}>
        Não autorizado <Icon.XCircleFill />
      </p>
      <p className={styles.nomeNif}>Nif incorreto</p>
      <p className={styles.dataNotificacao}>{new Date().toLocaleString('pt-BR')}</p>
    </div>
  </div>
)}
        </div>
      </div>
       <FooterGeral/>
    </div>
   
  );
}