import styles from './Controle.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../../components/ProductCard/ProductCard';

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
        axios.get("http://localhost:8080/produtos")
            .then(response => setData(response.data))
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);


    return (
        <>


            <div className={styles.container}>

                {data.length > 0 ? (
                    <ul className={styles.produtoList}>
                        {data.map(produtos => (
                            <ProductCard nome={produtos.nome}
                                preco={produtos.preco}
                                descricao={produtos.descricao}
                                categoriaNome={produtos.categoria.nome}
                                fornecedorNome={produtos.fornecedor.nome}
                                quantidade={produtos.quantidade}
                            />
                        ))}
                    </ul>
                ) : (
                    <p>Erro ao carregar os produtos</p>
                )}
            </div>


        </>

    )
}

