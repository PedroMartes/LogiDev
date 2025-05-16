import Style from "./NavBar.module.css";
import Styles from "./NavBarGeral.module.css";
import Logo from "../../assets/img/img-1.png";
import { useEffect, useState } from "react";
import { Faleconosco } from "../FaleConosco/Faleconosco";
import { Cadastro } from "../Cadastro/cadastro";

export function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFaleConosco, setShowFaleConosco] = useState(false);
    const [showCadastro, setShowCadastro] = useState(false);

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
                                <a className={Style.servico}  style={{ cursor: "pointer" }} onClick={() => setShowCadastro(true)}>
                                    Serviços
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            {showFaleConosco && <Faleconosco onClose={() => setShowFaleConosco(false)} />}
            {showCadastro && <Cadastro onClose={() => setShowCadastro(false)} />}
        </>
    );
}

export function NavBarGeral() {
    const [showFaleConosco, setShowFaleConosco] = useState(false);
     const [showCadastro, setShowCadastro] = useState(false);

    return (
        <>
            <header>
                <nav className={Styles.navbar}>
                    <div
                        className={Styles.headerContainer}
                    >
                        <div className={Styles.logo}>
                            <a href={"/"}>
                                <img src={Logo} className={Styles.imgLogo} />
                                <div className={Styles.logoText}>
                                    <h1>LOGIDEV</h1>
                                    <h4>Tecnologia e Logistica em um só lugar!</h4>
                                </div>
                            </a>
                        </div>

                        <ul className={Styles.navbarList}>
                            <li className={Styles.navbarItem}>
                                <a href={"/"} className={Styles.home}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href={"/sobre"} className={Styles.sobre}>
                                    Sobre
                                </a>
                            </li>
                            <li>
                                <a
                                    className={Styles.contato}
                                onClick={() => setShowFaleConosco(true)}
                                >
                                Contato
                            </a>
                        </li>
                        <li>
                            <a href={"/controle"} className={Styles.servico}>
                                Serviços
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header >
            { showFaleConosco && <Faleconosco onClose={() => setShowFaleConosco(false)} />}
            {showCadastro && <Cadastro onClose={() => setShowCadastro(false)} />}
        </>
    );
}

