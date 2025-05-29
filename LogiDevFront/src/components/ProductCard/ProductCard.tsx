import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";

interface CardProps {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoriaNome: string;
    fornecedorNome: string;
    quantidade: number;
    onDelete: () => void;
}

const ProductCard: React.FC<CardProps> = ({ id, nome, descricao, preco, categoriaNome, fornecedorNome, quantidade, onDelete }) => {

    return (

        <>

         <div className={styles.mainInfo}>

            <div className={styles.controleTableContainer}>
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
                <button onClick={onDelete} className={styles.deleteButton} type="button">
                    <MdDelete className={styles.deleteIcon} />
                </button>
                <button className={styles.editButton}>
                    <Link to={`/detalhe/produtos/${id}`} tabIndex={0}>
                        <PiNotePencilFill className={styles.editIcon} />
                    </Link>
                </button>
            </div>
         </div>

        </>
    );
}

export default ProductCard;