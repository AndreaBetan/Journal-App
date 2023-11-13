import { createSlice} from '@reduxjs/toolkit';

export const  journalSlice = createSlice({
    name: 'journal',
    initialState: {
        // Para ver si estoy guardando la nota
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null
        // ASI ES COMO VA A LUCIR UNA NOTA ACTIVA:
        // active: {
        //     id: '',
        //     title: '',
        //     body: '',
        //     imageUrl: []
        // }
    },
    reducers: {
        // Se converte en true cuando se esta guardando
        savingNewNote: (state ) => {
            state.isSaving = true;
        },
        // Agregar una nueva nota
        addNewEmptyNote: (state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        //Elegir la nota activa
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        // Cargal las notas
        setNote: (state, action) => {
        
        },
        //Cuando se esta Grabando las notas
        setSavingNote: (state) => {
        
        },
        // Actualizar una nota
        updateNote: (state, action) => {
        
        },
        // Eliminar nota
        deleteNoteById: (state, action) => {
        
        },

    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNote, setSavingNote, updateNote, deleteNoteById, savingNewNote  } =   journalSlice.actions;