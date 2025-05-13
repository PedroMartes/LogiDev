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


                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            

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

        </>
    );
}

export default ProductCard;