import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetalheCategoria.module.css";
import axios from "axios";
import { NavBarGeral } from "../../components/NavBar/NavBar";
import { Menu } from "../../components/Menu/Menu";

interface ICategoria {
  id: number;
  nome: string;
  descricao: string;
}

interface IProduto {
  id: number;
  nome: string;
  quantidade: number;
  categoria: {
    id: number;
    nome: string;
    // outros campos se necessário
  };
  // outros campos se necessário
}

export function DetalheCategoria() {
  const { id } = useParams<{ id: string }>();
  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Erro ao atualizar produto!");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        // Busca categoria
        const res = await axios.get(
          `http://localhost:8080/categorias/getUnique/${id}`, { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategoria(res.data);

        // Busca todos os produtos
        const resProdutos = await axios.get(
          `http://localhost:8080/produtos/get`, { headers: { Authorization: `Bearer ${token}` } }
        );
        // Filtra produtos pela categoria
        const produtosFiltrados = resProdutos.data.filter(
          (prod: IProduto) => prod.categoria && prod.categoria.id === Number(id)
        );
        setProdutos(produtosFiltrados);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErrorMsg("Erro ao buscar dados da categoria!");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (field: keyof ICategoria, value: string) => {
    if (!categoria) return;
    setCategoria({ ...categoria, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria) return;
    try {
      await axios.put(
        `http://localhost:8080/categorias/update/${id}`,
        categoria, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
     setShowSuccess(true);
    } catch (error) {
      setErrorMsg("Erro ao atualizar categoria!");
      setShowError(true);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading || !categoria) return <div>Carregando...</div>;

  return (
    <>
      <NavBarGeral />
      <Menu />
      <div className={styles.infoContainerCategoria}>
        <div className={styles.infoTitleCategoria}>Informações da Categoria</div>
        <form onSubmit={handleSave}>
          <table className={styles.infoTableCategoria}>
            <tbody>
              <tr>
                <th className={styles.nomeCategoria}>Nome da categoria</th>
                <td>
                  <input
                    type="text"
                    value={categoria.nome}
                    onChange={e => handleInputChange("nome", e.target.value)} className={styles.inputnomeCategoria}
                  />
                </td>
              </tr>
              <tr>
                <th>Descrição</th>
                <td>
                  <textarea
                    value={categoria.descricao}
                    onChange={e =>
                      handleInputChange("descricao", e.target.value) 
                    }
                    className={styles.inputDescricaoCategoria}
                    rows={2}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttonGroupCategoria}>
            <button
              type="button"
              className={styles.cancelButtonCategoria}
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.saveButtonCategoria}>
              Salvar alterações
            </button>
          </div>
        </form>

      </div>
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
                navigate("/controle/categorias");
              }}
              type="button"
            >
              OK
            </button>
          </div>
        )} 

    </>
  );
}