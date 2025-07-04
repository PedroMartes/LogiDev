import React from "react";
import styles from "./FornecedorCard.module.css";
import { Link } from "react-router-dom";
import { PiNotePencilFill } from "react-icons/pi";

interface CardProps {
    id: number;
    nome: string;
    contato: string;
    telefone: string;
    email: string;
    onDelete: () => void;
}

const FornecedorCard: React.FC<CardProps> = ({ id, nome, contato, telefone, email }) => {

    return (

        <>


            <div className={styles.controleTableContainer}>
                <table className={styles.tableFornecedorCard}>


                    <tbody className={styles.tableBody}>
                        <tr className={styles.tableRow}>
                            <td className={styles.tableData}>{nome}</td>
                            <td className={styles.tableData}>{contato}</td>
                            <td className={styles.tableData}>{telefone}</td>
                            <td className={styles.tableData}>{email}</td>
                        </tr>
                    </tbody>

                </table>
                <div className={styles.alteracoes}>

                <button className={styles.editButton}>
                    <Link to={`/detalhe/fornecedores/${id}`}>
                        <PiNotePencilFill className={styles.editIcon} />
                    </Link>
                </button>

                </div>
            </div>
        </>
    );
}

export default FornecedorCard;