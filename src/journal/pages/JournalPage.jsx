import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout.jsx';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { starNewNote } from "../../store/jounal/thunks.js";

export const JournalPage = () => {
  
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(starNewNote())
  }

  // Desestructuo isSavign para desahbilitar el boton de crear nota cuando se esta guardadno una
  const { isSaving, active } = useSelector( state => state.journal);
  
  return (
      // Para traer el diseño establecidodo en JournalLayout
    <JournalLayout>

      { active ? 
        ( <NoteView/>) :
        // NothingSelectedView: Cuando no hay nada seleccionado muestro este componente
        (<NothingSelectedView/>)
      }

      <IconButton
        onClick={onClickNewNote}
        size='large'
        disabled={ isSaving }
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
    
  )
}
