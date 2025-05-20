import { useRef, useState, useEffect, use } from 'react';
import styles from './Carrosselhome.module.css';
import imagem1 from '../../assets/img/home2.jpg'; // Imagem 1 do carrossel
import imagem2 from '../../assets/img/home3.jpg'; // Imagem 2 do carrossel
import imagem3 from '../../assets/img/home1.jpg'; // Imagem 2 do carrossel
import imagem4 from '../../assets/img/home4.png' // Imagem 3 do carrossel
import imagem5 from '../../assets/img/home5.jpg'; // Imagem 4 do carrossel
import { Login } from '../Login/login';
import { Cadastro } from '../Cadastro/cadastro';


export function CarrosselHome() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsCount = 5;
  const [showLogin, setShowLogin] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);

  // Atualiza o transform do carrossel sempre que currentIndex mudar
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  // Configura o auto slide a cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % itemsCount);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [itemsCount]);
   
  return (
    <>
    <header>
      <div className={styles.carouselContainer}>
        <div className={styles.carousel} ref={carouselRef}>

          <div className={styles.carouselItem}>
            <img src={imagem1} />
            <h1>Descomplique sua logística com um controle de estoque feito para você.</h1>
            <button onClick={() => setShowLogin(true)}  className={styles.buttonCarousel}>Comece agora</button>
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem2} />
            <h1>Soluções personalizadas para cada tipo de negócio.</h1>
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem3} />
            <h1>Tenha tudo sob controle em um só lugar.</h1>
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem4} />
            <h1>Acesso rápido, atualizações em tempo real.</h1>
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem5} />
            <h1>Controle preciso de entradas e saídas.</h1>
          </div>

        </div>
      </div>
    </header>
       {showLogin && (
            <Login
                onClose={() => setShowLogin(false)}
                onOpenCadastro={() => {
                    setShowLogin(false);
                    setShowCadastro(true);
                }}
                />
            )}
      {showCadastro && (
                      <Cadastro
                          onClose={() => setShowCadastro(false)}
                          onOpenLogin={() => {
                              setShowCadastro(false);
                              setShowLogin(true);
                          }}
                      />
                  )}
      </>
  );
}
