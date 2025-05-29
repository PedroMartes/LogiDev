import React from "react";
import styles from './HistoricoCard.module.css';

interface CardProps {
    nome: string;
    dataAtualizacao: string | Date;
    acao: string;
}

export const HistoricoCard: React.FC<CardProps> = ({ nome, dataAtualizacao, acao }) => {
    // Formata a data para exibição
    const dataFormatada = new Date(dataAtualizacao).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className={styles.cardHistorico}>
            <h3 className={styles.tituloHistorico}>{nome}</h3>
            <p className={styles.dataHistorico}>Data da Ultima Atualização: {dataFormatada}</p>
            <p className={styles.acaoHistorico}>Ação Realizada: {acao}</p>
        </div>
    );
};
