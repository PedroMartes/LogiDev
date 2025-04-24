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
        <div className={styles.card}>
            <ul className={styles.produtoCardMain}>
                <li  className={styles.produtoCardItem}>
                    <h2>{nome}</h2>
                </li>
                <li  className={styles.produtoCardItem}>
                    <p>{descricao}</p>
                </li>
                <li  className={styles.produtoCardItem}>
                    <p>{preco}</p>
                </li>
                <li  className={styles.produtoCardItem}>
                    <p>{categoriaNome}</p>
                </li>
                <li  className={styles.produtoCardItem}>
                    <p>{fornecedorNome}</p>
                </li>
                <li  className={styles.produtoCardItem}>
                    <p>{quantidade}</p>
                </li>
            </ul>
        </div>
    );
}

export default ProductCard;