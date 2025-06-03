import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./DetalheFornecedor.module.css";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/fornecedores/getUnique/${id}`)
        .then(response => setFornecedor(response.data))
        .catch(error => console.error("Erro ao buscar fornecedor:", error));
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
      navigate("/controle/fornecedores"); // Redireciona para a página de estoque de fornecedores
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
      <div className={styles.infoContainer}>
        <div className={styles.infoTitle}>Informações do Fornecedor</div>
        <form onSubmit={handleSave}>
          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>Nome</th>
                <td>
                  <input
                    type="text"
                    value={fornecedor.nome}
                    onChange={e => setFornecedor({ ...fornecedor, nome: e.target.value })} className={styles.inputnomeFornecedor}
                  />
                </td>
              </tr>
              <tr>
                <th>Contato</th>
                <td>
                  <input
                    type="text"
                    value={fornecedor.contato}
                    onChange={e => setFornecedor({ ...fornecedor, contato: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th>Telefone</th>
                <td>
                  <input
                    type="text"
                    value={fornecedor.telefone}
                    onChange={e => setFornecedor({ ...fornecedor, telefone: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <input
                    type="email"
                    value={fornecedor.email}
                    onChange={e => setFornecedor({ ...fornecedor, email: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <th>Produtos Associados</th>
                <td>
                  {produtos && produtos.filter(prod => prod.fornecedor && prod.fornecedor.id === fornecedor.id).length > 0 ? (
                    <ul className={styles.produtoList}>
                      {produtos.filter(prod => prod.fornecedor && prod.fornecedor.id === fornecedor.id).map(prod => (
                        <li key={prod.id}>
                          {prod.nome} - Quantidade: {prod.quantidade}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Nenhum produto associado.</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
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