import {React, useEffect} from "react";
import {useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route, Link, useNavigate, Navigate, useParams, json} from "react-router-dom";
import { Game } from "../store/game";
import styled from 'styled-components';
import './table.css';

const StyledButton = styled.button`
  display: block;
  background-color: #b1afaf;
  color: #000000;
  font-size: 0.9rem;
  border: 0;
  border-radius: 3px;
  height: 25px;
  padding: 0 15px;
  cursor: pointer;
  box-sizing: border-box;
`;


const Loaded = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const routeChange = (id) =>{ 
    let path = `/game/update/`+id; 
    navigate(path);
  }

  const routeChangeAdd = () =>{ 
    let path = `/game/add`; 
    navigate(path);
  }

  const routeChangeSearch = () =>{ 
    let path = `/game/search`; 
    navigate(path);
  }

    useEffect(() => {
        dispatch(
          Game({
            url: "/",
            method: "GET",
            onSuccess: "game/search"
          })
        );
    }, [dispatch]);

  const juegos = useSelector((state) => state.game.game.juegos);

  const Delete = (name) => {
    dispatch(
      Game({
        url: "/",
        method: "DELETE",
        data: {
          "name": name
        },
        onSuccess: "game/search"
      })
    );
    navigate("../../game/deleteSuccess")
  }

   return (
     <div className="Loaded">
          <h1 align="center"><b>Juegos</b></h1>
          <StyledButton onClick={routeChangeAdd}>Agregar un nuevo Juego</StyledButton><br></br>
          <StyledButton onClick={routeChangeSearch}>Ir al listado de Juegos</StyledButton>
          <div className="container">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th colSpan="2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegos !== undefined ? juegos.map((game) => (
                  <tr>
                    <td>{game.id}</td>
                    <td>{game.name}</td>
                    <td>{game.type}</td>
                    <td>{game.price}</td>
                    <td><StyledButton onClick={()=>routeChange(game.id)}>Actualizar</StyledButton></td>
                    <td><StyledButton onClick={()=>Delete(game.name)}>Eliminar</StyledButton></td>
                  </tr>
              )) : <tr></tr>}
            </tbody>
          </table>
      </div>
      </div>
  );
};


export default Loaded;
