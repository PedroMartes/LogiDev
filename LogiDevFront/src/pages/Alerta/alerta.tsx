import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Alerta.module.css';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';

export function Alerta() {
  const navigate = useNavigate();

  // Estado para os checks (um para cada cardMenor)
  const [checked, setChecked] = useState([false, false, false, false]);

  const handleCheck = (index: number) => {
    setChecked(prev =>
      prev.map((val, i) => (i === index ? true : val))
    );
  };

  const handleAdicionarAlerta = () => {
    navigate('/alertas/novoAlerta');
  };

  return (
    <div>
      <NavBarGeral />
      <Menu/>
      <div className={styles.cardGrande}>
        <h1 className={styles.cardGrandeTitulo}>Alertas</h1>
        <button className={styles.adicionarAlerta} onClick={handleAdicionarAlerta}>
          <span className={styles.mais}>+</span>
          <span className={styles.textoAdicionar}>Adicionar Alerta</span>
        </button>

        <div className={styles.cardMenoresContainer}>
          {[
            {
              titulo: 'ALERTA: DIVERGÊNCIA NO ESTOQUE',
              itens: [
                <><strong>Descrição:</strong> Contagem física não bate com sistema no item SKU-5567.</>,
                <><strong>Consequência:</strong> 12 unidades faltando.</>,
                <><strong>Ação:</strong> Bloquear saída do item até conferência.</>
              ]
            },
            {
              titulo: 'ALERTA: FALHA NA SEPARAÇÃO',
              itens: [
                <><strong>Descrição:</strong> Produto COD-7895 escaneado incorretamente.</>,
                <><strong>Consequência:</strong> Pedido #30214 pode ser enviado incompleto.</>,
                <><strong>Ação:</strong> Revisar etiquetas e conferir manualmente.</>
              ]
            },
            {
              titulo: 'ALERTA: ETIQUETAS COM DADOS INCORRETOS',
              itens: [
                <><strong>Descrição:</strong> Etiquetas do lote PED-20240510 estão exibindo códigos de barras inválidos.</>,
                <><strong>Consequência:</strong> 15 pedidos com informações erradas.</>,
                <><strong>Ação:</strong> Pausar a impressão e verificar o template no sistema.</>
              ]
            },
            {
              titulo: 'ALERTA: CARGA INCORRETA',
              itens: [
                <><strong>Descrição:</strong> Pedido #88976 foi carregado com 3 volumes a menos.</>,
                <><strong>Consequência:</strong> Etiqueta de separação descolou.</>,
                <><strong>Ação:</strong> Verificar esteira de carregamento antes da entrega.</>
              ]
            }
          ].map((card, idx) => (
            <div className={styles.cardMenor} key={idx}>
              <button
                className={`${styles.cardMenorCheck} ${checked[idx] ? styles.checked : ''}`}
                onClick={() => !checked[idx] && handleCheck(idx)}
                disabled={checked[idx]}
              >
                <span className={styles.checkIcone}>&#10003;</span>
              </button>
              <h2 className={styles.cardMenorTitulo}>{card.titulo}</h2>
              <ul className={styles.cardMenorLista}>
                {card.itens.map((item, i) => (
                  <li className={styles.cardMenorItem} key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}