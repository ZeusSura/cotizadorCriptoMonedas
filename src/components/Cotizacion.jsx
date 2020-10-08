import React from "react";
import styled from "@emotion/styled";

const ResultadoDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;
const Precio = styled.p`
  font-size: 30px;
`;

const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;
const Cotizacion = ({ resultado }) => {
  return (
    <ResultadoDiv>
      <Precio>
        El precio es: <span>{resultado.PRICE}</span>
      </Precio>
      <Info>
        Precio más alto del día: <span>{resultado.HIGHDAY}</span>
      </Info>
      <Info>
        Precio más bajo del día: <span>{resultado.LOWDAY}</span>
      </Info>
      <Info>
        Variación ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        última Actualización: <span>{resultado.LASTUPDATE}</span>
      </Info>
    </ResultadoDiv>
  );
};

export default Cotizacion;
