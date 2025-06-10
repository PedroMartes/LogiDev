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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Erro ao atualizar fornecedor!");

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8080/fornecedores/getUnique/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setFornecedor(response.data))
        .catch(error => console.error("Erro ao buscar fornecedor:", error));
      axios
        .get("http://localhost:8080/produtos/get", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setProdutos(response.data))
        .catch(error => console.error("Erro ao buscar produtos:", error));
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fornecedor) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/fornecedores/update/${id}`, fornecedor, { headers: { Authorization: `Bearer ${token}` } });
      setShowSuccess(true);
    } catch (error) {
      setErrorMsg("Erro ao atualizar fornecedor!");
      setShowError(true);
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
      <div className={styles.infoContainerFornecedor}>
        <div className={styles.infoTitleFornecedor}>Informações do Fornecedor</div>
        <form onSubmit={handleSave}>
          <table className={styles.infoTableFornecedor}>
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
                    onChange={e => setFornecedor({ ...fornecedor, contato: e.target.value })} className={styles.inputContatoFornecedor}
                  />
                </td>
              </tr>
              <tr>
                <th>Telefone</th>
                <td>
                  <input
                    type="text"
                    value={fornecedor.telefone}
                    onChange={e => setFornecedor({ ...fornecedor, telefone: e.target.value })} className={styles.inputTelefoneFornecedor}
                  />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <input
                    type="email"
                    value={fornecedor.email}
                    onChange={e => setFornecedor({ ...fornecedor, email: e.target.value })} className={styles.inputEmailFornecedor}
                  />
                </td>
              </tr>

            </tbody>
          </table>
          <div className={styles.buttonGroupFornecedor}>
            <button
              type="button"
              className={styles.cancelButtonFornecedor}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.saveButtonFornecedor}>
              Salvar Alterações
            </button>
          </div>
        </form>
        <div className={styles.produtosAssociadosContainer}>
          <div className={styles.produtosAssociadosTitle}>Produtos Associados:</div>
          {produtos && produtos.filter(prod => prod.fornecedor && prod.fornecedor.id === fornecedor.id).length > 0 ? (
            <ul className={styles.produtoList}>
              {produtos
                .filter(prod => prod.fornecedor && prod.fornecedor.id === fornecedor.id)
                .map(prod => (
                  <li key={prod.id}>
                    {prod.nome} - Quantidade: {prod.quantidade}
                  </li>
                ))}
            </ul>
          ) : (
            <span>Nenhum produto associado.</span>
          )}
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
                navigate("/controle/fornecedores");
              }}
              type="button"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </>
  );
}