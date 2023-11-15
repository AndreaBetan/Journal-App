import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGalery } from '../components';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/jounal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from 'react';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString();
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

    return (
        <Grid
            container direction="row"
            justifyContent='space-between'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
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
                    color="secondary"
                    disabled={ isSaving }
                    // Con esta fx simulo que estoy seleccionando las imagenes con un click
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    color="secondary"
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

            <ImageGalery images={ note.imageUrls } />

        </Grid>
    )
}
