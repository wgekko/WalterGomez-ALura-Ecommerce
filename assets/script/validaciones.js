

export const validar = (input) => {

    const tipoDeInput = (input.dataset.tipo);

    // para que input.validity.valid sea true (input.validity.valid=true) hay que setear setCustomValidity("")
    // con string vacío ""      

    if (validadores[tipoDeInput]) {        //  validador usando validadores personalizados junto con setCustomValidity().
        validadores[tipoDeInput](input);   //   si setCustomValidity("") manda algun string porque existe un error
    }                                       // input.validity.valid va a ser FALSE, hasta que se arregle el error 

    if (input.validity.valid) {

        input.parentElement.querySelector(".message-error").innerHTML = "";
        input.parentElement.classList.remove("input__invalid");

    } else {

        input.parentElement.classList.add("input__invalid");
        let mensajeDeError = mostrarMensajeDeError(input, tipoDeInput);  // => validador usando mensajes personalizados
        input.parentElement.querySelector(".message-error").innerHTML = mensajeDeError;

    }
}

// validacion del formulario completo, se habilita si todos los campos estan llenos 
// aunque no sean correctos.
export const habilitarBotonSubmit = (inputs, boton_submit) => {
    // const boton_submit = document.querySelector("[data-submit-contacto]");

    let esValido = true;
    let i = 0;
    while ((esValido) && (i < inputs.length)) {
        if (inputs[i].validity.valueMissing) {
            esValido = false;
        }
        i++;
    }

    if (esValido) {
        boton_submit.classList.add("form__boton-enviar--enabled");
        boton_submit.disabled = false;
    } else {
        boton_submit.classList.remove("form__boton-enviar--enabled");
        boton_submit.disabled = true;
    }
}

export const formularioValido = (inputs) => {
    let esValido = true;
    inputs.forEach((input) => {
        if (input.validity.valid == false) {
            esValido = false;
        }
    });
    return esValido;
}

const validadores = {
    nombre: (input) => validarNombre(input),        // para cada tipo de input (data-tipo-nombre por ejemplo)
    email: (input) => validarEmail(input),          // existe una llave del objeto validadores para que se ejecute
    asunto: (input) => validarAsunto(input),        // el validador correspondiente.
    mensaje: (input) => validarMensaje(input),
    password: (input) => validarPassword(input),
    precio: (input) => validarPrecio(input),
    descripcion: (input) => validarDescripcion(input),
    imagen: (input) => validarImagen(input)
}


//  estos validadores muestran un mensaje de error personalizado en el TOOLTIP del navegador

const validarImagen = (input) => {
    let mensaje = "";
    let imagen = input.value;

    // veirficar que sea un archivo .jpg o .jpeg
    //ej perrito.jpg

    let texto = imagen;

    if (texto == "") {
        mensaje = "Seleccione una imagen para el producto."
    } else {

        let extensiones = [".jpg", ".jpeg", ".png"];
        let esArchivoDeImagen = false;

        extensiones.forEach((extension) => {
            if (texto.endsWith(extension)) {
                esArchivoDeImagen = true;
            }
        });
        //console.log("esArchivoDeImagen ? : ", esArchivoDeImagen);
        if (!esArchivoDeImagen) {
            mensaje = "Este no es un archivo de imagen."
        }
    }

    input.setCustomValidity(mensaje);
}

const validarDescripcion = (input) => {
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 10) {
        mensaje = "La descripcion tiene que tener al menos 10 caracteres."
    } else {
        if (texto.length > 500) {
            mensaje = "La descripcion tiene que tener menos de 500 caracteres."
        }
    }
    input.setCustomValidity(mensaje);
}

const validarPrecio = (input) => {
    //  para que input.checkValidity() no arroje un false y compruebe si es valido
    //  el campo primero hay que setear el setCustomValidity("") en vacío, string vacío.                 
    let mensaje = "";
    let st = input.value;

    //console.log("validarPrecio: ", numero);
    let regEx = /^\$(\d{1,3}(\.\d{3})+|(\d+))(\,\d{2})?$/;

    if (regEx.test(st) == false) {
        mensaje = "El formato de precio es incorrecto";
    }

    let n = st.replace(/[\$\.]/g, "");      // elimina los signos $ y .   

    n = n.replace(/[\,]+/g, ".");      // cambia la coma por el punto para convertir el numero en numero flotante        
    n = parseFloat(n);

    if (n == 0) {
        mensaje = "El precio tiene que ser mayor que cero $0.00."
    }
    input.setCustomValidity(mensaje);
}


