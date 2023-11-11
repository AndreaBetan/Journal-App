import { createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    // Estado inicial dela app
    initialState: {
        status: 'checking',  //Verificar si esta autenticado o no
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null   
    },
    reducers: {
        // Deberia ser (state, action) pero desestructuro el payload de las actions
        login: (state, {payload} ) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoUrl = payload.photoURL;
            state.errorMessage = null;
        },

        logout: (state,  {payload} ) => {
            state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoUrl = null;
            state.errorMessage = payload?.errorMessage;
        },
        // Para manejar el estado cuando la app se encuentre cargando
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } =  authSlice.actions;