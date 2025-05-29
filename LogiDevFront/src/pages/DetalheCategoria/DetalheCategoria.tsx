import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  categoriaId: number;
}

export function DetalheCategoria() {
  const { id } = useParams<{ id: string }>();
  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/categorias/getUnique/${id}`)
        .then(response => setCategoria(response.data))
        .catch(error => console.error("Erro ao buscar categoria:", error));

      axios
        .get("http://localhost:8080/produtos/get")
        .then(response => setProdutos(response.data))
        .catch(error => console.error("Erro ao buscar produtos:", error));
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria) return;
    try {
      await axios.put(`http://localhost:8080/categorias/update/${id}`, categoria);
      alert("Categoria atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar categoria!");
      console.error(error);
    }
  };

  if (!categoria)
    return (
      <div>
        <p>Erro ao pegar categoria</p>
      </div>
    );

  console.log(produtos, categoria);

  return (
    <>
      <NavBarGeral />
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.title}>Detalhes da Categoria</h1>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome da Categoria:</label>
            <input
              type="text"
              id="nome"
              value={categoria.nome}
              onChange={e =>
                setCategoria({ ...categoria, nome: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              value={categoria.descricao}
              onChange={e =>
                setCategoria({ ...categoria, descricao: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Salvar Alterações
            </button>
          </div>
        </form>
        {/* Produtos Associados */}
        <div className={styles.formGroup}>
          <label>Produtos Associados:</label>
          {produtos && produtos.filter(
            prod => Number(prod.categoriaId) === Number(categoria.id)
          ).length > 0 ? (
            <ul className={styles.produtoList}>
              {produtos
                .filter(prod => Number(prod.categoriaId) === Number(categoria.id))
                .map(prod => (
                  <li key={prod.id}>
                    {prod.nome} - Quantidade: {prod.quantidade}
                  </li>
                ))}
            </ul>
          ) : (
            <p>Nenhum produto associado.</p>
          )}
        </div>
      </div>
    </>
  );
}
