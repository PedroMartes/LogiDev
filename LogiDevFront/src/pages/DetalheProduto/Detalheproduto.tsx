import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetalheProduto.module.css";
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

  useEffect(() => {
    async function fetchData() {
      try {
        const [produtoRes, categoriasRes, fornecedoresRes] = await Promise.all([
          axios.get(`http://localhost:8080/produtos/getUnique/${id}`),
          axios.get("http://localhost:8080/categorias/get"),
          axios.get("http://localhost:8080/fornecedores/get"),
        ]);

        const produtoData = produtoRes.data;
        const codigo = produtoData.codigo || "00123";

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

        setProduto({
          ...produtoData,
          codigo
        });

        setCategorias(categoriasRes.data);
        setFornecedores(fornecedoresRes.data);
      } catch (error) {
        alert("Erro ao carregar dados do produto!");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  

  const handleInputChange = (field: keyof IProduto, value: any) => {
    if (!produto) return;

    if (field === "categoria") {
      if (!value) return;
      const categoriaObj = categorias.find((c) => c.id === Number(value));
      if (categoriaObj) setProduto({
        ...produto,
        categoria: categoriaObj
      });
    } else if (field === "fornecedor") {
      if (!value) return;
      const fornecedorObj = fornecedores.find((f) => f.id === Number(value));
      if (fornecedorObj) setProduto({
        ...produto,
        fornecedor: fornecedorObj
      });
    } else if (field === "preco" || field === "quantidade") {
      setProduto({
        ...produto,
        [field]: Number(value)
      });
    } else {
      setProduto({
        ...produto,
        [field]: value
      });
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
      alert("Não foi possível determinar categoria ou fornecedor válidos!");
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
      await axios.put(`http://localhost:8080/produtos/update/${id}`, updatedDetails);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar produto!");
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
      <div className={styles.container}>
        <h1 className={styles.title}>Detalhes do Produto</h1>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome do Produto:</label>
            <input
              type="text"
              id="nome"
              value={produto.nome}
              onChange={e => handleInputChange("nome", e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              value={produto.descricao}
              onChange={e => handleInputChange("descricao", e.target.value)}
              rows={3}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.halfFormGroup}>
              <label htmlFor="categoria">Categoria:</label>
              <select
                id="categoria"
                value={produto.categoria.id}
                onChange={e => handleInputChange("categoria", e.target.value)}
                className={styles.selectCadastroProdutos}
              >
                <option value="" disabled hidden>Selecione uma categoria</option>
                {/* Renderiza todas as categorias */}
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
                {/* Se a categoria do produto não está na lista, adiciona temporariamente */}
                {!categorias.some(c => c.id === produto.categoria.id) && (
                  <option value={produto.categoria.id} style={{ color: 'red' }}>
                    {produto.categoria.nome || `Categoria ID ${produto.categoria.id}`} 
                  </option>
                )}
              </select>
            </div>
            <div className={styles.halfFormGroup}>
              <label htmlFor="fornecedor">Fornecedor:</label>
              <select
                id="fornecedor"
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
                {/* Se o fornecedor do produto não está na lista, adiciona temporariamente */}
                {!fornecedores.some(f => f.id === produto.fornecedor.id) && (
                  <option value={produto.fornecedor.id} style={{ color: 'red' }}>
                    {produto.fornecedor.nome || `Fornecedor ID ${produto.fornecedor.id}`} 
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.halfFormGroup}>
              <label htmlFor="preco">Preço:</label>
              <input
                type="number"
                id="preco"
                value={produto.preco}
                onChange={e => handleInputChange("preco", e.target.value)}
              />
            </div>
            <div className={styles.halfFormGroup}>
              <label htmlFor="quantidade">Quantidade:</label>
              <input
                type="number"
                id="quantidade"
                value={produto.quantidade}
                onChange={e => handleInputChange("quantidade", e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </>
  );
}