import React, { useState } from "react";
import "../Controle/ControleProduto.module.css";
 
export  function Produto() {
  const [showModal, setShowModal] = useState(true);
 
  return (
    <div className="body">
      <header className="headerPrincipal">
        <nav className="nav">
          <div className="headerContainer">
            <div className="logo">
              <div className="logoText">
                <h1 className="logoTitle">LOGIDEV</h1>
                <p className="logoSubtitle">Tecnologia e Logistica em um só lugar!</p>
              </div>
            </div>
            <ul className="navLinks">
              <li>
                <a href="/contato" className="contato">Contato</a>
              </li>
              <li>
                <a href="/estoque" className="servico selected">Serviços</a>
              </li>
              <li className="logoutItem">
                <a href="#" title="Sair" className="logoutLink">
                  <i className="fas fa-sign-out-alt logoutIcon"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
 
      {showModal && (
        <div className="fullscreen-shadow">
          <div className="input-container">
            <span
              className="botao-x"
              onClick={() => setShowModal(false)}
              style={{ userSelect: "none" }}
            >
              &times;
            </span>
            <label className="input-label1">Confirmação</label>
            <label className="input-label">
              Você tem certeza que deseja excluir esse registro definitivamente?
            </label>
            <button className="buttonSim">
              <a className="textSim" href="/estoque">Sim</a>
            </button>
            <button className="buttonNao">
              <a className="textNao" href="/estoque">Não</a>
            </button>
          </div>
        </div>
      )}
 
      <div className="menuSecundario">
        <nav className="menuNav">
          <ul className="menuCategorias">
            <li className="menuItem">
              <a role="button" className="menuLink" href="#">
                Cadastro
                <img src="/img/setaParaBaixo.png" alt="Seta para baixo" className="menuIcon" />
              </a>
              <ul className="submenu">
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="#produto" className="submenuLink">Produto</a></li>
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="#fornecedor" className="submenuLink">Fornecedor</a></li>
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="#categoria" className="submenuLink">Categoria</a></li>
              </ul>
            </li>
            <li className="menuItem">
              <a href="#graficos" className="menuLink">
                Gráficos
                <img src="/img/setaParaBaixo.png" alt="Seta para baixo" className="menuIcon" />
              </a>
              <ul className="submenu">
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="#curvaABC" className="submenuLink">Curva ABC</a></li>
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="#fornecedor" className="submenuLink">Fornecedor</a></li>
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="#produto" className="submenuLink">Produto</a></li>
              </ul>
            </li>
            <li className="menuItem">
              <a href="/alertas" className="menuLink">
                Relatórios
                <img src="/img/setaParaBaixo.png" alt="Seta para baixo" className="menuIcon" />
              </a>
              <ul className="submenu">
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="/historico" className="submenuLink">Histórico</a></li>
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="/alertas" className="submenuLink">Alertas</a></li>
              </ul>
            </li>
            <li className="menuItem">
              <a href="#estoques" className="menuLink">
                Estoques
                <img src="/img/setaParaBaixo.png" alt="Seta para baixo" className="menuIcon" />
              </a>
              <ul className="submenu">
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="/produto" className="submenuLink">Produto</a></li>
                <hr style={{ border: "1px solid #045a6e", margin: 0 }} />
                <li><a href="/fornecedor" className="submenuLink">Fornecedor</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <main className="main">
        <div className="container">
          <h1 className="mainTitle">Controle de Estoque</h1>
          <h2 className="mainSubtitle">Produto</h2>
 
          <div className="tableContainer">
            <table className="table">
              <thead className="tableHead">
                <tr className="tableRow">
                  <th className="tableHeader">Produto</th>
                  <th className="tableHeader">Descrição</th>
                  <th className="tableHeader">Categoria</th>
                  <th className="tableHeader">Preço</th>
                  <th className="tableHeader">Quantidade</th>
                  <th className="tableHeader">Total - R$</th>
                </tr>
              </thead>
              <tbody className="tableBody">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <tr className="tableRow" key={idx}>
                    <td className="tableData"></td>
                    <td className="tableData"></td>
                    <td className="tableData"></td>
                    <td className="tableData"></td>
                    <td className="tableData"></td>
                    <td className="tableData"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}