const validarNombre = (input) => {
    //  para que input.checkValidity() no arroje un false y compruebe si es valido
    //  el campo primero hay que setear el setCustomValidity("") en vacío, string vacío.                 
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 3) {
        mensaje = "El nombre tiene que tener al menos 3 caracteres."
    } else {
        if (texto.length > 50) {
            mensaje = "El nombre tiene que tener menos de 50 caracteres."
        }
    }
    input.setCustomValidity(mensaje);
}

const validarEmail = (input) => {
    const regEx = /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/;
    let mensaje = "";
    if (!regEx.test(input.value)) {
        mensaje = "El E-mail es incorrecto";
    }
    input.setCustomValidity(mensaje);     // si el mensaje no llega vacío, setCustomValidity pone a customError en true
    // si  llega vacío (""), setCustomValidity pone a customError en false
}

const validarAsunto = (input) => {      //  IIFE (Immediately Invoked Function Expression)
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 3) {
        mensaje = "El asunto tiene que tener al menos 3 caracteres."
    } else {
        if (texto.length > 50) {
            mensaje = "El asunto tiene que tener menos de 50 caracteres."
        }
    }
    input.setCustomValidity(mensaje);
}

const validarMensaje = (input) => {
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 10) {
        mensaje = "El mensaje tiene que tener al menos 10 caracteres."
    } else {
        if (texto.length > 300) {
            mensaje = "El mensaje tiene que tener menos de 300 caracteres."
        }
    }
    input.setCustomValidity(mensaje);
}

const validarPassword = (input) => {
    //  para que input.checkValidity() no arroje un false y compruebe si es valido
    //  el campo primero hay que setear el setCustomValidity("") en vacío, string vacío.                 
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 1) {
        mensaje = "Complete campo password."
    }
    input.setCustomValidity(mensaje);
}


const tipoDeErrores = [     // vector con los tipos de errores que pueden ocurrir
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooLong",
    "tooShort",
    "customError"       //  customError es true cuando setCustomValidity tiene un valor distinto de string vacio "" .
];                      //  si setCustomValidity("") retorna false.



// estos mensajeDeErrores son los que se muestran en al <span> de error
const mensajeDeErrores = {
    nombre: {
        valueMissing: "Ingrese su nombre. ",
        // tooLong: "El nombre no puede tener mas de 50 caracteres. ",
        // tooShort: "El nombre tiene que tener al menos 3 caracteres.",
        customError: "El nombre tiene que tener entre 3 y 50 caracteres."
    },
    email: {
        valueMissing: "Ingrese su e-mail.",
        patternMismatch: "El e-mail no es correcto.",
        typeMismatch: "",
        customError: ""
    },
    asunto: {
        valueMissing: "Ingrese su asunto. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: "El asunto tiene que tener entre 3 y 50 caracteres.",
    },
    mensaje: {
        valueMissing: "Ingrese su asunto. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: "El mensaje tiene que tener entre 10 y 300 caracteres.",
    },
    password: {
        valueMissing: "Ingrese su contraseña. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: "",
    },
    precio: {
        valueMissing: "Ingrese el precio del producto. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: " El precio no puede ser $0.00",
    },
    descripcion: {
        valueMissing: "Ingrese alguna descripcion. ",
        tooLong: "La descripcion no puede tener mas de 100 caracteres. ",
        tooShort: "La descripcion tiene que tener al menos 10 caracteres.",
        customError: "",
    },
    imagen: {
        valueMissing: "Ingrese una imagen. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: "No es un archivo de imagen",
    },
}


function mostrarMensajeDeError(input, tipoDeInput) {
    let mensajes = "";
    tipoDeErrores.forEach((error) => {

        if (input.validity[error] && mensajes == "") {
            //console.log(mensajeDeErrores[tipoDeInput][error]);
            mensajes += mensajeDeErrores[tipoDeInput][error];
        }

    });
    return mensajes;

}




