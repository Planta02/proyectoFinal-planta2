import {configureStore } from '@reduxjs/toolkit';
import gameSlice from './game'
import api from "./middleware/api";


export const store = configureStore({
    reducer:{
        game: gameSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
})