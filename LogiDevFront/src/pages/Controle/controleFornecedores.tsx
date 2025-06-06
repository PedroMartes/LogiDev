import styles from './controleFornecedores.module.css'
import FornecedorCard from '../../components/FornecedorCard/FornecedorCard';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FooterGeral } from '../../components/Footer/Footer';

interface IFornecedores {
    id: number;
    nome: string;
    contato: string;
    telefone: string;
    email: string;
}


export function ControleFornecedores() {
    const [data, setData] = useState<IFornecedores[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:8080/fornecedores/get", { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setData(response.data))
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja desativar este fornecedor?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:8080/fornecedores/desativar/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(data.filter(fornecedor => fornecedor.id !== id));
            } catch (error) {
                alert("Erro ao apagar fornecedor!");
                console.error(error);
            }
        }
    };
    return (
        <>
            <NavBarGeral />
            <Menu />
            <h1 className={styles.mainTitle}>Controle de Estoque</h1>
            <h2 className={styles.mainSubtitle}>Fornecedores</h2>

            <div className={styles.controleTabeMain}>
                <div className={styles.controleTableContainer}>

                    <table className={styles.controleTable}>
                        <thead className={styles.controleTableableHead}>
                            <th className={styles.controleTableableHeaderText}>Fornecedor</th>
                            <th className={styles.controleTableableHeaderText}>Contato</th>
                            <th className={styles.controleTableableHeaderText}>Telefone</th>
                            <th className={styles.controleTableableHeaderText}>E-mail</th>
                        </thead>


                        <tbody>
                            {data.length > 0 ? (
                                <ul className={styles.FornecedorList}>
                                    {data.map(fornecedores => (
                                        <li key={fornecedores.id}>
                                            <FornecedorCard
                                                id={fornecedores.id}
                                                onDelete={() => handleDelete(fornecedores.id)}
                                                nome={fornecedores.nome}
                                                contato={fornecedores.contato}
                                                telefone={fornecedores.telefone}
                                                email={fornecedores.email}
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
            </div>
            <FooterGeral />

        </>

    )
}
