import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";

import Logo from "../images/Logo.png";

import TokenContext from "../contexts/TokenContext";
import DadosLoginContext from "../contexts/DadosLoginContext";
import DadosAssinaturaContext from "../contexts/DadosAssinaturaContext";


export default function TelaLogin() {

    const navigate = useNavigate();
    const { token, setToken } = useContext(TokenContext);
    const { dadosLogin, setDadosLogin } = useContext(DadosLoginContext);
    const { setDadosAssinatura } = useContext(DadosAssinaturaContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function logar(event) {

        event.preventDefault();

        const corpo = {
            email,
            password
        };

        const promessa = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", corpo);

        promessa.then((response) => {
            let assinatura = response.data.membership;
            setDadosLogin(response.data.name);
            setToken(response.data.token);
            setDadosAssinatura(assinatura);
            if (assinatura === null) {
                navigate("/subscriptions");
            } else {
                navigate("/home");
            }

        });

        promessa.catch(() => alert("Confira os dados inseridos."));
    };

    return (
        <Tela> 
            <img src={Logo} />
            <form onSubmit={logar}>
                <input required placeholder="E-mail" type="text" disabled={false} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required placeholder="Senha" type="password" disabled={false} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={false} type="submit">ENTRAR</button> 
            </form>
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <Cadastro>Não tem uma conta? Cadastre-se</Cadastro>
            </Link>
        </Tela>
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

    form {
        display: flex;
        flex-direction: column;
    }

    img {
        width: 80vw;
        height: fit-content;
        margin-top: 20vh;
        margin-bottom: 16vh;
    }

    input {
    width: 80vw;
    height: 8vh;

    border: 1px solid #D4D4D4;
    border-radius: 8px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 10px;
    margin-bottom: 15px;
        ::placeholder {
            color: #7E7E7E;
        }
    }

    button {
    width: 80vw;
    height: 8vh;
    border-radius: 8px;
    border: 1px solid #FF4791;
    background-color: #FF4791;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    }`


const Cadastro = styled.div`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    text-decoration-line: underline;
    color: #FFFFFF;
    margin-top: 30px;
`