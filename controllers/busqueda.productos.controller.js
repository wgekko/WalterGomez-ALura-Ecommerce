import { servicios } from "../service/service.productos.js";
import { nuevoItem, addEventToInputBuscador } from "../controllers/funciones.controller.js";

const buscar = document.querySelector("#busqueda");
const grilla_resultados = document.querySelector("[data-tipo-grillaResultadoBusqueda]");

const boton_form = document.querySelector("#input-boton");
const input_buscador = document.querySelector("[data-tipo-buscador]");
const lista_desplegable = document.querySelector("[data-lista]");


//   agrega los eventos para deplegar la lista de resultados en el input de busqueda
addEventToInputBuscador(input_buscador, lista_desplegable, boton_form);

const producto_a_buscar = () => {
    let url = new URL(window.location);
    let search = url.searchParams.get("search");

    if (search === null) {
        return "";
    }

    return search;
}


const buscarProductos = async (prod_buscado) => {

    if (prod_buscado == "") {
        let element = document.createElement("p");
                element.innerHTML = "Error en la busqueda.";
                grilla_resultados.appendChild(element);
    } else {
        prod_buscado = prod_buscado.trim();
        prod_buscado = prod_buscado.toLowerCase();


        try {
            let listaDeProductos = await servicios.listaProductos();

            listaDeProductos.forEach((data) => {

                let nombreProducto = data.nombre.toLowerCase();

                if (nombreProducto.search(prod_buscado) != -1) {

                    let item = nuevoItem(data.id, data.nombre, data.precio, data.img);
                    grilla_resultados.appendChild(item);
                }

            });
            if (grilla_resultados.innerHTML == "") {
                let element = document.createElement("p");
                element.innerHTML = "No hay resultados.";
                grilla_resultados.appendChild(element);
            }
        } catch (error) {
            console.log("Ocurrio un error al cargar los productos");
        }
    }
}

grilla_resultados.innerHTML = "";
let producto_buscado = producto_a_buscar();
buscar.innerHTML = producto_buscado;

buscarProductos(producto_buscado);
