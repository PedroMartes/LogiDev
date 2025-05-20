import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductPage.module.css";

interface IProduto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria: {
        id: number;
        nome: string;
    };
    fornecedor: {
        id: number;
        nome: string;
    };
}

export const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<IProduto | null>();

    useEffect(() => {
        console.log("ID do produto:", id);
        axios.get(`http://localhost:8080/produtos/getUnique/${id}`)
            .then(response => setProduto(response.data))
            .catch(error => console.error("Erro ao buscar produto:", error));
    }, [id]);

    if (!produto || !produto.categoria || !produto.fornecedor) {
        return <div className={styles.container}>Carregando...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>{produto.nome}</h1>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p><strong>Quantidade:</strong> {produto.quantidade}</p>
            <p><strong>Categoria:</strong> {produto.categoria?.nome}</p>
            <p><strong>Fornecedor:</strong> {produto.fornecedor?.nome}</p>
            <p><strong>ID:</strong> {produto.id}</p>
        </div>
    );
};