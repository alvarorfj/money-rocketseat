import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable(){
    useEffect(() => {
        api('/transactions')
        .then(response => { console.log(response.data); });
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Desenvolvimento de Website</td>
                        <td className="deposit">R$: 12.000</td>
                        <td>Desenvolvimento</td>
                        <td>30/07/2022</td>
                    </tr>
                    <tr>
                        <td>Aluguel</td>
                        <td className="deposit">R$: 1.400</td>
                        <td>Desenvolvimento</td>
                        <td>30/07/2022</td>
                    </tr>
                    <tr>
                        <td>Despesas</td>
                        <td className="withdraw">-R$: 12.000</td>
                        <td>Desenvolvimento</td>
                        <td>30/07/2022</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}