import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    // formState: Almacena el estado actual del formulario.
    const [ formState, setFormState ] = useState( initialForm );
    // almacena los resultados de la validación de los campos del formulario, lo cual cambiaria el estado de la app por lo cual se usa useState
    const [ formValidation, setFormValidation ] = useState({});

    // Cada que cambien los valores del formulario se ejecutara el createValidators para realizar las validaciones
    useEffect(() => {
        createValidators();
    }, [ formState ])

    // Cuando el initialForm cambia, se desencadene este efecto
    useEffect(() => {
        setFormState(initialForm)
    }, [ initialForm ])
    
    // isFormValid es una variable de estado computada que indica si el formulario es válido. 
        // Utiliza la función useMemo para memorizar el valor que retorna la fx. 
    const isFormValid = useMemo( () => {
        // Itera sobre las validaciones almacenadas en formValidation
        for (const formValue of Object.keys(formValidation)) {
            // devuelve false si el valor del mensaje es diferente de null de lo contrario true. 
                // Como el mensaje de error solo se genera si las validaciones son incorrectas, al estar en false indica que no hay error en el diligenciamiento del formulario y se puede almacenar
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
        // Esta fx solo se procesara cada que cambie la validacion del formulario
    }, [ formValidation ])

    // Función que se utiliza para manejar eventos de cambio en los campos del formulario. Actualiza el estado del formulario (formState) con el nuevo valor del campo.
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    // Función que restablece el estado del formulario a su estado inicial (initialForm).
    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        
        const formCheckedValues = {};   //Aqui almacenare la informacion resultante del for..of
        // Este bucle for...of itera sobre las claves del objeto formValidation. 
            // Object.keys(formValidation) devuelve un array con las claves del objeto, que son los nombres de los campos del formulario
        for (const formField of Object.keys( formValidations )) {
            // Se desestructura la funcion y el mensaje de formValidations y se verifica para cada campo si cumple con la validación a traves del formField. 
            const [ fn, errorMessage ] = formValidations[formField];
            //Crear una nueva propiedad computada que permite crear las validaciones (isFormValid, displayNameValid...etc) asi: [`${ formField }Valid`]
                //Si la condicion formState[formField] se cumple (es decir si se cumple con todas las validados por el formulario iterado), el campo es considerado válido (null); de lo contrario, se establece el mensaje de error de validación (errorMessage).
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}