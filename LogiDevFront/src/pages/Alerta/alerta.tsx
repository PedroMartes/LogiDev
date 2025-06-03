import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Alerta.module.css';
import { NavBarGeral } from '../../components/NavBar/NavBar';
import { Menu } from '../../components/Menu/Menu';
import { FooterGeral } from '../../components/Footer/Footer';
import { AlertaCard } from '../../components/AlertaCard/AlertaCard';
import axios from 'axios';

interface IAlerta {
  id: number;
  titulo: string;
  descricao: string;
  consequencia: string;
  acao: string;
}

export function Alerta() {
  const navigate = useNavigate();
  const [alertas, setAlertas] = useState<IAlerta[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/alertas/get')
      .then(response => setAlertas(response.data))
      .catch(error => console.error('Erro ao buscar alertas:', error));
  }, []);

  const handleAdicionarAlerta = () => {
    navigate('/alertas/novoAlerta');
  };

  const handleCheckAlerta = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/alertas/delete/${id}`);
      setTimeout(() => {
        setAlertas(prev => prev.filter(alerta => alerta.id !== id));
      }, 700); // 700ms de delay
    } catch (error) {
      alert('Erro ao apagar alerta!');
      console.error(error);
    }
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
          {alertas.map((alerta) => (
            <AlertaCard
              key={alerta.id}
              titulo={alerta.titulo}
              itens={[
                <><strong>Descrição:</strong> {alerta.descricao}</>,
                <><strong>Consequência:</strong> {alerta.consequencia}</>,
                <><strong>Ação:</strong> {alerta.acao}</>
              ]}
              checked={false}
              onCheckChange={() => handleCheckAlerta(alerta.id)}
            />
          ))}
        </div>
      </div>
      <FooterGeral/>
    </div>
  );
}