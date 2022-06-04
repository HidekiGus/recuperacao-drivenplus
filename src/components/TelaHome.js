import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NomeUsuarioContext from "../contexts/NomeUsuarioContext";
import DadosLoginContext from "../contexts/DadosLoginContext";
import { useContext } from "react";

import iconePerfil from "../images/iconePerfil.png";


export default function TelaHome() {

    const { dadosLogin } = useContext(DadosLoginContext);

    console.log(dadosLogin);

    let beneficios = dadosLogin.membership.perks;

    return (
        <>
        <Tela>
            <Imagens>
                <ImagemLogo src={dadosLogin.membership.image} />
                <ImagemPerfil src={iconePerfil} />
            </Imagens>
            <h1>Olá, {dadosLogin.name}</h1>
            <BotoesVariaveis>
                {beneficios.map((beneficio, index) => <a href={beneficio.link}><button key={index}>{beneficio.title}</button></a>)}
            </BotoesVariaveis>
            <BotoesConstantes>
                <button>Mudar plano</button>
                <button>Cancelar plano</button>
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