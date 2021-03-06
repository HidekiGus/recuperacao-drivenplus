import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import { useContext } from "react";

export default function TelaPlanos() {

    const { token } = useContext(TokenContext);
    const [ planos, setPlanos ] = useState([]);

    useEffect(() => obtemPlanos(), []);

    function obtemPlanos() {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const promessa = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);

        promessa.then((response) => setPlanos(response.data));
    }
    
    return (
        <>
        <Tela>
            <h1>Escolha seu Plano</h1>
            <Planos>
                {planos.length === 0 ? "" :
                planos.map((plano, index) => <Plano key={index} imagem={plano.image} preco={plano.price} id={plano.id}/>
                )}
            </Planos>
        </Tela>
        </>
    );
}

function Plano({ imagem, preco, id }) {

    let precoFormatado = preco.replace(".", ",");
    precoFormatado = "R$ " + precoFormatado;

    return(
        <Link to={`/subscriptions/${id}`} style={{ textDecoration: "none" }}>
            <CardPlano>
                <img src={imagem} />
                <h1>{precoFormatado}</h1>
            </CardPlano>
        </Link>
    );
}

const Tela = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #0E0E13;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    h1 {
        font-family: 'Roboto';
        font-size: 32px;
        color: #FFFFFF;
        margin: 3vh 0;
    }
`



const Planos = styled.div`
    width: 100vw;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

const CardPlano = styled.div`
    width: 80vw;
    height: 25vh;
    border: 3px solid #7e7e7e;
    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
`