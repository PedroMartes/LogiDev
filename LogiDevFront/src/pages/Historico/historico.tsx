import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './historico.module.css';

export const Historico: React.FC = () => {
  const registros = [
    {
      nome: 'Marcos Fernando',
      nif: '923.354.876',
      produto: 'Detergente Ypê 18L',
      acao: 'Alteração no estoque',
      horario: '16:43',
    },
    {
      nome: 'Thiago Mathias',
      nif: '874.098.345',
      produto: 'Desinfetante 5L',
      acao: 'Reclassificou',
      horario: '16:36',
    },
    {
      nome: 'Arthur Abelar',
      nif: '546.976.765',
      produto: 'Amaciante 1,5L',
      acao: 'Alteração no estoque',
      horario: '16:12',
    },
    {
      nome: 'Paulo Maia',
      nif: '498.512.456',
      produto: 'Sabão em pó',
      acao: 'Recebimento',
      horario: '15:27',
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Mini Nav Bar com fundo azul e alinhada à esquerda */}
      <div className={styles.miniNavbar}>
        <ul className={styles.miniNavList}>
          <li className={styles.miniNavItem}>
            Cadastro <span className={styles.arrow}>▼</span>
          </li>
          <li className={styles.miniNavItem}>
            Gráficos <span className={styles.arrow}>▼</span>
          </li>
          <li className={styles.miniNavItem}>
            Relatórios <span className={styles.arrow}>▼</span>
          </li>
          <li className={styles.miniNavItem}>
            Estoques <span className={styles.arrow}>▼</span>
          </li>
        </ul>
      </div>

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
  );
};


