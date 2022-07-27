import { validar, habilitarBotonSubmit } from "./validaciones.js";

const inputs_contacto = document.querySelectorAll(".input-contacto");
const boton_enviar_contacto = document.querySelector("[data-submit-contacto]");


// validacion de formularios de contacto 

export const addEventToInputsContacto = (inputs, boton_enviar) => {

    inputs.forEach((input) => {

        input.addEventListener("blur", (input) => {
            validar(input.target)
        });

        input.addEventListener("keyup", (input) => {    // comprueba despues de ingresar un caracter del teclado

            // if ( tipoDeInput == "nombre"){        // comprueba solo el campo data-tipo="nombre" en cada ingreso de teclado
            //       validar(input.target);
            // }   
            validar(input.target);
            //habilitarBotonSubmit(inputs_contacto, boton_enviar_contacto);
        });
    });

    boton_enviar.addEventListener("click", () => {
        inputs.forEach((input) => {
            validar(input);
        });
    });
}

addEventToInputsContacto(inputs_contacto, boton_enviar_contacto);


