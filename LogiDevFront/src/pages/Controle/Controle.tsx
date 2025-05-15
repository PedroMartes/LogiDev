import styles from './Controle.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavBarGeral } from '../../components/NavBar/NavBar';

interface IProduto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: {
        id: number;
        nome: string;
    };
    fornecedor: {
        id: number;
        nome: string;
    };
    quantidade: number;
}

export function Controle() {
    const [data, setData] = useState<IProduto[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/produtos/get")
            .then(response => setData(response.data))
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja apagar este produto?")) {
            try {
                await axios.delete(`http://localhost:8080/produtos/delete/${id}`);
                setData(data.filter(produto => produto.id !== id));
            } catch (error) {
                alert("Erro ao apagar produto!");
                console.error(error);
            }
        }
    };


    return (
        <>
            <NavBarGeral />
            <h1 className={styles.mainTitle}>Controle de Estoque</h1>
            <h2 className={styles.mainSubtitle}>Principal</h2>


            <table className={styles.table}>
                <ul className={styles.tableHead}>
                        <li className={styles.tableHeader}>Produto</li>
                        <li className={styles.tableHeader}>Descricao</li>
                        <li className={styles.tableHeader}>Preço</li>
                        <li className={styles.tableHeader}>categoria</li>
                        <li className={styles.tableHeader}>fornecedor</li>
                        <li className={styles.tableHeader}>quantidade</li>
                </ul>
            </table>

            <div>
                {data.length > 0 ? (
                    <ul className={styles.produtoList}>
                        {data.map(produtos => (
                            <li key={produtos.id}>
                                <ProductCard
                                    onDelete={() => handleDelete(produtos.id)}
                                    nome={produtos.nome}
                                    preco={produtos.preco}
                                    descricao={produtos.descricao}
                                    categoriaNome={produtos.categoria.nome}
                                    fornecedorNome={produtos.fornecedor.nome}
                                    quantidade={produtos.quantidade}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
            </div>

        </>

    )
}

