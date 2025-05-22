import React from "react";
import styles from "./FornecedorCard.module.css";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";

interface CardProps {
    id: number;
    nome: string;
    contato: string;
    telefone: string;
    email: string;
    onDelete: () => void;
}

const FornecedorCard: React.FC<CardProps> = ({ id, nome, contato, telefone, email, onDelete }) => {

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
                <button onClick={onDelete} className={styles.deleteButton}>
                    <MdDelete className={styles.deleteIcon} />
                </button>

                <button className={styles.editButton}>
                    <Link to={`/detalhe/produtos/${id}`}>
                        <PiNotePencilFill className={styles.editIcon} />
                    </Link>
                </button>
            </div>

        </>
    );
}

export default FornecedorCard;