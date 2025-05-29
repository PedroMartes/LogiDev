import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from './historico.module.css';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { FooterGeral } from '../../components/Footer/Footer';
import { HistoricoCard } from '../../components/HistoricoCard/HistoricoCard';
import axios from 'axios';

interface IHistoricoProduto {
  id: number;
  nome: string;
  dataAlteracao: string;
  acao: string;
}

export function Historico() {
  const [historico, setHistorico] = useState<IHistoricoProduto[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/historico_produtos")
      .then(response => setHistorico(response.data))
      .catch(error => console.error("Erro ao buscar histórico:", error));
  }, []);

  return (
    <div>
      <NavBarGeral />
      <Menu />
      <div className={styles.pageContainer}>
        <div className={styles.historicoMain}>
          <h2 className={styles.heading}>Histórico</h2>
          <div className={styles.lista}>
            {historico.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {historico.map((registro) => (
                  <li key={registro.id}>
                    <HistoricoCard
                      nome={registro.nome}
                      dataAtualizacao={new Date(registro.dataAlteracao)}
                      acao={registro.acao}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noData}>Nenhum registro encontrado.</p>
            )}
          </div>
        </div>
      </div>
      <FooterGeral />
    </div>
  );
};


