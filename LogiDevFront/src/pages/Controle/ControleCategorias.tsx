import styles from './ControleCategorias.module.css'
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';

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


export function ControleCategorias() {
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
            <Menu/>
            <h1 className={styles.mainTitle}>Controle de Estoque</h1>
            <h2 className={styles.mainSubtitle}>Categorias</h2>

            <div className={styles.controleTabeMain}>
                <table className={styles.controleTable}>
                    <thead className={styles.controleTableableHead}>
                        <th className={styles.controleTableableHeaderText}>Categoria</th>
                        <th className={styles.controleTableableHeaderText}>Descrição</th>
                        <th className={styles.controleTableableHeaderText}>Toral de produtos</th>
                        <th className={styles.controleTableableHeaderText}>Valor total em estoque</th>
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

        </>

    )
}
