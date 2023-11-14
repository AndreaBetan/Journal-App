import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/jounal'

export const SideBarItem = ({title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch()

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


    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onclickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
