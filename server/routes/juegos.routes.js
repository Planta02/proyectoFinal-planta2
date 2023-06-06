const { Router }= require('express');

const {agregarJuego, visualizarJuego, editarJuego, eliminarJuego} = require('../controllers/juegos.controllers');

const routerJuego = Router();

routerJuego.post('/', agregarJuego)
routerJuego.get('/', visualizarJuego)
routerJuego.put('/', editarJuego)
routerJuego.delete('/', eliminarJuego)

module.exports = routerJuego;