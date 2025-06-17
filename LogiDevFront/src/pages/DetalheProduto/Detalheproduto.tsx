import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import styles from "./Detalheproduto.module.css";
=======
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetalheProduto.module.css";
>>>>>>> dev
import axios from "axios";
import { NavBarGeral } from "../../components/NavBar/NavBar";
import { Menu } from "../../components/Menu/Menu";

interface IProduto {
  id: number;
  codigo: string;
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

interface ICategoria {
  id: number;
  nome: string;
}

interface IFornecedor {
  id: number;
  nome: string;
}

export function DetalheProduto() {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<IProduto | null>(null);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [fornecedores, setFornecedores] = useState<IFornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Erro ao atualizar produto!");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const [produtoRes, categoriasRes, fornecedoresRes] = await Promise.all([
          axios.get(`http://localhost:8080/produtos/getUnique/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8080/categorias/get", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8080/fornecedores/get", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const produtoData = produtoRes.data;
        if (!produtoData.categoria || typeof produtoData.categoria !== 'object') {
          produtoData.categoria = {
            id: Number(produtoData.categoriaId),
            nome: ''
          };
        } else {
          produtoData.categoria.id = Number(produtoData.categoria.id);
        }

        if (!produtoData.fornecedor || typeof produtoData.fornecedor !== 'object') {
          produtoData.fornecedor = {
            id: Number(produtoData.fornecedorId),
            nome: ''
          };
        } else {
          produtoData.fornecedor.id = Number(produtoData.fornecedor.id);
        }


        setProduto(produtoData);
        setCategorias(categoriasRes.data);
        setFornecedores(fornecedoresRes.data);

      } catch (error) {
        setErrorMsg("Erro ao carregar dados do produto!");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (field: keyof IProduto, value: any) => {
    if (!produto) return;
    if (field === "categoria") {
      const categoriaObj = categorias.find((c) => c.id === Number(value));
      if (categoriaObj) setProduto({ ...produto, categoria: categoriaObj });
    } else if (field === "fornecedor") {
      const fornecedorObj = fornecedores.find((f) => f.id === Number(value));
      if (fornecedorObj) setProduto({ ...produto, fornecedor: fornecedorObj });
    } else if (field === "preco" || field === "quantidade") {
      setProduto({ ...produto, [field]: Number(value) });
    } else {
      setProduto({ ...produto, [field]: value });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto) return;

    let categoriaId = Number(produto.categoria?.id);
    let fornecedorId = Number(produto.fornecedor?.id);

    if (!categoriaId && produto.hasOwnProperty('categoriaId')) {
      categoriaId = Number((produto as any).categoriaId);
    }
    if (!fornecedorId && produto.hasOwnProperty('fornecedorId')) {
      fornecedorId = Number((produto as any).fornecedorId);
    }
    if (!categoriaId || !fornecedorId) {
      setErrorMsg("Não foi possível determinar categoria ou fornecedor válidos!");
      setShowError(true);
      return;
    }

    const updatedDetails = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoriaId,
      fornecedorId,
      quantidade: produto.quantidade,
      codigo: produto.codigo
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/produtos/update/${id}`,
        updatedDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMsg("Erro ao atualizar produto!");
      setShowError(true);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading || !produto) return <div>Carregando...</div>;

  return (
    <>
      <NavBarGeral />
      <Menu />
      <div className={styles.infoContainerProduto}>
        <div className={styles.infoTitleProduto}>Informações do Produto</div>
        <form onSubmit={handleSave}>
          <table className={styles.infoTableProduto}>
            <tbody>
              <tr>
                <th>Nome do produto:</th>
                <td>
                  <input
                    type="text"
                    value={produto.nome}
                    onChange={e => handleInputChange("nome", e.target.value)} className={styles.inputNomeProduto}
                  />
                </td>
              </tr>
              <tr>
                <th>Descrição:</th>
                <td>
                  <input
                    type="text"
                    value={produto.descricao}
                    onChange={e => handleInputChange("descricao", e.target.value)} className={styles.inputDescricaoProduto}
                  />
                </td>
              </tr>
              <tr>
                <th>Preço:</th>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={produto.preco}
                    onChange={e => handleInputChange("preco", e.target.value)}
                    className={styles.inputPrecoProduto}
                  />
                </td>
              </tr>
              <tr>
                <th>Categoria:</th>
                <td>
                  <select
                    value={produto.categoria.id}
                    onChange={e => handleInputChange("categoria", e.target.value)}
                    className={styles.selectCadastroProdutos}
                  >
                    <option value="" disabled hidden>Selecione uma categoria</option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                    {!categorias.some(c => c.id === produto.categoria.id) && (
                      <option value={produto.categoria.id} style={{ color: 'red' }}>
                        {produto.categoria.nome || `Categoria ID ${produto.categoria.id}`}
                      </option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <th>Fornecedor:</th>
                <td>
                  <select
                    value={produto.fornecedor.id}
                    onChange={e => handleInputChange("fornecedor", e.target.value)}
                    className={styles.selectCadastroProdutos}
                  >
                    <option value="" disabled hidden>Selecione um fornecedor</option>
                    {fornecedores.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nome}
                      </option>
                    ))}
                    {!fornecedores.some(f => f.id === produto.fornecedor.id) && (
                      <option value={produto.fornecedor.id} style={{ color: 'red' }}>
                        {produto.fornecedor.nome || `Fornecedor ID ${produto.fornecedor.id}`}
                      </option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <th>Quantidade:</th>
                <td>
                  <input
                    type="number"
                    value={produto.quantidade}
                    onChange={e => handleInputChange("quantidade", e.target.value)} className={styles.inputQuantidadeProduto}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttonGroupProduto}>
            <button
              type="button"
              className={styles.cancelButtonProduto}
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.saveButtonProduto}>
              Salvar alterações
            </button>
          </div>
        </form>

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
                navigate("/controle/produtos");
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