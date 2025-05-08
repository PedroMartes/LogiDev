import { useRef, useState, useEffect } from 'react';
import styles from './Carrosselhome.module.css';

import imagem3 from '../../assets/img/home1.jpg'; // Imagem do logo
import imagem1 from '../../assets/img/home1.jpg'; // Imagem 1 do carrossel
import imagem2 from '../../assets/img/home1.jpg'; // Imagem 2 do carrossel

export function CarrosselHome() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsCount = 3;

  // Atualiza o transform do carrossel sempre que currentIndex mudar
  useEffect(() => {
    console.log("Elemento do carousel:", carouselRef.current); // Verifica se existe
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
    <header>
      <div className={styles.carouselContainer}>
        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.carouselItem}>
            <img src={imagem1} />
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem2} />
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem3}  />
          </div>
        </div>
      </div>
    </header>
  );
}
