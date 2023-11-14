import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
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
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        // Agregar una nueva nota
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        //Elegir la nota activa
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        // Cargal las notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        //Cuando se esta Grabando las notas
        setSavingNote: (state) => {
            state.isSaving = true;

        },
        // Actualizar una nota
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                // El payload.id de la ax es la nota actualizada
                if (note.id == action.payload.id) {
                    // retorna la nota actualizada
                    return action.payload
                }
                return note;
            });     
        },
        // Eliminar nota
        deleteNoteById: (state, action) => {

        },

    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSavingNote,
    updateNote,
    deleteNoteById,
    savingNewNote
} = journalSlice.actions;