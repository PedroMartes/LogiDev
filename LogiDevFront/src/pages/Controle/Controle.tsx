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
                <h1 className={styles.title}>Produtos</h1>
                <div className={styles.controleTableTop}>

                    <ul className={styles.controleTableTopUl}>
                        <li className={styles.controleTableTopLi}>
                            <p>Nome</p>
                        </li>

                        <li className={styles.controleTableTopLi}>
                            <p>descrição</p>
                        </li>

                        <li className={styles.controleTableTopLi}>
                            <p>Preço</p>
                        </li>

                        <li className={styles.controleTableTopLi}>
                            <p>Categoria</p>
                        </li>

                        <li className={styles.controleTableTopLi}>
                            <p>fornecedor</p>
                        </li>
                        
                        <li className={styles.controleTableTopLi}>
                            <p>Quantidade</p>
                        </li>
                    </ul>
                </div>

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

/* 

<li key={produtos.id}> 
                        <p className={styles.produtoItem}>{produtos.nome}</p> 
                        <p className={styles.produtoItem}>{produtos.descricao}</p> 
                        <p className={styles.produtoItem}>{produtos.preco}</p> 
                        <p className={styles.produtoItem}>{produtos.categoria.nome}</p> 
                        <p className={styles.produtoItem}>{produtos.fornecedor.nome}</p> 
                        <p className={styles.produtoItem}>{produtos.quantidade}</p>
                        </li>

*/