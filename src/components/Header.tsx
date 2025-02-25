import React from 'react'

function Header() {
    return (
        <div>
            <nav>
                <div className="headerContainer">
                        <div className="logo">

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
                                <a href="" className="servico-button">Serviços</a>
                            </li>
                        </ul>

                </div>
            </nav>
        </div>
    )
}

export default Header