import "./reset.css";

import ReactDOM from "react-dom";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from "./components/TelaLogin";
import TelaCadastro from "./components/TelaCadastro";
import TelaHome from "./components/TelaHome";
import TelaPlanos from "./components/TelaPlanos";
import TelaPlano from "./components/TelaPlano";

import TokenContext from "./contexts/TokenContext";
import DadosLoginContext from "./contexts/DadosLoginContext";
import NomeUsuarioContext from "./contexts/DadosAssinaturaContext";

export default function App() {

    const [ token, setToken ] = useState('');
    const [ dadosLogin, setDadosLogin ] = useState('');
    const [ dadosAssinatura, setDadosAssinatura ] = useState('');

    return(
        <>
        <TokenContext.Provider value={{ token, setToken }}>
            <DadosLoginContext.Provider value={{ dadosLogin, setDadosLogin }}>
                <NomeUsuarioContext.Provider value={{ dadosAssinatura, setDadosAssinatura }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<TelaLogin />} />
                            <Route path="/sign-up" element={<TelaCadastro />} />
                            <Route path="/subscriptions" element={<TelaPlanos />} />
                            <Route path="/subscriptions/:idDoPlano" element={<TelaPlano />} />
                            <Route path="/home" element={<TelaHome />} />
                        </Routes>
                    </BrowserRouter>
                </NomeUsuarioContext.Provider>
            </DadosLoginContext.Provider>
        </TokenContext.Provider>
        </>
    );
}

ReactDOM.render(<App />, document.querySelector(".root"));