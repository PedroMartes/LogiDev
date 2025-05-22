import React, { useState } from "react";
import styles from "../Controle/ControleProduto.module.css";
import { NavBarGeral } from "../../components/NavBar/NavBar";
import { Menu } from "../../components/Menu/Menu";

export function Produto() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <NavBarGeral/>
      <Menu/>
      <div className={styles.body}>
        {/* {showModal && (
          <div className={styles["fullscreen-shadow"]}>
            <div className={styles["input-container"]}>
              <span
                className={styles["botao-x"]}
                onClick={() => setShowModal(false)}
                style={{ userSelect: "none" }}
              >
                &times;
              </span>
              <label className={styles["input-label1"]}>Confirmação</label>
              <label className={styles["input-label"]}>
                Você tem certeza que deseja excluir esse registro definitivamente?
              </label>
              <button className={styles.buttonSim}>
                <a className={styles.textSim} href="/estoque">Sim</a>
              </button>
              <button className={styles.buttonNao}>
                <a className={styles.textNao} href="/estoque">Não</a>
              </button>
            </div>
          </div>
        )} */}

        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.mainTitle}>Controle de Estoque</h1>
            <h2 className={styles.mainSubtitle}>Produto</h2>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableHeader}>Produto</th>
                    <th className={styles.tableHeader}>Descrição</th>
                    <th className={styles.tableHeader}>Categoria</th>
                    <th className={styles.tableHeader}>Preço</th>
                    <th className={styles.tableHeader}>Quantidade</th>
                    <th className={styles.tableHeader}>Total - R$</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <tr className={styles.tableRow} key={idx}>
                      <td className={styles.tableData}></td>
                      <td className={styles.tableData}></td>
                      <td className={styles.tableData}></td>
                      <td className={styles.tableData}></td>
                      <td className={styles.tableData}></td>
                      <td className={styles.tableData}></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
