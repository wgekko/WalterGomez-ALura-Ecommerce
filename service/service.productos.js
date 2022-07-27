

const listaProductos = () =>
  fetch("http://localhost:3000/productos").then((respuesta) => respuesta.json());

const obtenerProducto = (id) =>
  fetch(`http://localhost:3000/productos/${id}`).then((respuesta) => respuesta.json());


const subirProducto = (nombre, precio, categoria, descripcion, img) => {
  return fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, precio, id: uuid.v4(), categoria, descripcion, img }),
  });
};

const borrarProducto = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE",
  });
}

const editarProducto = async (id, nombre, precio, descripcion, categoria, img) => {

  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, precio, categoria, descripcion, img }),
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

const subirImagenCloudinary = (file) => {

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/imagenes-cloudinary/upload";
  const CLOUDINARY_UPLOAD_PRESET = "s0iz2jew";

  let formData = new FormData;
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  return axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData,      
  });

}


/////////////////////

export const servicios = {
  listaProductos,
  obtenerProducto,
  subirProducto,
  borrarProducto,
  editarProducto,
  subirImagenCloudinary
}
