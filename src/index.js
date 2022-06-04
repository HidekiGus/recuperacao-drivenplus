import "./reset.css";

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import style from "styled-components";
import TelaLogin from "./components/TelaLogin";
import TelaCadastro from "./components/TelaCadastro";
import TelaHome from "./components/TelaHome";
import TelaPlanos from "./components/TelaPlanos";
import TelaPlano from "./components/TelaPlano";

import TokenContext from "./contexts/TokenContext";
import DadosLoginContext from "./contexts/DadosLoginContext";

export default function App() {

    const [ token, setToken ] = useState('');
    const [ dadosLogin, setDadosLogin ] = useState([]);

    return(
        <>
        <TokenContext.Provider value={{ token, setToken }}>
            <DadosLoginContext.Provider value={{ dadosLogin, setDadosLogin }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaLogin />} />
                        <Route path="/sign-up" element={<TelaCadastro />} />
                        <Route path="/subscriptions" element={<TelaPlanos />} />
                        <Route path="/subscriptions/:idDoPlano" element={<TelaPlano />} />
                        <Route path="/home" element={<TelaHome />} />
                    </Routes>
                </BrowserRouter>
            </DadosLoginContext.Provider>
        </TokenContext.Provider>
        </>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));