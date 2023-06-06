import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { validatorPrecio } from "./vlidators";
import styled, { createGlobalStyle, css } from 'styled-components';
import { Game } from '../store/game';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background:  linear-gradient(to bottom, #22c1c3, #5efd2d);
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

const SharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${SharedStyles}
`;

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${SharedStyles}
`;
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

const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;

  legend {
    padding: 0 10px;
  }

  label {
    padding-right: 20px;
  }

  input {
    margin-right: 10px;
  }
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;



const AddEd = () => {
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, formState:{errors}, handleSubmit } = useForm();

    const onSubmit = (data) =>{
      dispatch(
          Game({
          data:data,
          method:"POST"
        })
      );
      navigate('/game/addSuccess');
    }
    return (
        <>
            <GlobalStyle/>
            <StyledFormWrapper>
                <StyledForm method='post' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Agregar Juego</h1>
                    <label htmlFor="name">Nombre del Juego</label>
                    <StyledInput type="text" name="name"{...register('name', {
                    required : true,
                    minLength : 5,
                    maxLength : 25
                })}/>
                    <label htmlFor="type">Tipo de Juego</label>
                    <StyledInput type="text" name="type"{...register('type', {
                    required : true,
                    maxLength : 20
                })}/>
                    <label htmlFor="price">Precio</label>
                    <StyledInput type="number" name="price"{...register('price', {
                        valueAsNumber: true,
                        required : true,
                        minLength : 5,
                        validate : validatorPrecio
                      }
                    )}/>
                    <StyledError>
                      {errors.name?.type === 'required' && <p>El campo "Nombre de Juego" es requerido</p>}
                      {errors.name?.type === 'minLength' && <p>El nombre de juego no cumple con el minimo de caracteres</p>}
                      {errors.name?.type === 'maxLength' && <p>El nombre de juego supera el limite de caracteres</p>}
                      {errors.type?.type === 'required' && <p>El campo "Tipo de Juego" es requerido</p>}
                      {errors.price?.type === 'required' && <p>El campo "Precio" es requerido</p>}
                      {errors.price?.type === 'minLength' && <p>No cumple con el precio minimo</p>}
                      {errors.price?.type === 'validate' && <p>El precio debe ser mayor a 0</p>}
                      </StyledError>
                    <StyledButton type="submit">Guardar</StyledButton>
                </StyledForm>
            </StyledFormWrapper>
        </>

    );
}


export default AddEd;