import { servicios } from "../service/service.productos.js"
import { addEventToInputBuscador } from "../controllers/funciones.controller.js";
import { validar, formularioValido } from "../assets/script/validaciones.js";

const inputs_producto = document.querySelectorAll(".agregar-producto__input");
const boton_submit_producto = document.querySelector("[data-input-submit]");


const pantallaDialogo = document.querySelector("#pantalla-dialogo");
const boton_aceptar = document.querySelector("[data-boton-aceptar]");
const boton_cancelar = document.querySelector("[data-boton-cancelar]");

const cajaDialogo = document.querySelector("#caja-dialogo");
const mensajeEspera = document.querySelector("#mensaje-espera");


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

const subirProductoEImagen = async (file, data) => {

    try {
        let responseCloudinary = await servicios.subirImagenCloudinary(file);

        if (responseCloudinary.statusText == "OK") {

            servicios.subirProducto(data.nombre, data.precio, data.categoria, data.descripcion, responseCloudinary.data.secure_url).then((response) => {
                if (response.ok) {
                    window.location.href = "./todos-los-productos.html";
                }
            }).catch((err) => {
                console.log(err);
                window.location.href = "./hubo-un-problema.html";
            });

        } else {
            console.log("problema con imagen");
            window.location.href = "./hubo-un-problema.html";
        }

    } catch (error) {
        console.log("Errrorr: ", error);
        window.location.href = "./hubo-un-problema.html";
    }
}

boton_submit_producto.addEventListener("click", (event) => {
    event.preventDefault();

    inputs_producto.forEach((input) => {
        validar(input);
    });

    if (formularioValido(inputs_producto)) {
        pantallaDialogo.classList.add("pantalla-dialogo--enabled");
        document.querySelector("[data-input-imagen]").disabled = true;
    }
});

boton_aceptar.addEventListener("click", () => {
    let data = getDatos();
    let file = document.querySelector("[data-input-imagen]").files[0];
    //console.log("file: ", file);
    cajaDialogo.classList.add("caja-dialogo--disabled");
    mensajeEspera.classList.add("mensaje-espera--enabled");
    subirProductoEImagen(file, data);
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


const getDatos = () => {
    let obj = {};
    let precio = document.querySelector("[data-input-precio]").value;

    obj.nombre = document.querySelector("[data-input-nombre]").value;
    obj.precio = convertirMonedaAString(precio);
    obj.categoria = document.querySelector("[data-input-categoria]").value;
    obj.descripcion = document.querySelector("[data-input-descripcion]").value;

    return obj;
}