import Style from "./NavBar.module.css"
import Logo from "../../assets/img/img-1.png"

export function NavBar() {
    return (
        <header>
            <nav>
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
                            <a href={'/'}>Home</a>
                        </li>
                        <li>
                            <a href={'/sobre'}>Sobre</a>
                        </li>
                        <li>
                            <a href={'/contato'}>Contato</a>
                        </li>
                        <li>
                            <a href="" className={Style.servico}>Serviços</a>
                        </li>
                    </ul>

                </div>
            </nav>
        </header>
    )
}

