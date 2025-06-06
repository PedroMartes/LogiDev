import Style from "./NavBar.module.css";
import Styles from "./NavBarGeral.module.css";
import Logo from "../../assets/img/img-1.png";
import { useEffect, useState } from "react";
import { Faleconosco } from "../FaleConosco/Faleconosco";
import { Login } from "../Login/Login";
import { Cadastro } from "../Cadastro/cadastro";
import * as Icon from 'react-bootstrap-icons'
import { useNavigate } from "react-router";
import { EsqueciSenha } from "../EsqueciSenha/EsqueciSenha";
import { RenovarSenha } from "../EsqueciSenha/RenovarSenha";
import { FaUserCircle } from 'react-icons/fa';
import { Perfil } from "../Perfil/Perfil";

export function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFaleConosco, setShowFaleConosco] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);
    const [showEsqueciSenha, setShowEsqueciSenha] = useState(false);
    const [showRenovarSenha, setShowRenovarSenha] = useState(false);
    const [emailRecuperacao, setEmailRecuperacao] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header>
                <nav className={Style.navbar}>
                    <div
                        className={`${Style.headerContainer} ${isScrolled ? Style.scrolled : ""
                            }`}
                    >
                        <div className={Style.logo}>
                            <a href={"/"}>
                                <img src={Logo} className={Style.imgLogo} />
                                <div className={Style.logoText}>
                                    <h1>LOGIDEV</h1>
                                    <h4>Tecnologia e Logistica em um só lugar!</h4>
                                </div>
                            </a>
                        </div>

                        <ul className={Style.navbarList}>
                            <li className={Style.navbarItem}>
                                <a href={"/"} className={Style.home}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href={"/sobre"} className={Style.sobre}>
                                    Sobre
                                </a>
                            </li>
                            <li>
                                <a
                                    className={Style.contato}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowFaleConosco(true)}
                                >
                                    Contato
                                </a>
                            </li>
                            <li>
                                <a
                                    className={Style.contato}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowLogin(true)}
                                >
                                    Login
                                </a>
                            </li>
                            <li>
                                <a className={Style.servico} style={{ cursor: "pointer" }} onClick={() => setShowLogin(true)}>
                                    Serviços
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            {showFaleConosco && <Faleconosco onClose={() => setShowFaleConosco(false)} />}
            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onOpenCadastro={() => {
                        setShowLogin(false);
                        setShowCadastro(true);
                    }}
                    onOpenEsqueciSenha={() => {
                        setShowLogin(false);
                        setShowEsqueciSenha(true);
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
            {showEsqueciSenha && (
                <EsqueciSenha
                    onClose={() => {
                        setShowEsqueciSenha(false);
                        setShowLogin(true);
                    }}
                     onEnviar={email => {
            setEmailRecuperacao(email);
            setShowEsqueciSenha(false);
            setShowRenovarSenha(true);
        }}
                    />
                )}
            {showRenovarSenha && (
                <RenovarSenha
                onClose={() => {
                    setShowRenovarSenha(false);
                    setShowLogin(true);
                }}
                email={emailRecuperacao}
                />
            )}

        </>
    );
}

export function NavBarGeral() {
    const [showFaleConosco, setShowFaleConosco] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const [showPerfil, setShowPerfil] = useState(false);


    const handleClose = () => {
        setIsOpen(false);
         localStorage.removeItem('token');
        navigate("/"); // Chama a função de fechamento passada como prop
    };

    if (!isOpen) {
        return null; // Isso faz com que o componente não seja renderizado
    }

    return (
        <>
            <header>
                <nav className={Styles.navbar}>
                    <div
                        className={Styles.headerContainer}
                    >
                        <div className={Styles.logo}>
                            <img src={Logo} className={Styles.imgLogo} />
                            <div className={Styles.logoText}>
                                <h1>LOGIDEV</h1>
                                <h4>Tecnologia e Logistica em um só lugar!</h4>
                            </div>
                        </div>

                        <ul className={Styles.navbarList}>
                            <li>
                                <a
                                    className={Styles.contato}
                                    onClick={() => setShowFaleConosco(true)}
                                >
                                    Contato
                                </a>
                            </li>

                            <li>
                                <a href={"/controle/produtos"} className={Styles.servico}>
                                    Serviços
                                </a>
                            </li>

                            <li>
                                 <FaUserCircle size={40} className={Styles.icon}
                                  onClick={() => setShowPerfil(true)} />
                            </li>

                            <Icon.BoxArrowRight className={Styles.iconSaida} onClick={handleClose} />
                        </ul>
                    </div>
                </nav>
            </header >
            {showFaleConosco && <Faleconosco onClose={() => setShowFaleConosco(false)} />}
            {showPerfil && <Perfil onClose={() => setShowPerfil(false)} />}

        </>
    );
}
