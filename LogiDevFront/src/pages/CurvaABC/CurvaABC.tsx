import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import style from './CurvaABC.module.css';

export default function CurvaABC() {
  return (
    <div>
      <NavBarGeral />
      <Menu />
      <div className={style.curvaBody}>
        <div className={style.curvaAbcContainer}>
          <h2 className={style.curvaAbcTitle}>Curva ABC</h2>
          <p className={style.curvaSubtitle}>
            Classificação automática dos seus itens em A, B e C conforme impacto no faturamento.
          </p>

          <div className={style.curvaCardsWrapper}>
            <div className={style.curvaCard}>
              <div className={style.curvaCardHeader}>
                <h3 className={style.curvaCardTitle}>Curva A</h3>
                <span className={`${style.curvaBadge} ${style.curvaAltaPrioridade}`}>Alta Prioridade</span>
              </div>
              <p className={style.curvaDescription}>Itens que geram 80% do seu lucro</p>
              <p className={style.curvaHighlight}>TOP 1 de vendas!</p>
              <p className={style.curvaExampleItem}>Cimento 50kg</p>
              
              <div className={style.curvaCardFooter}> 
                <div className={style.curvaStatsItem}>
                  <span className={style.curvaCount}>200</span>
                  <span className={style.curvaLabel}>produtos</span>
                </div>
                <span className={style.curvaArrow}>➔</span>
                <div className={style.curvaStatsItem}>
                  <span className={style.curvaPercentage}>80%</span>
                  <span className={style.curvaLabel}>da venda</span>
                </div>
              </div>
            </div>

            <div className={style.curvaCard}>
              <div className={style.curvaCardHeader}>
                <h3 className={style.curvaCardTitle}>Curva B</h3>
                <span className={`${style.curvaBadge} ${style.curvaMediaPrioridade}`}>Média Prioridade</span>
              </div>
              <p className={style.curvaDescription}>Produtos com média movimentação</p>
              <p className={style.curvaHighlight}>Vendas médias</p>
              <p className={style.curvaExampleItem}>Argamassa Colante 20kg</p>
               
              <div className={style.curvaCardFooter}>
                <div className={style.curvaStatsItem}>
                  <span className={style.curvaCount}>300</span>
                  <span className={style.curvaLabel}>produtos</span>
                </div>
                <span className={style.curvaArrow}>➔</span>
                <div className={style.curvaStatsItem}>
                  <span className={style.curvaPercentage}>15%</span>
                  <span className={style.curvaLabel}>da venda</span>
                </div>
              </div>
            </div>

            <div className={style.curvaCard}>
              <div className={style.curvaCardHeader}>
                <h3 className={style.curvaCardTitle}>Curva C</h3>
                <span className={`${style.curvaBadge} ${style.curvaBaixaPrioridade}`}>Baixa Prioridade</span>
              </div>
              <p className={style.curvaDescription}>Estoque mínimo  e com menos custos</p>
              <p className={style.curvaHighlight}>Itens de baixo giro</p>
              <p className={style.curvaExampleItem}>Lixa para Parede</p>
              <div className={style.curvaCardFooter}>
                <div className={style.curvaStatsItem}>
                  <span className={style.curvaCount}>500</span>
                  <span className={style.curvaLabel}>produtos</span>
                </div>
                <span className={style.curvaArrow}>➔</span>
                <div className={style.curvaStatsItem}>
                  <span className={style.curvaPercentage}>5%</span>
                  <span className={style.curvaLabel}>da venda</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}