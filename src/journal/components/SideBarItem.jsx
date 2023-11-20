import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/jounal'

export const SideBarItem = ({title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch()
    const { active:note } = useSelector(state => state.journal)

    const onclickNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
    }

    const newTitle = useMemo( () => {
        // Si el largo del titulo es mayor a 17 caracteres
        return title.length > 17 ?
            // Se mostrara el titulo del caracter 0 al 17 + ...
            title.substring(0,17) + '...'
            // De lo contrario muestra el titulo completo
            : title
    })

    const newBody = useMemo( () => {
        // Si el largo del titulo es mayor a 17 caracteres
        return body.length > 50 ?
            // Se mostrara el titulo del caracter 0 al 17 + ...
            body.substring(0,50) + '...'
            // De lo contrario muestra el titulo completo
            : body
    })

    // const isActive = note && note.id === id; 
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onclickNote }>
                <ListItemIcon>
                    <Checkbox {...label} color="error" />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ newBody } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
