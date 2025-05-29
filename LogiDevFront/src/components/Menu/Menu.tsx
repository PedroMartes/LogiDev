import setaParaBaixo from '../../assets/img/setaParaBaixo.png';
import styles from './Menu.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Menu() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleMenuClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        const isNifValid = localStorage.getItem('nifValidated') === 'true';
        
        if (isNifValid) {
            navigate(path);
        } else {
            navigate('/nif', { 
                state: { 
                    from: path,
                    nifRequired: true 
                } 
            });
        }
    };

    return (
        <div className={styles.menuSecundario}>
            <nav className={styles.menuNav}>
                <ul className={styles.menuCategorias}>
                    <li className={`${styles.menuItem} ${openIndex === 0 ? styles.open : ''}`}>
                        <a
                            className={styles.menuLink}
                            onClick={e => {
                                e.preventDefault();
                                handleMenuClick(0);
                            }}
                        >
                            Cadastro
                            <img src={setaParaBaixo} alt="Seta para baixo" className={styles.menuIcon} />
                        </a>
                        <ul className={styles.submenu}>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a 
                                    href="/cadastro/produtos" 
                                    className={styles.submenuLink}
                                    onClick={(e) => handleProtectedNavigation(e, '/cadastro/produtos')}
                                >
                                    Produto
                                </a>
                            </li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a 
                                    href="/cadastro/fornecedores" 
                                    className={styles.submenuLink}
                                    onClick={(e) => handleProtectedNavigation(e, '/cadastro/fornecedores')}
                                >
                                    Fornecedor
                                </a>
                            </li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a 
                                    href="/cadastro/categorias" 
                                    className={styles.submenuLink}
                                    onClick={(e) => handleProtectedNavigation(e, '/cadastro/categorias')}
                                >
                                    Categoria
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className={`${styles.menuItem} ${openIndex === 1 ? styles.open : ''}`}>
                        <a
                            className={styles.menuLink}
                            onClick={e => {
                                e.preventDefault();
                                handleMenuClick(1);
                            }}
                        >
                            Gráficos
                            <img src={setaParaBaixo} alt="Seta para baixo" className={styles.menuIcon} />
                        </a>
                        <ul className={styles.submenu}>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a href="/curvaABC" className={styles.submenuLink}>Curva ABC</a>
                            </li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li><a href="/controle/grafico/fornecedores" className={styles.submenuLink}>Fornecedor</a></li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li><a href="/controle/grafico/produtos" className={styles.submenuLink}>Produto</a></li>
                        </ul>
                    </li>

                    <li className={`${styles.menuItem} ${openIndex === 2 ? styles.open : ''}`}>
                        <a
                            className={styles.menuLink}
                            onClick={e => {
                                e.preventDefault();
                                handleMenuClick(2);
                            }}
                        >
                            Relatórios
                            <img src={setaParaBaixo} alt="Seta para baixo" className={styles.menuIcon} />
                        </a>
                        <ul className={styles.submenu}>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li><a href="/historico" className={styles.submenuLink}>Histórico</a></li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a href="/alertas" className={styles.submenuLink}>Alertas</a>
                            </li>
                        </ul>
                    </li>

                    <li className={`${styles.menuItem} ${openIndex === 3 ? styles.open : ''}`}>
                        <a
                            className={styles.menuLink}
                            onClick={e => {
                                e.preventDefault();
                                handleMenuClick(3);
                            }}
                        >
                            Controles
                            <img src={setaParaBaixo} alt="Seta para baixo" className={styles.menuIcon} />
                        </a>
                        <ul className={styles.submenu}>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a href="/controle/produtos" className={styles.submenuLink}>Produto</a>
                            </li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a href="/controle/fornecedores" className={styles.submenuLink}>Fornecedor</a>
                            </li>
                            <hr style={{ border: '1px solid #045a6e', margin: 0 }} />
                            <li>
                                <a href="/controle/categorias" className={styles.submenuLink}>Categoria</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}