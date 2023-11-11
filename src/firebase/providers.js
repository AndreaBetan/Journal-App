import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Creación de Proveedor de Autenticación de Google:
// Se crea una instancia de GoogleAuthProvider que se utiliza como proveedor de autenticación al utilizar el método signInWithPopup.
const googleProvider = new GoogleAuthProvider();

// Función para Autenticar con Google
export const singInWithGoogle = async () => {
    try {
        // signInWithPopup es una promesa que te permite autenticar a los usuarios utilizando una ventana emergente y que se resuelve con el resultado de la autenticación
        // GoogleAuthProvider es una clase que representa el proveedor de autenticación de Google.
        const result = await signInWithPopup(FirebaseAuth, googleProvider); // Usa await para esperar la promesa
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
       
        // desestructurar el  result.user
        const { displayName, email, photoURL, uid } = result.user;
        console.log(displayName, email, photoURL, uid);

        return {
            ok: true,   //Para indicar que todo salio bien
            // user info:
            displayName, email, photoURL, uid
        }

    } catch (error) {
        // Manejo de los errores
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }

    }

};

// Fx para registrar al usuario con name, email y password
export const registerUserWithEmailPassword = async({displayName, email, password}) => {
    try {
        // createUserWithEmailAndPassword es una fx al cual se le debe enviar el FirebaseAuth que tiene toda la info de la autenticacion, el email y password
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        console.log(resp)
        // TODO: Actualizar el displayName en Firebase
            // Fx updateProfile actualiza los datos de usuario. Una vez se autentica el usuario, para saber cual es el usuario actual se usa currentUser
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            ok: false,
            errorMessage: error.message
        }
        
    }
}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        // importar signInWithEmailAndPassword de firebase
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        // Si todo sale bien desestructruar de la respuesta uid, photoURL, displayName
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}