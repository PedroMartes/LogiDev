import React, { useState } from "react";
import styles from "./DetalheProduto.module.css"; // Importando o CSS para estilização

export function DetalheProduto() {
  // Valores iniciais (simulados) para o produto
  const initialData = {
    productName: "Detergente Ypê 18L",
    description: "Limpeza de louças e superfícies",
    category: "Limpeza geral",
    supplier: "Ypê Produtos de Limpeza",
    productCode: "00123",
    quantity: "85"
  };

  const [productName, setProductName] = useState(initialData.productName);
  const [description, setDescription] = useState(initialData.description);
  const [category, setCategory] = useState(initialData.category);
  const [supplier, setSupplier] = useState(initialData.supplier);
  const [productCode, setProductCode] = useState(initialData.productCode);
  const [quantity, setQuantity] = useState(initialData.quantity);

  const handleCancel = () => {
    // Restaura os valores iniciais
    setProductName(initialData.productName);
    setDescription(initialData.description);
    setCategory(initialData.category);
    setSupplier(initialData.supplier);
    setProductCode(initialData.productCode);
    setQuantity(initialData.quantity);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedDetails = {
      productName,
      description,
      category,
      supplier,
      productCode,
      quantity
    };
    console.log("Detalhes atualizados:", updatedDetails);
    alert("Detalhes salvos com sucesso!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Produto</h1>
      <form onSubmit={handleSave} className={styles.form}>
        {/* Linha 1: Nome do Produto (input em largura total) */}
        <div className={styles.formGroup}>
          <label htmlFor="productName">Nome do Produto:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Linha 2: Descrição (textarea em largura total) */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        {/* Linha 3: Categoria e Fornecedor lado a lado */}
        <div className={styles.formRow}>
          <div className={styles.halfFormGroup}>
            <label htmlFor="category">Categoria:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className={styles.halfFormGroup}>
            <label htmlFor="supplier">Fornecedor:</label>
            <input
              type="text"
              id="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </div>
        </div>

        {/* Linha 4: Código do Produto e Quantidade lado a lado */}
        <div className={styles.formRow}>
          <div className={styles.halfFormGroup}>
            <label htmlFor="productCode">Código do Produto:</label>
            <input
              type="text"
              id="productCode"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>
          <div className={styles.halfFormGroup}>
            <label htmlFor="quantity">Quantidade:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {/* Botões para Cancelar e Salvar */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.saveButton}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
