import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Alerta.module.css';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';

// Função para alternar o check (a classe "checked") no botão do cartão
function toggleCheck(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.classList.toggle(styles.checked);
}

export function Alerta() {
  const navigate = useNavigate();

  const handleAdicionarAlerta = () => {
    navigate('/alertas/novoAlerta');
  };

  return (
    <div>

      <NavBarGeral />
      <Menu/>
      <div className={styles.cardGrande}>
        <h1 className={styles.cardGrandeTitulo}>Alertas</h1>
        {/* Botão "Adicionar Alerta" com sinal de + incluído */}
        <button className={styles.adicionarAlerta} onClick={handleAdicionarAlerta}>
          <span className={styles.mais}>+</span>
          <span className={styles.textoAdicionar}>Adicionar Alerta</span>
        </button>

        <div className={styles.cardMenoresContainer}>
          <div className={styles.cardMenor}>
            <button
              className={styles.cardMenorCheck}
              onClick={toggleCheck}
            >
              <span className={styles.checkIcone}>&#10003;</span>
            </button>
            <h2 className={styles.cardMenorTitulo}>
              ALERTA: DIVERGÊNCIA NO ESTOQUE
            </h2>
            <ul className={styles.cardMenorLista}>
              <li className={styles.cardMenorItem}>
                <strong>Descrição:</strong> Contagem física não bate com sistema no item SKU-5567.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Consequência:</strong> 12 unidades faltando.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Ação:</strong> Bloquear saída do item até conferência.
              </li>
            </ul>
          </div>

          <div className={styles.cardMenor}>
            <button
              className={styles.cardMenorCheck}
              onClick={toggleCheck}
            >
              <span className={styles.checkIcone}>&#10003;</span>
            </button>
            <h2 className={styles.cardMenorTitulo}>
              ALERTA: FALHA NA SEPARAÇÃO
            </h2>
            <ul className={styles.cardMenorLista}>
              <li className={styles.cardMenorItem}>
                <strong>Descrição:</strong> Produto COD-7895 escaneado incorretamente.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Consequência:</strong> Pedido #30214 pode ser enviado incompleto.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Ação:</strong> Revisar etiquetas e conferir manualmente.
              </li>
            </ul>
          </div>

          <div className={styles.cardMenor}>
            <button
              className={styles.cardMenorCheck}
              onClick={toggleCheck}
            >
              <span className={styles.checkIcone}>&#10003;</span>
            </button>
            <h2 className={styles.cardMenorTitulo}>
              ALERTA: ETIQUETAS COM DADOS INCORRETOS
            </h2>
            <ul className={styles.cardMenorLista}>
              <li className={styles.cardMenorItem}>
                <strong>Descrição:</strong> Etiquetas do lote PED-20240510 estão exibindo códigos de barras inválidos.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Consequência:</strong> 15 pedidos com informações erradas.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Ação:</strong> Pausar a impressão e verificar o template no sistema.
              </li>
            </ul>
          </div>

          <div className={styles.cardMenor}>
            <button
              className={styles.cardMenorCheck}
              onClick={toggleCheck}
            >
              <span className={styles.checkIcone}>&#10003;</span>
            </button>
            <h2 className={styles.cardMenorTitulo}>
              ALERTA: CARGA INCORRETA
            </h2>
            <ul className={styles.cardMenorLista}>
              <li className={styles.cardMenorItem}>
                <strong>Descrição:</strong> Pedido #88976 foi carregado com 3 volumes a menos.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Consequência:</strong> Etiqueta de separação descolou.
              </li>
              <li className={styles.cardMenorItem}>
                <strong>Ação:</strong> Verificar esteira de carregamento antes da entrega.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}