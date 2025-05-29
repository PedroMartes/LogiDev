import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./DetalheFornecedor.module.css"; // novo módulo CSS para fornecedores
import { NavBarGeral } from "../../components/NavBar/NavBar";
import { Menu } from "../../components/Menu/Menu";
import { FooterGeral } from "../../components/Footer/Footer";

interface IFornecedor {
  id: number;
  nome: string;
  contato: string;
  telefone: string;
  email: string;
}

interface IProduto {
  id: number;
  nome: string;
  quantidade: number;
  fornecedor: {
    id: number;
    nome: string;
  };
}

export function DetalheFornecedor() {
  const { id } = useParams<{ id: string }>();
  const [fornecedor, setFornecedor] = useState<IFornecedor | null>(null);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/fornecedores/getUnique/${id}`)
        .then(response => setFornecedor(response.data))
        .catch(error => console.error("Erro ao buscar fornecedor:", error));
      // Busca todos os produtos
      axios
        .get("http://localhost:8080/produtos/get")
        .then(response => setProdutos(response.data))
        .catch(error => console.error("Erro ao buscar produtos:", error));
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fornecedor) return;
    try {
      await axios.put(`http://localhost:8080/fornecedores/update/${id}`, fornecedor);
      alert("Fornecedor atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar fornecedor!");
      console.error(error);
    }
  };

  if (!fornecedor)
    return (
      <div>
        <p>Erro ao carregar fornecedor.</p>
      </div>
    );

  return (
    <>
      <NavBarGeral />
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.title}>Detalhes do Fornecedor</h1>
        <form onSubmit={handleSave} className={styles.form}>
          {/* Nome */}
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome do Fornecedor:</label>
            <input
              type="text"
              id="nome"
              value={fornecedor.nome}
              onChange={e => setFornecedor({ ...fornecedor, nome: e.target.value })}
            />
          </div>
          {/* Contato */}
          <div className={styles.formGroup}>
            <label htmlFor="contato">Contato:</label>
            <input
              type="text"
              id="contato"
              value={fornecedor.contato}
              onChange={e => setFornecedor({ ...fornecedor, contato: e.target.value })}
            />
          </div>
          {/* Telefone e Email */}
          <div className={styles.formRow}>
            <div className={styles.halfFormGroup}>
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="text"
                id="telefone"
                value={fornecedor.telefone}
                onChange={e => setFornecedor({ ...fornecedor, telefone: e.target.value })}
              />
            </div>
            <div className={styles.halfFormGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={fornecedor.email}
                onChange={e => setFornecedor({ ...fornecedor, email: e.target.value })}
              />
            </div>
          </div>
          {/* Produtos Associados */}
          <div className={styles.formGroup}>
            <label>Produtos Associados:</label>
            {produtos && produtos.filter(prod => prod.fornecedor && prod.fornecedor.id === fornecedor.id).length > 0 ? (
              <ul className={styles.produtoList}>
                {produtos.filter(prod => prod.fornecedor && prod.fornecedor.id === fornecedor.id).map(prod => (
                  <li key={prod.id}>
                    {prod.nome} - Quantidade: {prod.quantidade}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum produto associado.</p>
            )}
          </div>
          {/* Botão de salvar */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
        <FooterGeral/>
    </>
  );
}
