import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const crudGame = createAsyncThunk('game/index', async(games)=>{
    return games;
})


let gameSlice = createSlice({
    name: 'game',
    initialState:{
        game:null,
        status:''
    },
    reducers:{
        Game: (state, action) =>{
            state.game=action.payload;
        },
        Success: (state, action) =>{
            state.game=action.payload;
        },
        Failed: (state, action) =>{
            state.game=action.payload;
        },
    },
    extraReducers:{
        [crudGame.pending]: (state, action)=>{
            state.status = 'loading...'
        },
        [crudGame.fulfilled]: (state,action)=>{
            state.game = action.payload;
        },
        [crudGame.rejected]:(state, action) => {
            state.status = 'Fallo'
        }
      
    }
});

export const {Game, Success, Failed}=gameSlice.actions;

export default gameSlice.reducer;