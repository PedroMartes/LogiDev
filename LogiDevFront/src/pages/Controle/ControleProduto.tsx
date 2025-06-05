import styles from './ControleProduto.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { FooterGeral } from '../../components/Footer/Footer';

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

export function ControleProdutos() {
    const [data, setData] = useState<IProduto[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:8080/produtos/get", { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setData(response.data))
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja apagar este produto?")) {
            try {
                await axios.delete(`http://localhost:8080/produtos/delete/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
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
            <Menu/>
            <h1 className={styles.mainTitle}>Controle de Estoque</h1>
            <h2 className={styles.mainSubtitle}>Produtos</h2>

            <div className={styles.controleTabeMain}>
                <table className={styles.controleTable}>
                    <thead className={styles.controleTableableHead}>
                        <th className={styles.controleTableableHeaderText}>Produto</th>
                        <th className={styles.controleTableableHeaderText}>Descricao</th>
                        <th className={styles.controleTableableHeaderText}>Preço</th>
                        <th className={styles.controleTableableHeaderText}>categoria</th>
                        <th className={styles.controleTableableHeaderText}>fornecedor</th>
                        <th className={styles.controleTableableHeaderText}>quantidade</th>
                    </thead>


                    <tbody>
                        {data.length > 0 ? (
                            <ul className={styles.produtoList}>
                                {data.map(produtos => (
                                    <li key={produtos.id}>
                                        <ProductCard
                                            id={produtos.id}
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
                    </tbody>
                </table>
               
            </div>
              <FooterGeral/>
        </>

    )
   
}
