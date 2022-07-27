import { validar } from "./validaciones.js";
import { addEventToInputsContacto } from "./script.js";
import { darFormatoMoneda } from "../../controllers/funciones.controller.js";

const inputs_contacto = document.querySelectorAll(".input-contacto");
const boton_enviar_contacto = document.querySelector("[data-submit-contacto]");

const inputImagen = document.querySelector("[data-input-imagen]");
const boton_subir_img = document.querySelector("#boton-subir-img");

const inputs_producto = document.querySelectorAll(".agregar-producto__input");



// validacion de formulario de agregar producto
inputs_producto.forEach((input) => {

    input.addEventListener("blur", (input) => {
        if (input.target.dataset.tipo !== "imagen") {
            validar(input.target);
        }
    });


    input.addEventListener("keyup", (input) => {    // comprueba despues de ingresar un caracter del teclado

        if (input.target.dataset.tipo == "precio") {        // comprueba solo el campo data-tipo="precio" en cada ingreso de teclado
            darFormatoMoneda(input.target);
        }
        validar(input.target);

    });

});



/////////////////// mostrar imagen en box-image
inputImagen.addEventListener("input", (event) => {

    // si se elige un archivo se carga y valida el archivo de imagen
    if (event.target.files.length > 0) {
        
        cargarImagen(event);
        validar(inputImagen);
    }
});


function cargarImagen(evento) {
    
    let file = evento.target.files[0];
    
    let reader = new FileReader();
    let img = document.querySelector("#imagen-cargada");
    reader.onload = function (event) {
        img.classList.add("box-image__imagen-cargada--visible");
        let imagen = event.target.result;
        img.src = imagen;
        let fondo = document.querySelector("#fondo");
        fondo.classList.add("box-image__imagen-fondo--invisible");
    }

    // si existe un archivo y es una imagen
    if (file && file.type.match('image')) {
        reader.readAsDataURL(file);
    } else {
        
        //  si se carga un archivo y no es una imagen se borra al anteriormente cargada( si se habia cargado una antes) para mostrar el mensaje de error
        if (file !== undefined) {
            img.classList.remove("box-image__imagen-cargada--visible");
            img.src = "";
        }
    }
};


boton_subir_img.addEventListener("click", (event) => {
    event.preventDefault();
    inputImagen.click();
});


// validacion de formulario de contacto

addEventToInputsContacto(inputs_contacto, boton_enviar_contacto);


