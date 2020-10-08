import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";
import axios from "axios";
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, setMoneda] = useState("");
  const [cripto, setCripto] = useState("");
  const [resultado, setResultado] = useState({});
  const [cotizacion, setCotizacion] = useState(false);
  const [cargando,setCargando] = useState(false)

  useEffect(() => {
    if (moneda === "") return;

    const cotizar = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const response = await axios.get(url);
      setCargando(true)
      setCotizacion(false)
      setTimeout(() => {
        setResultado(response.data.DISPLAY[cripto][moneda]);
        setCotizacion(true);
        setCargando(false)
      }, 3000);
    };
    cotizar();
  }, [moneda, cripto]);
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen criptop" />
      </div>
      <div>
        <Heading>cotizador de cripto monedas al instante</Heading>
        <Formulario setCripto={setCripto} setMoneda={setMoneda} />
        {cotizacion ? <Cotizacion resultado={resultado} /> : cargando?<Spinner/>:null }
      </div>
    </Contenedor>
  );
}
export default App;
