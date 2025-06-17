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
        const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Erro ao apagar produto!");
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:8080/produtos/get", { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setData(response.data))
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);

    const handleDelete = (id: number) => {
        setConfirmDeleteId(id); // abre o modal de confirmação
    };

    const confirmDeletion = async () => {
        if (confirmDeleteId === null) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/produtos/delete/${confirmDeleteId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(data.filter(categoria => categoria.id !== confirmDeleteId));
            setShowSuccess(true);
        } catch (error) {
            setErrorMsg("Erro ao apagar produto!");
            setShowError(true);
            console.error(error);
        } finally {
            setConfirmDeleteId(null); // fecha o modal
        }
    };


    return (
        <>
            <NavBarGeral />
            <Menu/>
            <div className={styles.mainTitleContainer}>
            <h1 className={styles.mainTitle}>Controle de Estoque</h1>
            <h2 className={styles.mainSubtitle}>Produtos</h2>
            </div>

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

            
            {confirmDeleteId !== null && (
                <div className={styles.confirmModalOverlay}>
                    <div className={styles.confirmModal}>
                        <div className={styles.confirmHeader}>
                            <h3 className={styles.confirmTitle}>Confirmação</h3>
                            <button
                                className={styles.closeButton}
                                onClick={() => setConfirmDeleteId(null)}
                                aria-label="Fechar"
                            >
                                ×
                            </button>
                        </div>
                        <p className={styles.confirmText}>Você tem certeza que deseja excluir o registro definitivamente?</p>
                        <div className={styles.confirmButtons}>
                            <button className={styles.confirmBtn} onClick={confirmDeletion}>
                                Sim
                            </button>
                            <button className={styles.cancelBtn} onClick={() => setConfirmDeleteId(null)}>
                                Não
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* ALERTA DE ERRO */}
            {showError && (
                <div className={styles.alertaErro}>
                    <div className={styles.alertaErroHeader}>
                        <span className={styles.alertaErroTitle}>Erro!!</span>
                        <button
                            className={styles.alertaErroClose}
                            onClick={() => setShowError(false)}
                            aria-label="Fechar"
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                    <div className={styles.alertaErroMsg}>{errorMsg}</div>
                    <button
                        className={styles.alertaErroOkBtn}
                        onClick={() => setShowError(false)}
                        type="button"
                    >
                        OK
                    </button>
                </div>
            )}

            {/* ALERTA DE SUCESSO */}
            {showSuccess && (
                <div className={styles.alertaErro}>
                    <div className={styles.alertaErroHeader}>
                        <span className={styles.alertaErroTitle}>Sucesso!</span>
                        <button
                            className={styles.alertaErroClose}
                            onClick={() => setShowSuccess(false)}
                            aria-label="Fechar"
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                    <div className={styles.alertaErroMsg}>Produto atualizado com sucesso!</div>
                    <button
                        className={styles.alertaErroOkBtn}
                        onClick={() => {
                            setShowSuccess(false);
                        }}
                        type="button"
                    >
                        OK
                    </button>
                </div>
            )}
              <FooterGeral/>
        </>

    )
   
}
