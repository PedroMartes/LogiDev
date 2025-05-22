import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './historico.module.css';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';

export const Historico: React.FC = () => {
  const registros = [
    {
      nome: '',
      nif: '',
      produto: '',
      acao: ' ',
      horario: '',
    },
    {
      nome: '',
      nif: '',
      produto: '',
      acao: '',
      horario: '',
    },
    {
      nome: '',
      nif: '',
      produto: '',
      acao: '',
      horario: '',
    },
    {
      nome: '',
      nif: '',
      produto: '',
      acao: '',
      horario: '',
    },

  ];

  return (
    <div>
      <NavBarGeral/>
      <Menu/>
      <div className={styles.pageContainer}>
        <div className={styles.historicoMain}>

          <h2 className={styles.heading}>Histórico</h2>
          <div className={styles.lista}>
            {registros.map((r, index) => (
              <div key={index} className={styles.card}>
                {/* Coluna esquerda: ícone, nome e NIF */}
                <div className={styles.left}>
                  <FaUserCircle size={40} className={styles.icon} />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{r.nome}</span>
                    <span className={styles.userNif}>NIF: {r.nif}</span>
                  </div>
                </div>
                {/* Coluna central: rótulo "Produto:" centralizado */}
                <div className={styles.center}>
                  <span className={styles.label}>Produto:</span>
                </div>
                {/* Coluna direita: nome do produto e detalhes */}
                <div className={styles.right}>
                  <div className={styles.productName}>{r.produto}</div>
                  <div className={styles.details}>
                    <span className={styles.action}>{r.acao}</span>
                    <span className={styles.time}>{r.horario}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


