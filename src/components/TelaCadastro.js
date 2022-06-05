import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function TelaCadastro() {

    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ CPF, setCPF ] = useState('');
    const [ isDisabled, setIsDisabled ] = useState(false);
    const navigate = useNavigate();

    function Cadastrar(event) {

        event.preventDefault();

        setIsDisabled(true);

        let cpfFormatado = CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        
        const corpo = {
            email,
            name: nome,
            cpf: cpfFormatado,
            password,
        };


        let promessa = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", corpo);

        promessa.then((response) => {
            navigate("/");
            }
        );

        promessa.catch(() => {
            setIsDisabled(false);
            alert("Confira os dados inseridos.");
            }
        );
    }


    return (
            <Tela>
                <form onSubmit={Cadastrar}>
                    <input required type="text" disabled={isDisabled} placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    <input required type="number" disabled={isDisabled} placeholder="CPF" value={CPF} onChange={(e) => setCPF(e.target.value)}/>
                    <input required type="email" disabled={isDisabled} placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input required type="password" disabled={isDisabled} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">CADASTRAR</button>
                </form>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Cadastro>Já possui uma conta? Entre</Cadastro>
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
    padding-top: 30vh;

    form {
        display: flex;
        flex-direction: column; 
    }

    img {
        width: 50vw;
        height: fit-content;
        margin-top: 10vh;
        margin-bottom: 8vh;
    }

    input {
    width: 80vw;
    height: 8vh;
    
    border: 1px solid #FFFFFF;
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
    border: 1px solid #52b6ff;
    background-color: #52B6FF;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    }
`

const Cadastro = styled.div`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    margin-top: 30px;
`