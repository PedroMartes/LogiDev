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

export function DetalheCategoria() {
  const { id } = useParams<{ id: string }>();
  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:8080/categorias/getUnique/${id}`
        );
        setCategoria(res.data);
      } catch (error) {
        alert("Erro ao carregar dados da categoria!");
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
        categoria
      );
      alert("Categoria atualizada com sucesso!");
      navigate("/categorias");
    } catch (error) {
      alert("Erro ao atualizar categoria!");
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
    </>
  );
}
