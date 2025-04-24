import { useEffect, useState } from "react"
import axios from "axios"


interface ICategoria {
    id: number;
    nome: string;
    descricao: string;
}


export function ControleCadastros() {
    const [data, setData] = useState<ICategoria[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/categorias")
            .then(response => setData(response.data))
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);


    return (
        <>

            {data.length > 0 ? (
                data.map(categoria => (
                    <ul>
                        <li>
                            <p>{categoria.nome}</p>
                        </li>
                    </ul>
                ))
            ) : (
                <p>Não há categorias cadastradas</p>
            )}
        </>

    )
}