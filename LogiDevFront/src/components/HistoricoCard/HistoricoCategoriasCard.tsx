import React from "react";
import styles from './HistoricoCard.module.css';
import { MdCategory } from "react-icons/md";

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

    function traduzirAcao(acao: string) {
        if (acao === "create") return "Criar";
        if (acao === "update") return "Atualização";
        if (acao === "delete") return "Apagar";
        return acao;
    }

    return (
        <div className={styles.cardHistorico}>
            <div className={styles.perfilIconContainer}>
                <MdCategory size={32} color="#fff" />
            </div>
            <h3 className={styles.tituloHistorico}>{nome}</h3>
            <p className={styles.dataHistorico}>Última alteração: {dataFormatada}</p>
            <p className={styles.acaoHistorico}>Ação Realizada: {traduzirAcao(acao)}</p>
        </div>
    );
};
