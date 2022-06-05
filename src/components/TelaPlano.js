import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "../contexts/TokenContext";
import DadosLoginContext from "../contexts/DadosLoginContext";
import DadosAssinaturaContext from "../contexts/DadosAssinaturaContext";

import seta from "../images/seta.png";
import prancheta from "../images/prancheta.png";
import nota from "../images/nota.png";
import fechar from "../images/fechar.png";

export default function TelaPlano() {
    
    const navigate = useNavigate();
    const { setDadosAssinatura } = useContext(DadosAssinaturaContext);
    const { token } = useContext(TokenContext);
    const { idDoPlano } = useParams();
    const [ dados, setDados ] = useState([]);
    const [ beneficios, setBeneficios ] = useState([]);
    const [ preco, setPreco ] = useState('');
    const [ nomeCartao, setNomeCartao ] = useState('');
    const [ digitosCartao, setDigitosCartao ] = useState('');
    const [ codigoCartao, setCodigoCartao ] = useState('');
    const [ validadeCartao, setValidadeCartao ] = useState('');
    const [ popupLigado, setPopupLigado ] = useState(false);
    
    useEffect(() => {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idDoPlano}`, config);

        promessa.then(resposta => {setDados(resposta.data)
                                    setBeneficios(resposta.data.perks)
                                    setPreco(resposta.data.price)});
    }, []);

    function enviarPedidoAssinatura() {

        setPopupLigado(false); 

        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let corpo = {
            membershipId: Number(idDoPlano),
            cardName: nomeCartao,
            cardNumber: digitosCartao,
            securityNumber: Number(codigoCartao),
            expirationDate: validadeCartao
        }

        const promessa = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", corpo, config);

        promessa.then((response) => {
            setDadosAssinatura(response.data.membership);
            navigate("/home");
        });

        promessa.catch(() => alert("Confira os dados inseridos."))
    }

    return (
        <Tela>
            <Link to="/subscriptions">
                <Seta>
                    <img src={seta} />
                </Seta>
            </Link>
            <Logo>
                <img src={dados.image} />
                <h1>{dados.name}</h1>
            </Logo>
            <Informacoes>
                <TituloSecao>
                    <img src={prancheta} />
                    <h1>Benefícios:</h1>
                </TituloSecao>
                <ol>
                    {beneficios.length === 0 ? "" : beneficios.map((beneficio, index) => <li key={index}>{beneficio.title}</li>)}
                </ol>
                <TituloSecao>
                    <img src={nota} />
                    <h1>Preço:</h1>
                </TituloSecao>
                <h1>R$ {preco.replace(".", ",")} cobrados mensalmente</h1>
            </Informacoes>
            <DadosDoCartao>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setPopupLigado(true);}}>
                    <input required placeholder="Nome impresso no cartão" onChange={(e) => setNomeCartao(e.target.value)}/>
                    <input required placeholder="Dígitos do cartão" onChange={(e) => setDigitosCartao(e.target.value)}/>
                    <InputsMenores>
                        <input required placeholder="Código de segurança" onChange={(e) => setCodigoCartao(e.target.value)}/>
                        <input required placeholder="Validade" onChange={(e) => setValidadeCartao(e.target.value)}/>
                    </InputsMenores>
                    <button type="submit">ASSINAR</button>
                </form>
            </DadosDoCartao>
            <Popup popupLigado={popupLigado}>
                <img src={fechar} onClick={() => setPopupLigado(false)} />
                <InformacoesPopup>
                    <h1>Tem certeza que deseja assinar o plano {dados.name} (R${preco.replace(".", ",")})?</h1>
                    <Botoes>
                        <BotaoNao onClick={() => setPopupLigado(false)}>Não</BotaoNao>
                        <BotaoSim onClick={() => enviarPedidoAssinatura()}>SIM</BotaoSim>
                    </Botoes>
                </InformacoesPopup>
            </Popup>
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

    h1 {
        font-family: 'Roboto';
        font-size: 32px;
        color: #FFFFFF;
        margin: 0;
    }
`

const Seta = styled.div`
    width: 90vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Logo = styled.div`
    height: 30vh;
    width: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
        font-family: 'Roboto';
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
        margin-top: 20px;
    }
`

const Informacoes = styled.div`
    width: 80vw;
    height: 30vw;

    color: #FFFFFF;

    font-family: 'Roboto';
    font-size: 14px;
    margin-bottom: 5vh;

    h1 {
        font-family: 'Roboto';
        font-size: 14px; 
    }

    ol {
        color: #FFFFFF;
        padding-left: 20px;
        margin-bottom: 15px;
    }

    li {
        color: #FFFFFF;
    }
`

const TituloSecao = styled.div`

    height: fit-content;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;

    margin-bottom: 10px;

    h1 {
        font-family: 'Roboto';
        font-size: 16px;
        color: #FFFFFF;
        padding-left: 5px;
    }

    img {
        width: 12px;
        height: 16px;
    }
`

const DadosDoCartao = styled.div`
    width: 80vw;
    height: fit-content;
    

    input {
        width: 80vw;
        height: 7vh;
        background-color: #FFFFFF;
        margin-bottom: 6px;

        border-radius: 8px;
        border: 1px solid #FFFFFF;

        ::placeholder{
            font-family: 'Roboto';
            font-size: 14px;
            color: #7E7E7E;
            padding-left: 5px;
        }
    }

    button {
        width: 82vw;
        height: 7vh;
        background-color: #FF4791;
        margin-bottom: 6px;

        border-radius: 8px;
        border: 1px solid #FF4791;

        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 700;
        color: #FFFFFF;
    }
`

const InputsMenores = styled.div`
    input {
        width: 38vw;
        height: 7vh;
        background-color: #FFFFFF;
        margin-bottom: 6px;

        border-radius: 8px;
        border: 1px solid #FFFFFF;
        

        ::placeholder{
            font-family: 'Roboto';
            font-size: 14px;
            color: #7E7E7E;
            padding-left: 5px;
        }
    }
    width: 82vw;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Popup = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: ${(props) => props.popupLigado ? "1" : "-1"};
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    img {
        width: 28px;
        height: 25px;
        margin-left: 80vw;
        margin-top: 3vh;
    }
`

const InformacoesPopup = styled.div`
    width: 70vw;
    height: 30vh;
    background-color: white;

    border-radius: 12px;
    margin-bottom: 40vh;

    h1 {
        font-size: 18px;
        font-weight: 700;
        color: #000000;
        font-family: 'Roboto';
        margin: 10% 10%;
        text-align: center;
    }
`;

const Botoes = styled.div`
    width: 70vw;
    height: 10vh;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const BotaoNao = styled.div`
    width: 30vw;
    height: 10vh;

    border-radius: 8px;

    background-color: #CECECE;

    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: center;
`

const BotaoSim = styled.div`
    width: 30vw;
    height: 10vh;

    border-radius: 8px;

    background-color: #FF4791;

    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: center;
`