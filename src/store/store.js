import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './jounal'

export const store = configureStore({
    reducer: {

        auth: authSlice.reducer,
        journal: journalSlice.reducer,
    
    },
})
