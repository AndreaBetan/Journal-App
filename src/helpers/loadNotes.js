import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid= '') => {
  
  if (!uid) throw new Error('El UID del usuario no existe');

  // Por medio de collection se llega a la base de datos y a la ruta donde se encuentran alamacenadas las notas
  const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
  // Aqui se extrae toda la referencia de las notas, la informacion de las notas que requiero esta en docs.data
  const docs = await getDocs(collectionRef);

  const notes = []
  docs.forEach(doc => {
    // docs.data trae la info sin el uid, por ende se trae doc.uid y todo lo que se encuentra en doc.data
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
}
