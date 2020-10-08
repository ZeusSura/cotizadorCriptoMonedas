import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error  from './Error'
import useMoneda from "../Hooks/useMoneda";
import useCriptoMoneda from "../Hooks/useCriptoMoneda";
const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #325ac0;
    cursor: pointer;
  }
`;

const Formulario = ({setCripto,setMoneda}) => {
  const [listacripto, setListaCripto] = useState([]);
  const [error, setError] = useState(false);
  const MONEDAS = [
    { value: "USD", nombre: "Dolar" },
    { value: "MXN", nombre: "Peso Mexicano" },
    { value: "EUR", nombre: "Euro" },
    { value: "GBP", nombre: "Libra esterlina" },
  ];
  const [moneda,Seleccionar] = useMoneda(
    "Elige tu moneda",
    "",
    MONEDAS
  );
  const [criptMoneda,SelectCripto] = useCriptoMoneda(
    "Elige tu cripto moneda",
    "",
    listacripto
  );

  //Ejecutar llamado a la api

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const body = await response.json();
      setListaCripto(body.Data);
    };
    consultarAPI();
  }, []);
  //Evento submit
  const cotizarMoneda = (e) => {
    e.preventDefault();
    if(moneda===''||criptMoneda==='')
    {
      return setError(true)
    }
    setError(false)
    setMoneda(moneda)
    setCripto(criptMoneda)
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error?<Error
      mensaje='Todos los campos son obligatorios'
      />:null}
      <Seleccionar />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
