import { servicios } from "../service/service.productos.js"
import { addEventToInputBuscador, obtenerId, darFormatoMoneda } from "../controllers/funciones.controller.js";
import { validar, formularioValido } from "../assets/script/validaciones.js";
//import axios from "axios";

const inputs_producto = document.querySelectorAll(".agregar-producto__input");
const boton_editar_producto = document.querySelector("[data-input-submit-editar]");
const imagen = document.querySelector("#imagen-cargada");

const input_nombre = document.querySelector("[data-input-nombre]");
const input_precio = document.querySelector("[data-input-precio]");
const input_descripcion = document.querySelector("[data-input-descripcion]");
const input_categoria = document.querySelector("[data-input-categoria]");

const cajaDialogo = document.querySelector("#caja-dialogo");
const mensajeEspera = document.querySelector("#mensaje-espera");

const pantallaDialogo = document.querySelector("#pantalla-dialogo");
const boton_aceptar = document.querySelector("[data-boton-aceptar]");
const boton_cancelar = document.querySelector("[data-boton-cancelar]");

let id_producto;
let img_old;

// inputs de barra de busqueda
const boton_form = document.querySelector("#input-boton");
const input_buscador = document.querySelector("[data-tipo-buscador]");
const lista_desplegable = document.querySelector("[data-lista]");


//   agrega los eventos para deplegar la lista de resultados en el input de busqueda
addEventToInputBuscador(input_buscador, lista_desplegable, boton_form);



const convertirMonedaAString = (st) => {

    st = st.replace(/[\$\.]/g, "");      // elimina los signos $ y .       
    st = st.replace(/[\,]+/g, ".");            // cambia la coma por el punto para convertir el numero en numero flotante  si fuera necesario      
    return st;
}


const editarProductoEImagen = async (file, data) => {

    try {
        let responseCloudinary = await servicios.subirImagenCloudinary(file);

        if (responseCloudinary.statusText == "OK") {
            //console.log("responseCloudinary: ", responseCloudinary.data);
            //console.log("responseCloudinary.secure_url: ", responseCloudinary.data.secure_url);

            let responseEditarProd = await servicios.editarProducto(id_producto, data.nombre, data.precio, data.descripcion, categoria, responseCloudinary.data.secure_url);

            if (responseEditarProd.ok) {
                window.location.href = "./todos-los-productos.html";
            } else {
                window.location.href = "./hubo-un-problema.html";
            }

        } else {
            //console.log("Hubo un problema al subir la imagen a cloudynary.");    
            window.location.href = "./hubo-un-problema.html";
        }

    } catch (error) {
        console.log("Errrorr: ", error);
        window.location.href = "./hubo-un-problema.html";
    }
}

const editarProductoSolo = async (data) =>{
    try {
        let responseEditarProd = await servicios.editarProducto(id_producto, data.nombre, data.precio, data.descripcion, data.categoria, data.img);

        if (responseEditarProd.ok) {
            window.location.href = "./todos-los-productos.html";
        } else {
            window.location.href = "./hubo-un-problema.html";
        }

    } catch (error) {
        console.log(error);
        window.location.href = "./hubo-un-problema.html";
    }
}


boton_aceptar.addEventListener("click", () => {

    inputs_producto.forEach((input) => {
        validar(input);
    });

    if (formularioValido(inputs_producto)) {

        let data = getDatos();
        let file = document.querySelector("[data-input-imagen]").files[0];

        cajaDialogo.classList.add("caja-dialogo--disabled");
        mensajeEspera.classList.add("mensaje-espera--enabled");

        if (file == undefined) {    // si no se subió una imagen nueva se utiliza la que ya estaba guardada.
            data.img = img_old;
            editarProductoSolo(data);
        } else {
            editarProductoEImagen(file, data);
        }
    }
});

boton_cancelar.addEventListener("click", () => {
    pantallaDialogo.classList.remove("pantalla-dialogo--enabled");
});


pantallaDialogo.addEventListener("click", (event) => {

    if (event.target.classList.contains('pantalla-dialogo')) {
        pantallaDialogo.classList.remove("pantalla-dialogo--enabled");
        document.querySelector("[data-input-imagen]").disabled = false;
    }
});



boton_editar_producto.addEventListener("click", (event) => {

    event.preventDefault();

    inputs_producto.forEach((input) => {
        validar(input);
    });

    if (formularioValido(inputs_producto)) {
        pantallaDialogo.classList.add("pantalla-dialogo--enabled");
        document.querySelector("[data-input-imagen]").disabled = true;
    }

});


const getDatos = () => {
    let obj = {};

    let precio = document.querySelector("[data-input-precio]").value;

    obj.nombre = document.querySelector("[data-input-nombre]").value;
    obj.precio = convertirMonedaAString(precio);
    obj.categoria = input_categoria.value;
    obj.descripcion = document.querySelector("[data-input-descripcion]").value;
    return obj;
}

const cargarProductoAEditar = (prod) => {

    id_producto = prod.id;
    input_categoria.value = prod.categoria;

    input_nombre.value = prod.nombre;
    input_precio.value = prod.precio;
    darFormatoMoneda(input_precio);
    input_descripcion.value = prod.descripcion;
    img_old = prod.img;
    cargarImagen(prod.img);
}


function cargarImagen(dir_imagen) {

    let fondo = document.querySelector("#fondo");

    imagen.src = dir_imagen;

    // si se cargo el archivo de imagen correctamente
    if (imagen.naturalHeight != 0) {

        imagen.classList.add("box-image__imagen-cargada--visible");

        fondo.classList.add("box-image__imagen-fondo--invisible");
        imagen.parentElement.querySelector(".message-error").innerHTML = "";

    } else {
        imagen.parentElement.classList.add("input__invalid");
        imagen.parentElement.querySelector(".message-error").innerHTML = "No se pudo cargar la imagen";
    }
};


const obtenerProductoAEditar = async () => {
    try {
        let id = obtenerId();
        let prod = await servicios.obtenerProducto(id);

        if (prod.nombre) {
            cargarProductoAEditar(prod);

        } else {
            location.href = "./hubo-un-problema.html";
        }


    } catch (error) {
        console.log("Ocurrio un error al cargar el producto");
    }
}

obtenerProductoAEditar();

