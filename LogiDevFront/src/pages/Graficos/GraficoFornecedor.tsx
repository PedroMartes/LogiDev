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
  nome: string;
  quantidade: number;
  fornecedor: {
    id: number;
    nome: string;
  };
}

export const GraficoFornecedores = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/produtos/get")
      .then(res => res.json())
      .then(json => setProdutos(json))
      .catch(error => console.log(error));
  }, []);

  // Conta produtos por fornecedor
  const fornecedorCountMap: { [key: string]: { nome: string, count: number } } = {};
  produtos.forEach(produto => {
    const fornecedorId = produto.fornecedor?.id;
    const fornecedorNome = produto.fornecedor?.nome || `Fornecedor ${fornecedorId}`;
    if (fornecedorId) {
      if (!fornecedorCountMap[fornecedorId]) {
        fornecedorCountMap[fornecedorId] = { nome: fornecedorNome, count: 0 };
      }
      fornecedorCountMap[fornecedorId].count += 1;
    }
  });

  const fornecedorLabels = Object.values(fornecedorCountMap).map(f => f.nome);
  const fornecedorData = Object.values(fornecedorCountMap).map(f => f.count);

  const barColors = [
    "#41b8d5", "#30babe", "#2f8fbe", "#3edfd7", "#1e6f9f", "#3ec6e0", "#2ecc71",
    "#1abc9c", "#2980b9", "#27ae60", "#3498db", "#16a085", "#5dade2", "#48c9b0", "#76d7c4"
  ];

  const data = {
    labels: fornecedorLabels,
    datasets: [
      {
        label: "Quantidade de produtos de cada fornecedor",
        data: fornecedorData,
        backgroundColor: fornecedorLabels.map((_, i) => barColors[i % barColors.length]),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(tickValue: string | number) {
            if (typeof tickValue === 'number' && Number.isInteger(tickValue)) {
              return tickValue;
            }
            return null;
          }
        }
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
        <h1 className={style.tituloProdutos}>Número de produtos cadastrados em cada fornecedor</h1>
        <div className={style.graficoProdutos}>
          <Bar className={style.apiGrafico}
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