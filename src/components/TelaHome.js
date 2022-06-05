import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";

import DadosLoginContext from "../contexts/DadosLoginContext";
import DadosAssinaturaContext from "../contexts/DadosAssinaturaContext";
import TokenContext from "../contexts/TokenContext";

import iconePerfil from "../images/iconePerfil.png";


export default function TelaHome() {

    let navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const { dadosLogin } = useContext(DadosLoginContext);
    const { dadosAssinatura } = useContext(DadosAssinaturaContext);

    function cancelarPlano() {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let promessa = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config);

        promessa.then(() => navigate("/subscriptions"));
    }

    return (
        <>
        <Tela>
            <Imagens>
                <ImagemLogo src={dadosAssinatura.length === 0 ? "" : dadosAssinatura.image} />
                <ImagemPerfil src={iconePerfil} />
            </Imagens>
            <h1>Olá, {dadosLogin}</h1>
            <BotoesVariaveis>
                {dadosAssinatura.perks === undefined ? "" : dadosAssinatura.perks.map((beneficio, index) => <a href={beneficio.link}><button key={index}>{beneficio.title}</button></a>)}
            </BotoesVariaveis>
            <BotoesConstantes>
                <button onClick={() => navigate("/subscriptions")}>Mudar plano</button>
                <button onClick={() => cancelarPlano()}>Cancelar plano</button>
            </BotoesConstantes>
        </Tela>
        </>
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

    box-sizing: border-box;
    padding-top: 2vh;

    h1 {
        font-family: 'Roboto';
        font-size: 24px;
        color: #FFFFFF;
        margin: 10px 0;
    }
`

const Imagens = styled.div`
    width: 80vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ImagemLogo = styled.img`
    width: 75px;
    height: 51px;
`

const ImagemPerfil = styled.img`
    width: 34px;
    height: 34px;
`

const BotoesVariaveis = styled.div`
    width: 80vw;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;

    font-size: 14px;
    font-family: 'Roboto';
    font-weight: 700;

    a {
        text-decoration: none;
    }

    button {
        width: 80vw;
        height: 10vh;

        background-color: #FF4791;
        color: #FFFFFF;

        border: 1px solid #FF4791;
        border-radius: 8px;

        margin-top: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const BotoesConstantes = styled.div`
    width: 80vw;
    height: 24vh;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;

    position: fixed;
    bottom: 0;

    font-size: 14px;
    font-family: 'Roboto';
    font-weight: 700;

    button {
        width: 80vw;
        height: 10vh;

        background-color: #FF4791;
        color: #FFFFFF;

        border: 1px solid #FF4791;
        border-radius: 8px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`