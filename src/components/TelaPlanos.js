import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import { useContext } from "react";

export default function TelaPlanos() {

    const { token, setToken } = useContext(TokenContext);

    function obtemPlanos() {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const promessa = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);

        promessa.then((response) => console.log(response));
    }

    obtemPlanos();
    

    return (
        <>
        <Tela>
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
`