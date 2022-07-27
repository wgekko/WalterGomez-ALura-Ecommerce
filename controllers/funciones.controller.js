import { servicios } from "../service/service.productos.js";

export const nuevoItem = (id, nombre, precio, img) => {
    let item = document.createElement("div");
    item.classList.add("item");
    let content = `
        <a href="./productos-similares.html?id=${id}"><img class="item__imagen" src="${img}" alt="imagen de ${nombre}"></a>
        <p class="item__nombre">${nombre}</p>
        <p class="item__precio">$ ${precio}</p>
        <a class="item__enlace" href="./productos-similares.html?id=${id}">Ver producto</a>`
        ;

    item.innerHTML = content;
    return item;
}

export const nuevoItemEditarBorrar = (id, nombre, precio, img) => {
    let item = document.createElement("div");
    item.classList.add("item");
    let content = `
        <a href="./productos-similares.html?id=${id}"><img class="item__imagen" src="${img}" alt="imagen de ${nombre}"></a>
        <p class="item__nombre">${nombre}</p>
        <p class="item__precio">$ ${precio}</p>
        <a class="item__enlace" href="./productos-similares.html?id=${id}">Ver producto</a>
        <div class="item__enlace--editar-borrar"><a class="item__enlace" href="./editar-producto.html?id=${id}"><div class="item__enlace--editar"></div></a>
        <a class="item__enlace" href="./borrar-producto.html?id=${id}"><div class="item__enlace--borrar"></div</a></div>`
        ;

    item.innerHTML = content;
    return item;
}

export const nuevoItemConDescripcion = (id, nombre, precio, descripcion, img) => {
    let item = document.createElement("div");
    let contenido = `
    <div class="item-seleccionado">
        <img class="item-seleccionado__imagen" src=${img} alt="imagen de ${nombre}">
        <div class="item-seleccionado__info">
            <p class="item-seleccionado__nombre">${nombre}</p>
            <p class="item-seleccionado__precio">$ ${precio}</p>
            <p class="item-seleccionado__descripcion">${descripcion}</p>
        </div>    
    </div>`
        ;
    item.innerHTML = contenido;
    return item;
}


export const addEventToInputBuscador = (input_buscador, lista_desplegable, boton_form) => {

    let listaProductos = [];

    //  se solicita la lista de productos
    input_buscador.addEventListener("focus", async () => {

        try {
            let lista = await servicios.listaProductos();

            lista.forEach((data) => {
                let nombre = data.nombre;
                listaProductos.push(nombre);
            });
        } catch (error) {
            console.log("Error al cargar la lista para el input de busqueda");
        }
    });


    boton_form.addEventListener("click", (event) => {
        event.preventDefault();

        let texto = input_buscador.value;
        texto = texto.trim();

        if (texto != "") {
            window.location.href = `./resultado-busqueda.html?search=${texto}`;
        }
    });


    lista_desplegable.addEventListener("click", (event) => {
        let texto = event.target.innerHTML;
        input_buscador.value = texto;
        input_buscador.focus();
        lista_desplegable.innerHTML = "";
    });


    const generarListaDesplegable = (event) => {
        let input = event.target.value;
        input = input.toLowerCase();
        lista_desplegable.innerHTML = "";

        if (input == "") {
            while (lista_desplegable.childElementCount > 0) {
                lista_desplegable.removeChild();
            }
        } else {

            listaProductos.forEach((nombre) => {
                let nom = nombre.toLowerCase();
                if (nom.startsWith(input)) {
                    let li = document.createElement("li");
                    li.classList.add("caja-busqueda__list-item");
                    li.innerHTML = nombre;
                    lista_desplegable.appendChild(li);
                }
            });
        }
    }

    const desplazarseEnListaDesplegable = (e) => {

        let items = lista_desplegable.querySelectorAll("li");

        if (items.length == 0) {
            return; // La lista esta vacía
        }
        // Saber si alguno está activo
        let actual = Array.from(items).findIndex(item => item.classList.contains('active'));

        // Analizar tecla pulsada
        if (e.keyCode == 13) {
            // Tecla Enter, evitar que se procese el formulario
            e.preventDefault();

            // ¿Hay un elemento activo?
            if (items[actual]) {
                // Hacer clic
                items[actual].click();
            }
        }

        if (e.keyCode == 38 || e.keyCode == 40) {
            // Flecha arriba (restar) o abajo (sumar)
            if (items[actual]) {
                // Solo si hay un elemento activo, eliminar clase
                items[actual].classList.remove('active');
            }
            // Calcular posición del siguiente
            actual += (e.keyCode == 38) ? -1 : 1;
            // Asegurar que está dentro de los límites
            if (actual < 0) {
                actual = 0;
            } else if (actual >= items.length) {
                actual = items.length - 1;
            }
            // Asignar clase activa
            items[actual].classList.add('active');
        }
    }

    // ejecuta cuando se ingresa una letra excluyendo Enter
    input_buscador.addEventListener("keyup", (event) => {
        if (!(event.keyCode >= 37 && event.keyCode <= 40) && event.keyCode != 13) {

            generarListaDesplegable(event);
        }
    });

    //  verifica si se pulsan las flechas o enter 
    input_buscador.addEventListener("keydown", (event) => {

        let items = lista_desplegable.querySelectorAll("li");

        if (items.length == 0) {
            return; // La lista  de resultados esta vacía
        }
        // Saber si algun item está activo
        let actual = Array.from(items).findIndex(item => item.classList.contains('active'));

        // si se pulsa Enter y no hay seleccionado ningun item de la lista
        if (event.keyCode == 13 && !items[actual]) {
            boton_form.click();
        }
        // si se pulsa una flecha
        if ((event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode == 13) {
            desplazarseEnListaDesplegable(event);
        }

    });


}

export const obtenerId = () => {
    //  funcion que obtiene el id del objeto desde la url de la pagina
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "./index.html";
    }
    return id;
}

    	        	  
// da formato tipo moneda al input precio ej $2.754,50
export const darFormatoMoneda = (input) => {
    let numValue = input.value;
    let num = numValue.replace(/[\$\.\,]/g, "");      // elimina los signos $ . , 

    // num = num.replace(/[\,]+/g, "");      
    num = num.replace(/^0+/g, "");          //  elimina los ceros delanteros

    switch (num.length) {
        case 0:
            num = "000";                //  si no se ingresa ningun número
            break;
        case 1:
            num = "00" + num;             // si se ingresa un solo número
            break;
        case 2:
            num = "0" + num;              // si se ingresan dos números
            break;
    }
    let numero = "$";
    for (let i = 0; i < num.length; i++) {

        if ((num.length - i) == 2) {
            numero += ",";
        }
        if (((num.length >= 6) && (num.length - i == 5)) || ((num.length >= 9) && (num.length - i == 8))) {
            numero += ".";
        }
        numero += num[i];
    }

    input.value = numero;        // cambia el valor del input precio, para que se vea como un monto de dinero.


    // instrucciones para ver el numero real, en numero flotante. Ej 52,43

    // let n = numero.replace(/[\$\.]/g, "");      // elimina los signos $ y .   
    // console.log("numero sin signos : ", n);
    // n = n.replace(/[\,]+/g, ".");            // cambia la coma por el punto para convertir el numero en numero flotante        
    // console.log("numero flotante" , parseFloat(n));
}
