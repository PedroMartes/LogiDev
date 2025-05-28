import { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { NavBarGeral } from "../../components/NavBar/NavBar";
import style from "./GraficoProduto.module.css"
import { Menu } from "../../components/Menu/Menu";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale
);

interface IProduto {
  id: number;
  quantidade: number;
}

interface IFornecedores {
  id: number;
  nome: string;
  contato: string;
  telefone: string;
  email: string;
  Produtos: IProduto[];
}

export const GraficoFornecedores = () => {

  const [chart, setChart] = useState<IFornecedores[]>([]);

  const baseUrl = "http://localhost:8080/fornecedores/get";
  const url = `${baseUrl}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET"
        }
      }).then((res) => {
        res.json().then((json) => {
          console.log(json)
          setChart(json)
        })
      }).catch(error => {
        console.log(error);

      })
    }
    fetchCoins()
  }, [baseUrl, url, proxyUrl])

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
const contatoCountMap: { [key: string]: number } = {};

chart.forEach(fornecedor => {
  const tipoContato = fornecedor.contato?.toLowerCase().trim();
  if (tipoContato) {
    contatoCountMap[tipoContato] = (contatoCountMap[tipoContato] || 0) + 1;
  }
});

const contatoLabels = Object.keys(contatoCountMap);
const contatoData = Object.values(contatoCountMap);

const data = {
  labels: contatoLabels,
  datasets: [
    {
      label: "Fornecedores por tipo de contato",
      data: contatoData,
      backgroundColor: contatoLabels.map((_, i) => barColors[i % barColors.length]),
      borderWidth: 1,
    },
  ],
};


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
      <h1 className={style.tituloProdutos}>Fornecedores</h1>
      {/* <h2 className={style.subtituloProdutos}>Quantidade de produtos disponíveis</h2> */}
      <div className={style.graficoProdutos}>
        <Bar  className={style.apiGrafico}
          data={data}
          height={400}
          options={options}
          />
      </div>
    </div>
          </div>
  )
}
export default GraficoFornecedores