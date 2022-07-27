import { servicios } from "../service/service.productos.js";
import { nuevoItemConDescripcion, addEventToInputBuscador, obtenerId } from "../controllers/funciones.controller.js";

const pantallaDialogo = document.querySelector("#pantalla-dialogo");

const boton_borrar = document.querySelector("[data-boton-borrar]");
const boton_aceptar = document.querySelector("[data-boton-aceptar]");
const boton_cancelar = document.querySelector("[data-boton-cancelar]");

const producto_descripcion = document.querySelector("[data-tipo-producto-descripcion]");

const cajaDialogo = document.querySelector("#caja-dialogo");
const mensajeEspera = document.querySelector("#mensaje-espera");

let img_producto;

const boton_form = document.querySelector("#input-boton");
const input_buscador = document.querySelector("[data-tipo-buscador]");
const lista_desplegable = document.querySelector("[data-lista]");

//   agrega los eventos para deplegar la lista de resultados en el input de busqueda
addEventToInputBuscador(input_buscador, lista_desplegable, boton_form);


boton_aceptar.addEventListener("click", () => {
    
    cajaDialogo.classList.add("caja-dialogo--disabled");
    mensajeEspera.classList.add("mensaje-espera--enabled");
    borrarProductos();
});

boton_cancelar.addEventListener("click", () => {
    pantallaDialogo.classList.remove("pantalla-dialogo--enabled");
});

boton_borrar.addEventListener("click", () => {
    pantallaDialogo.classList.add("pantalla-dialogo--enabled");
});

pantallaDialogo.addEventListener("click", (event) => {

    if (event.target.classList.contains('pantalla-dialogo')) {
        pantallaDialogo.classList.remove("pantalla-dialogo--enabled");
    }
});


const borrarProductos = async () => {

    try {
        let id = obtenerId();
        let respuesta = await servicios.borrarProducto(id);

        if (respuesta.ok) {
            window.location.href = "./todos-los-productos.html";
        } else {
            window.location.href = "./hubo-un-problema.html";
        }

    } catch (error) {
        console.log("Ocurrio un error al borrar el producto");
    }

}



const cargarProducto = async () => {

    try {
        let id = obtenerId();
        let prod = await servicios.obtenerProducto(id);
        
        if (prod.nombre) {
            img_producto = prod.img;
            let itemConDescripcion = nuevoItemConDescripcion(prod.id, prod.nombre, prod.precio, prod.descripcion, prod.img);
            producto_descripcion.appendChild(itemConDescripcion);
        }else{
            location.href = "./hubo-un-problema.html";
        }

    } catch (error) {
        console.log("Ocurrio un error al cargar el producto");
    }
}

cargarProducto();

