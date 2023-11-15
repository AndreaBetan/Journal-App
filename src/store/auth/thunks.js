import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase } from "../../firebase/providers"
import { clearNotesLogout } from "../jounal"
import { checkingCredentials, login, logout } from "./"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        // pasa el status de authSlice a checking
        dispatch(checkingCredentials())
    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingAuthentication())
        // Importar el sistema de autenticacion de Google
        const result = await singInWithGoogle();
        // Si la autenticacion no fue exitosa, entonces logout de lo contrario login
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))
        // console.log(result);
    }
}

export const startCreatingUserWithEmailPassowrd = ({ email, password, displayName }) => {
    return async (dispatch) => {
        // pasa el status de authSlice a checking
        dispatch(checkingCredentials())
        // importar el registerUserWithEmailPassword
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        // Si la respuesta sale mal, se realiza logout de lo contrario login
        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, email, displayName, photoURL }))

        // console.log(resp);
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        // pasa el status de authSlice a checking
        dispatch(checkingCredentials())
        // importar loginWithEmailPassword del firebase
        const result = await loginWithEmailPassword({ email, password })
        // Realizar la evaluacion con la rta: si no es ok logout de lo contrario login
        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }
}