import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheProduto.module.css";
import axios from "axios";
import { NavBarGeral } from "../../components/NavBar/NavBar";
import { Menu } from "../../components/Menu/Menu";

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

export function DetalheProduto() {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<IProduto | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/produtos/getUnique/${id}`)
        .then(response => setProduto(response.data))
        .catch(error => console.error("Erro ao buscar produto:", error));
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto) return;
    const updatedDetails = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoria: produto.categoria,
      fornecedor: produto.fornecedor,
      quantidade: produto.quantidade
    };
    try {
      await axios.put(`http://localhost:8080/produtos/update/${id}`, updatedDetails);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar produto!");
      console.error(error);
    }
  };

  if (!produto) return <div><p>Erro ao pegar produto</p></div>;

  return (
    <>
      <NavBarGeral />
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.title}>Detalhes do Produto</h1>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome do Produto:</label>
            <input
              type="text"
              id="nome"
              value={produto.nome}
              onChange={e => setProduto({ ...produto, nome: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              value={produto.descricao}
              onChange={e => setProduto({ ...produto, descricao: e.target.value })}
              rows={3}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.halfFormGroup}>
              <label htmlFor="categoria">Categoria:</label>
              <input
                type="text"
                id="categoria"
                value={produto.categoria.nome}
                onChange={e => setProduto({ ...produto, categoria: { ...produto.categoria, nome: e.target.value } })}
              />
            </div>
            <div className={styles.halfFormGroup}>
              <label htmlFor="fornecedor">Fornecedor:</label>
              <input
                type="text"
                id="fornecedor"
                value={produto.fornecedor.nome}
                onChange={e => setProduto({ ...produto, fornecedor: { ...produto.fornecedor, nome: e.target.value } })}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.halfFormGroup}>
              <label htmlFor="preco">Preço:</label>
              <input
                type="number"
                id="preco"
                value={produto.preco}
                onChange={e => setProduto({ ...produto, preco: Number(e.target.value) })}
              />
            </div>
            <div className={styles.halfFormGroup}>
              <label htmlFor="quantidade">Quantidade:</label>
              <input
                type="number"
                id="quantidade"
                value={produto.quantidade}
                onChange={e => setProduto({ ...produto, quantidade: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
