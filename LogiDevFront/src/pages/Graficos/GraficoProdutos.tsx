import { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { NavBarGeral } from "../../components/NavBar/NavBar";
import style from "./GraficoProduto.module.css"
import { Menu } from "../../components/Menu/Menu";
import { FooterGeral } from "../../components/Footer/Footer";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale
);

interface IProduto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: {
    id: number;
    nome: string;
  };
  fornecedor: {
    id: number;
    nome: string;
  };
  quantidade: number;
}

export const GraficoProdutos = () => {

  const [chart, setChart] = useState<IProduto[]>([]);

  const baseUrl = "http://localhost:8080/produtos/get";
  const url = `${baseUrl}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

useEffect(() => {
  const fetchProdutos = async () => {
    const token = localStorage.getItem('token');
    await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Adicione o token aqui
      }
    })
      .then((res) => res.json())
      .then((json) => {
        // Se sua API retorna { produtos: [...] }
        setChart(json.produtos || json);
      })
      .catch(error => {
        console.log(error);
      });
  };
  fetchProdutos();
}, [baseUrl, url, proxyUrl]);

  console.log(chart)

  const barColors = [
    "#41b8d5",
  "#30babe", 
  "#2f8fbe", 
  "#3edfd7", 
  "#1e6f9f", 
  "#3ec6e0", 
  "#2ecc71",
  "#1abc9c", 
  "#2980b9", 
  "#27ae60", 
  "#3498db", 
  "#16a085", 
  "#5dade2", 
  "#48c9b0", 
  "#76d7c4" 
]; 

  const data = {
    labels: chart?.map(x => x.nome),
    datasets: [{
      label: `${chart?.length} Available`,
      data: chart?.map(x => x.quantidade),
      borderWidth: 1,
         backgroundColor: chart?.map((_, i) => barColors[i % barColors.length]), // Cores diferentes
    }],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      labels: {
        fontSize: 26
      }
    }
  }

  return (

    <div className={style.containergrafico}>

      <NavBarGeral />
            <Menu />
    <div className={style.grafico}>
      <h1 className={style.tituloProdutos}>Produtos</h1>
      {/* <h2 className={style.subtituloProdutos}>Quantidade de produtos disponíveis</h2> */}
      <div className={style.graficoProdutos}>
        <Bar  className={style.apiGrafico}
          data={data}
          height={400}
          options={options}
          />
      </div>
    </div>
    <FooterGeral/>
          </div>
  )
}
export default GraficoProdutos