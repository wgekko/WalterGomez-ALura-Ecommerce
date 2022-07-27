import { servicios } from "../service/service.productos.js";
import { nuevoItem, addEventToInputBuscador, nuevoItemEditarBorrar } from "../controllers/funciones.controller.js";

const grilla_todos = document.querySelector("[data-tipo-grillaTodosLosProductos]");
const categoria_producto = document.querySelector("#categoria-producto");

const boton_form = document.querySelector("#input-boton");
const input_buscador = document.querySelector("[data-tipo-buscador]");
const lista_desplegable = document.querySelector("[data-lista]");

//   agrega los eventos para deplegar la lista de resultados en el input de busqueda
addEventToInputBuscador(input_buscador, lista_desplegable, boton_form);

const obtenerCategoria = () => {
    let url = new URL(window.location);
    let categoria = url.searchParams.get("categoria");

    if (categoria === null) {
        return "";
    }
    return categoria;
}

const cargarTodosLosProductos = async (categoria) => {

    try {
        const listaDeProductos = await servicios.listaProductos();

        if (categoria == "") {
            listaDeProductos.forEach((data) => {
                let item = nuevoItemEditarBorrar(data.id, data.nombre, data.precio, data.img);
                grilla_todos.appendChild(item);
            });
        } else {
            categoria_producto.innerHTML = categoria;
            listaDeProductos.forEach((data) => {
                let item = nuevoItem(data.id, data.nombre, data.precio, data.img);
                if (categoria == data.categoria) {
                    grilla_todos.appendChild(item);
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}


grilla_todos.innerHTML = "";
cargarTodosLosProductos(obtenerCategoria());


