import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'

import { ImageGalery } from '../components'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, startSaveNote } from '../../store/jounal'



export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note} = useSelector( state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo( () => {
        const newDate = new Date(date)
        return newDate.toUTCString();
    })

    useEffect( () =>{
        // Al pasarle las propiedades del formulario al setActiveNote cada que se realice un cambio en la nota esta estara activa
        dispatch( setActiveNote(formState) )
    },[formState])

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    return (
        <Grid
            container direction="row"
            justifyContent='space-between'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid item>
                <Button 
                    color="secondary" 
                    sx={{ padding: 2 }}
                    onClick={ onSaveNote }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Write a title"
                    label="Title"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿What happen today?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            {/* Galetia de imagenes */}

            <ImageGalery />

        </Grid>
    )
}
