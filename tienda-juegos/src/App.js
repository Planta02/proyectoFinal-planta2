import {React, useEffect} from "react";
import AddEd from "./components/formAdd";
import Updated from "./components/formUpdate";
import Loaded from './components/search';
import Success from "./components/addSuccess";
import Update from "./components/updateSuccess";
import Delete from "./components/deleteSucces";
import {BrowserRouter, Routes, Route, Link, useNavigate, Navigate, useParams, json} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store";



let Error404 = () =>{
  return(
    <>
      <h1 align="center">Esta pagina no existe - 404</h1>
      <Link to="/game/add">Regresar al home</Link>
    </>
  )
}

let NotImplemented = () =>{
  return (
    <div>
      <h1>Esta pagina no esta lista</h1>
      <Link to="/">Ir al inicio</Link>
    </div>
    )
}



let Failed = (msg) =>{
  return (
    <div>
      <h1>Error al guardar el Juego {{msg}}</h1>
      <Link to="/game/add">Agregar un nuevo Juego</Link>
      <Link to="/game/search">Ir al listado de Juegos</Link>
    </div>
    )
}

let Principal = () =>{
  return <h1>Probando Principal</h1>
}



function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/"/>
          <Route path="game">
            <Route path="search" element={<Loaded/>} />
            <Route path="add" element={ <AddEd/> }/>
            <Route path="update/:id" element={<Updated/>}/>           
            <Route path="delete" element={<NotImplemented/>} />
            <Route path="addSuccess" element={<Success/>} />
            <Route path="deleteSuccess" element={<Delete/>} />
            <Route path="addFailed" element={<Failed/>} />
            <Route path="updateSuccess" element={<Update/>} />
          </Route>
          
          <Route path="*" element={<Error404/>} />

        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
