import Style from "./NavBar.module.css"
import Logo from "../../assets/img/img-1.png"
// import { useLocation } from "react-router";
// import { useEffect, useState } from "react";

export function NavBar() {
    return (
        <header>
            <nav className={Style.navbar}>
                <div className={Style.headerContainer}>
                    <div className={Style.logo}>
                        <a href={'/'}>
                            <img src={Logo} className={Style.imgLogo} />
                            <div className={Style.logoText}>
                                <h1>LOGIDEV</h1>
                                <h4>Tecnologia e Logistica em um só lugar!</h4>
                            </div>
                        </a>
                    </div>



                    <ul className={Style.navbarList}>
                        <li className={Style.navbarItem}>
                            <a href={'/'} className={Style.home}>Home</a>
                        </li>
                        <li>
                            <a href={'/sobre'} className={Style.sobre}>Sobre</a>
                        </li>
                        <li>
                            <a href={'/contato'} className={Style.contato}>Contato</a>
                        </li>
                        <li>
                            <a href={'/controle'} className={Style.servico}>Serviços</a>
                        </li>
                    </ul>

                </div>
            </nav>
        </header>

    )


}

