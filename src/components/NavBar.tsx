import style from "./NavBar.module.css"
import Logo from "../assets/img/img-1.png"

export function NavBar() {
    return (
        <header>
            <nav>
                <div className={style.headerContainer}>
                        <div className={style.logo}>
                            <img src={Logo} className={style.imgLogo} />
                            <div className={style.logoText}>
                            <h1>LOGIDEV</h1>
                            <p>Tecnologia e Logistica em um só lugar!</p>
                            </div>
                        </div>


                        <ul>
                            <li>
                                <a href={'/'}>Home</a>
                            </li>
                            <li>
                                <a href="">Sobre</a>
                            </li>
                            <li>
                                <a href={'/contato'}>Contato</a>
                            </li>
                            <li>
                                <a href="" className={style.servico}>Serviços</a>
                            </li>
                        </ul>

                </div>
            </nav>
        </header>
    )
}

