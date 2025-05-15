import React from "react";
import styles from "./ProductCard.module.css";
import { MdDelete } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";

interface CardProps {
    nome: string;
    descricao: string;
    preco: number;
    categoriaNome: string;
    fornecedorNome: string;
    quantidade: number;
    onDelete: () => void;
}

const ProductCard: React.FC<CardProps> = ({ nome, descricao, preco, categoriaNome, fornecedorNome, quantidade, onDelete }) => {

    return (

        <>


            <div className={styles.tableContainer}>
                <table className={styles.tableProductCard}>


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
                <button onClick={onDelete} className={styles.deleteButton}>
                    <MdDelete className={styles.deleteIcon} />
                </button>
                <button className={styles.editButton}>
                    <a href="/">
                        <PiNotePencilFill className={styles.editIcon} />
                    </a>
                </button>
            </div>

        </>
    );
}

export default ProductCard;