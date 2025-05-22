import styles from './Nif.module.css';

export function Nif() {
  return (
    <div className={styles["content-wrapper"]}>
      <div className={styles.card}>
        <h1 className={styles["identification-title"]}>Identificação</h1>
        <div className={styles["identification-box"]}>
          <label className={styles["input-label"]}>
            Número de identificação Fiscal
          </label>
          <input type="text" placeholder="NIF:" className={styles.inputText} />
        </div>
        <button className={styles["confirm-button"]}>Confirmar</button>
      </div>
    </div>
  );
}
