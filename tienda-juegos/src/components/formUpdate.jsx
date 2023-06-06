import {React, useEffect} from "react";
import {useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route, Link, useNavigate, Navigate, useParams, json} from "react-router-dom";
import { Game } from "../store/game";
import styled from 'styled-components';
import './table.css';


const StyledInput = styled.input`
background-color: #eee;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #000000;
  margin: 10px 0 15px 0;
  padding: 18px;
  box-sizing: border-box;
  display: block;
  width: 100%;
`;

const StyledButton = styled.button`
  display: block;
  background-color: #b1afaf;
  color: #000000;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 30px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const Updated = () => {
  const id = useParams("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(() => {
        dispatch(
          Game({
            url: "/",
            method: "GET",
            onSuccess: "game/search"
          })
        );
    }, [dispatch]);

    const routeChangeAdd = () =>{ 
        let path = `/game/add`; 
        navigate(path);
      }

      const routeChangeSearch = () =>{ 
        let path = `/game/search`; 
        navigate(path);
      }

  const juegos = useSelector((state) => state.game.game.juegos);

  const Update = (id, type, price) => {
    let mtype = document.getElementById("type").value;
    let mprice = document.getElementById("price").value;
    if(mtype == ""){
      mtype = type;
    } 
    if(mprice == ''){
      mprice = parseInt(price,10);
    }else{
      mprice = parseInt(mprice,10);
    }
    dispatch(
      Game({
        url: "/",
        method: "PUT",
        data: {
             "id" : id,
             "type" : mtype,
             "price" : mprice
        },
        onSuccess: "game/update/:id"
      })
    );
    navigate("../../game/updateSuccess")
  }
  console.log(id.id);
   return (
     <div className="Updated">
          <h1 align="center"><b>Editar Juegos</b></h1>
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
                <th colSpan="1">Accion</th>
              </tr>
            </thead>
            <tbody>
              {juegos !== undefined ? juegos.map((game) => (
                  game.id == id.id ? 
                  <tr>
                    <td>{game.id}</td>
                    <td>{game.name}</td>
                    <td><StyledInput type="text" id="type" name="type" placeholder={game.type}/></td>
                    <td><StyledInput type="number" id="price" name="price" placeholder={game.price}/></td>
                    <td><StyledButton onClick={()=>Update(game.id, game.type, game.price)}>Actualizar</StyledButton></td>
                  </tr> : ""
              )) : <tr></tr>}
            </tbody>
          </table>
      </div>
      </div>
  );
};



export default Updated;