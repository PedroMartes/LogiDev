import React from "react";
import styles from './AlertaCard.module.css';

interface AlertaCardProps {
  titulo: string;
  itens: React.ReactNode[];
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export const AlertaCard: React.FC<AlertaCardProps> = ({ titulo, itens, checked, onCheckChange }) => {
  return (
    <div className={styles.cardAlerta}>
      <div className={styles.conteudoAlerta}>
        <h3 className={styles.tituloAlerta}>{titulo}</h3>
        <ul className={styles.listaAlerta}>
          {itens.map((item, idx) => (
            <li key={idx} className={styles.itemAlerta}>{item}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <input
            type="checkbox"
            className={styles.checkAlerta}
            checked={checked}
            onChange={e => onCheckChange && onCheckChange(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};
