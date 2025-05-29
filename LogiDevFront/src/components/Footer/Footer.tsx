import React from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/img/img-1.png';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="/">
        <div className={styles.logoWrapper}>
          <img src={logo} alt="LogiDev Logo" className={styles.logo} />
          <div className={styles.logoContainer}>
            <div className={styles.siteName}>LOGIDEV</div>
            <div className={styles.tagline}>
              Tecnologia e logística em um só lugar!
            </div>
          </div>
        </div>
      </a>

      {/* Seção principal com colunas */}
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Sobre a LogiDev</h3>
          <p>
            Fornecemos soluções tecnológicas e logísticas para o gerenciamento de estoques e fornecedores.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Contato</h3>
          <p>
            <FiMail className={styles.contactIcon} />
            contato@logidev.com.br
          </p>
          <p>
            <FiPhone className={styles.contactIcon} />
            (11) 99999-9999
          </p>
          <p>
            <FiMapPin className={styles.contactIcon} />
            Rua Exemplo, 123, São Paulo/SP
          </p>
        </div>

        <div className={styles.column}>
          <h3>Redes Sociais</h3>
          <ul className={styles.socialList}>
            <li>
              <a 
                href="https://api.whatsapp.com/send?phone=+559999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a 
                href="https://instagram.com/logidev" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className={styles.socialIcon} />
              </a>
            </li>
            <li>
              <a 
                href="https://facebook.com/logidev" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className={styles.socialIcon} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Área de créditos */}
      <div className={styles.copy}>
        <p>
          © {new Date().getFullYear()} LogiDev. Todos os direitos reservados. | Termos de Uso | Política de Privacidade
        </p>
      </div>
    </footer>
  );
}