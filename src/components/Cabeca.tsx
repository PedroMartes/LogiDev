import style from "./cabeca.module.css"

export function Cabeca() {
    return (
        <header>
            <nav>
                <div className={style.headerContainer}>
                        <div className={style.logo}>

                            <h1>LOGIDEV</h1>
                            <p>Tecnologia e Logistica em um só lugar!</p>
                        </div>


                        <ul>
                            <li>
                                <a href="">Home</a>
                            </li>
                            <li>
                                <a href="">Sobre</a>
                            </li>
                            <li>
                                <a href="">Contato</a>
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

