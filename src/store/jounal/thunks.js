import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSavingNote, updateNote } from "./";
import { loadNotes } from "../../helpers";

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

    console.log(noteToFireStore)

  }
}