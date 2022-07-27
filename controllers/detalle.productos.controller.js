import { servicios } from "../service/service.productos.js";
import { nuevoItem, nuevoItemConDescripcion, addEventToInputBuscador } from "../controllers/funciones.controller.js";


const grilla_similares = document.querySelector("[data-tipo-grilla-similares]");
const producto_descripcion = document.querySelector("[data-tipo-producto-descripcion]");

const boton_form = document.querySelector("#input-boton");
const input_buscador = document.querySelector("[data-tipo-buscador]");
const lista_desplegable = document.querySelector("[data-lista]");

//   agrega los eventos para deplegar la lista de resultados en el input de busqueda
addEventToInputBuscador(input_buscador, lista_desplegable, boton_form);



const obtenerId = () => {
    //  funcion que obtiene el id del objeto desde la url de la pagina
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "./index.html";
    }
    return id;
}

const cargarProductosSimilares = async (id) => {

    try {
        let prod = await servicios.obtenerProducto(id);
        let itemConDescripcion = nuevoItemConDescripcion(prod.id, prod.nombre, prod.precio, prod.descripcion, prod.img);

        producto_descripcion.appendChild(itemConDescripcion);


        let listaDeProductos = await servicios.listaProductos();
        listaDeProductos.forEach((data) => {

            if (data.categoria == prod.categoria && data.id != prod.id) {
                let item = nuevoItem(data.id, data.nombre, data.precio, data.img);
                grilla_similares.appendChild(item);
            }
        });

    } catch (error) {
        alert("Ocurrio un error al cargar los productos");
    }
}

producto_descripcion.innerHTML = "";
grilla_similares.innerHTML = "";
cargarProductosSimilares(obtenerId());
