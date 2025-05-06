import { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
);

export const GraficoProdutos = () => {

    return





    const [chart, setChart] = useState([]);

    const baseUrl = "http://localhost:8080/produtos";
    const url = `${baseUrl}/api/chartjs`;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    useEffect(() => {
        const fetchCoins = async () => {
            await fetch(`${proxyUrl}, ${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET"
                }
            }).then((res) => {
                res.json().then((json) => {
                    console.log(json)
                    setChart(json.data)
                })
            }).catch(error => {
                console.log(error);

            })
        }
        fetchCoins()
    }, [baseUrl, url, proxyUrl])

    console.log(chart)

    const data = {
        labels: chart?.map(x => x.nome),
        datasets: [{
                label: `${chart?.length} Available`,
                data: chart?.map(x => x.quantidade),
                borderWidth: 1
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
        <div>
          <Bar
            data={data}
            height={400}
            options={options}
          />
        </div>
      )
    }
    export default GraficoProdutos