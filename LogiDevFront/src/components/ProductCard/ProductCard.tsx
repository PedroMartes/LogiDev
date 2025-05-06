import React from "react";
import styles from "./ProductCard.module.css";

interface CardProps {
    nome: string;
    descricao: string;
    preco: number;
    categoriaNome: string;
    fornecedorNome: string;
    quantidade: number;
}

const ProductCard: React.FC<CardProps> = ({ nome, descricao, preco, categoriaNome, fornecedorNome, quantidade }) => {
    return (
        <>

            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>Controle de Estoque</h1>
                    <h2 className={styles.mainSubtitle}>Principal</h2>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead className={styles.tableHead}>
                                <tr className={styles.tableRow}>
                                    <th className={styles.tableHeader}>Produto</th>
                                    <th className={styles.tableHeader}>Descricao</th>
                                    <th className={styles.tableHeader}>Preço</th>
                                    <th className={styles.tableHeader}>categoria</th>
                                    <th className={styles.tableHeader}>fornecedor</th>
                                    <th className={styles.tableHeader}>quantidade</th>
                                </tr>
                            </thead>

                            <tbody className={styles.tableBody}>
                                <tr className={styles.tableRow}>
                                    <td className={styles.tableData}>{nome}</td>
                                    <td className={styles.tableData}>{descricao}</td>
                                    <td className={styles.tableData}>{preco}</td>
                                    <td className={styles.tableData}>{categoriaNome}</td>
                                    <td className={styles.tableData}>{fornecedorNome}</td>
                                    <td className={styles.tableData}>{quantidade}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main >
        </>
    );
}

export default ProductCard;