import { useRef, useState, useEffect } from 'react';
import styles from './Carrosselhome.module.css';

import imagem1 from '../../assets/img/home2.jpg'; // Imagem 1 do carrossel
import imagem2 from '../../assets/img/home3.jpg'; // Imagem 2 do carrossel
import imagem3 from '../../assets/img/home1.jpg'; // Imagem 2 do carrossel
import imagem4 from '../../assets/img/home4.png' // Imagem 3 do carrossel
import imagem5 from '../../assets/img/home5.jpg'; // Imagem 4 do carrossel


export function CarrosselHome() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsCount = 5;

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
  }, [itemsCount])

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
          <div className={styles.carouselItem}>
            <img src={imagem4} />
          </div>
          <div className={styles.carouselItem}>
            <img src={imagem5} />
          </div>
        </div>
      </div>
    </header>
  );
}
