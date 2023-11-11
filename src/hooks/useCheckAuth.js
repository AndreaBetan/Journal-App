import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";


export const useCheckAuth = () => {

    const { status } = useSelector(status => status.auth);
    // useDispatch proporciona acceso al despachador de acciones Redux.
    const dispatch = useDispatch();

    // Se ejecutara cuando el componente se monte por primera vez debido al arreglo de dependencias vacío []
    useEffect(() => {
        // onAuthStateChanged: Observador de cambios en el estado de autenticación del usuario
        // Esta fx se utiliza para observar los cambios en el estado de autenticación del usuario. Cuando el estado de autenticación cambia (por ejemplo, cuando un usuario inicia sesión o cierra sesión), la función que le pasas como segundo argumento (users) se ejecutará.
        onAuthStateChanged(FirebaseAuth, async (user) => {
            // Si no hay un usuario autenticado logout de lo contrario:
                // Desestructuro el user y dispatch a login
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        })
    }, [])


    return status;
    // Al retornar status puedo asignar el useCheckAuth directamente a una variable: const status = useCheckAuth();
    
};
