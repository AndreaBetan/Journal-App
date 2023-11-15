import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSavingNote, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const starNewNote = () => {

  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    //Obtener el uid del estado de la app por medio del getState().auth
    const { uid } = getState().auth

    console.log(getState());
    console.log('starNewNote');

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime()
    }

    // Establecer el lugar donde voy a guardar la newNote
    // doc y colleccion son parametros de firebase y FirebaseDB es donde se encuentra configurada la base de datos de mi app
    // Establecer adicionalmente, la ruta de la base de datos donde ira la newNote
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    // Establecer el documento donde se va a alojar y la nueva nota
    const setDocResp = await setDoc(newDoc, newNote);

    //TODO: Importante verificar en Firebase las reglas, debe estar allow read, write: if request.auth != null;

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))

  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch( setSavingNote() );

    const { uid } = getState().auth;
    // Traer la nota activa
    const { active:note } = getState().journal;

    // La nota activa trae el id, el cual requiere ser borrado para guardar
    const noteToFireStore = { ...note };
    // Elimina el id de la nota
    delete noteToFireStore.id;

    // Establecer la ruta del documento donde de va a almacernar
    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
    await setDoc( docRef, noteToFireStore, { merge: true });
    // Actualizar la nota
    dispatch( updateNote( note ) );
  }
}

export const startUploadingFiles = ( files = [] ) => {
  return async( dispatch ) => {
      dispatch( setSavingNote() );
      
      // Asi cargaria solo una imagen:
        // await fileUpload( files[0] );

      // Para realizar carga de miltiples imagenes
      const fileUploadPromises = [];
      // Creo un arreglo de promesas
      for ( const file of files ) {
           fileUploadPromises.push( fileUpload( file ) )
      }

      const photosUrls = await Promise.all( fileUploadPromises );
      
      dispatch( setPhotosToActiveNote( photosUrls ));
  }
}

export const startDeletingNote = ( ) => {
  return async( dispatch, getState ) => {
    
    const { uid } = getState().auth;
    const { active:note } = getState().journal;
    // Establecer la ruta para eliminar la nota de Firbase
    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
    await deleteDoc(docRef)

    dispatch( deleteNoteById(note.id) )


    console.log({uid})
    console.log({note})
  }
}