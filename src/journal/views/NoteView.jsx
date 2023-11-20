import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/jounal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from 'react';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toDateString();
    })

    const fileInputRef = useRef();

    useEffect(() => {
        // Al pasarle las propiedades del formulario al setActiveNote cada que se realice un cambio en la nota esta estara activa
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        // Si hay un mensaje guardado
        if (messageSaved.length > 0) {
            // Genera la alerta
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const onFileInputChange = ({ target }) => {
        if ( target.file === 0 ) return 
        dispatch( startUploadingFiles(target.files) )
        console.log(target.files)
    }

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid
            container direction="row"
            justifyContent='space-between'
            sx={{ m: 1, backgroundColor: 'primary.main' }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography sx={{ m: 2}} fontWeight='light' variant="h4">Date: {dateString}</Typography>
            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    // Para que el icono no se vea, pero es necesario tener el input porque de ahi selecciono las imgs
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="error"
                    disabled={ isSaving }
                    // Con esta fx simulo que estoy seleccionando las imagenes con un click
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color="error"
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving}
                    
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="outlined"
                    color="error"
                    fullWidth
                    placeholder="Write a title"
                    label="Title"
                    sx={{ m: 2 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="outlined"
                    color="error"
                    sx={{ m: 2 }}
                    fullWidth
                    multiline
                    placeholder="¿What happen today?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* Galetia de imagenes */}
            <ImageGallery sx={{ m: 2 }} images={ note.imageUrls } />

        </Grid>
    )
}
