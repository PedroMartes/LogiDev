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
        <div className={styles.buttonAlertas}>
          <button
            type="button"
            className={`${styles.botaoConcluido} ${checked ? styles.concluido : ""}`}
            onClick={() => onCheckChange && onCheckChange(!checked)}
            >
            {checked ? "Concluído" : "Concluir"}
          </button>
        </div>
      </div>
    </div>
  );
};
