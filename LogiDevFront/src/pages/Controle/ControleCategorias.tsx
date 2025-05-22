import styles from './ControleCategorias.module.css'
import CategoriaCard from '../../components/CategoriaCard/CategoriaCard';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ICategorias {
    id: number;
    nome: string;
    descricao: string;
}


export function ControleCategorias() {
    const [data, setData] = useState<ICategorias[]>([]);

useEffect(() => {
  axios.get("http://localhost:8080/categorias/get")
      .then(response => setData(response.data))
      .catch(error => console.error("Erro ao buscar dados:", error));
}, []);

const handleDelete = async (id: number) => {
  if (window.confirm("Tem certeza que deseja apagar este categoria?")) {
      try {
          await axios.delete(`http://localhost:8080/categorias/delete/${id}`);
          setData(data.filter(categoria => categoria.id !== id));
      } catch (error) {
          alert("Erro ao apagar categoria!");
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
                    </thead>


                    <tbody>
                        {data.length > 0 ? (
                            <ul className={styles.categoriasList}>
                                {data.map(categorias => (
                                    <li key={categorias.id}>
                                        <CategoriaCard
                                            id={categorias.id}
                                            onDelete={() => handleDelete(categorias.id)}
                                            nome={categorias.nome}
                                            descricao={categorias.descricao}
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
