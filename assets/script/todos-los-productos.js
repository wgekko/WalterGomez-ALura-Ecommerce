import { validar, habilitarBotonSubmit } from "./validaciones.js";
import { addEventToInputsContacto } from "./script.js";

const boton_agregar_producto = document.querySelector("#boton-agregar-producto");

const inputs_contacto = document.querySelectorAll(".input-contacto");
const boton_enviar_contacto = document.querySelector("[data-submit-contacto]");

// validacion de formulario de contacto

addEventToInputsContacto(inputs_contacto, boton_enviar_contacto);

