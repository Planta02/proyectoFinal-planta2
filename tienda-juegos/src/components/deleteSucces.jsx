import {React} from "react";
import { useNavigate  } from "react-router-dom";
import styled from 'styled-components';


const StyledButton = styled.button`
  display: block;
  background-color: #41d8ec;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const Delete = () =>{
    const navigate = useNavigate();
    const routeChangeAdd = () =>{ 
      let path = `/game/add`; 
      navigate(path);
    }
  
    const routeChangeSearch = () =>{ 
      let path = `/game/search`; 
      navigate(path);
    }

    return (
      <div>
        <h1 align="center">Juego Eliminado Exitosamente</h1>
        <StyledButton onClick={routeChangeAdd}>Agregar un nuevo Juego</StyledButton><br></br>
        <StyledButton onClick={routeChangeSearch}>Ir al listado de Juegos</StyledButton>
      </div>
      )
  }



export default Delete;