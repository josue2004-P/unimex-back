import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { firestore, storage } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function NuevoProducto() {
  // Hook para redireccionar
  const navigate = useNavigate();

  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      cantidad: "",
      precio: "",
      imagen: "",
      existencia: true,
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      cantidad: Yup.number().required("La cantidad es obligatorio"),
      precio: Yup.number().required("El precio es obligatoria"),
      imagen: Yup.string().required("La imagen es obligatoria"),
    }),
    onSubmit: (producto) => {
        try {
          const storageRef = ref(storage, `files/${producto.nombre}`);
          const uploadTask = uploadBytesResumable(storageRef, producto.imagen);
       
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // No need for handling unsuccessful uploads here, as errors will be handled in the next callback
            },
            (error) => {
              console.error("Upload failed:", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(collection(firestore, "products"), {
                  name: producto.nombre,
                  cantidad: producto.cantidad,
                  precio: producto.precio,
                  image: producto.nombre, // Store the image's URL here
                  imageUrl:downloadURL,
                  existencia: producto.existencia,
                })
                  .then(() => {
                    // Redireccionar
                    navigate("/admin/productos/");
                  })
                  .catch((error) => {
                    console.error("Error writing document: ", error);
                  });
              });
            }
          );
        } catch (error) {
          console.log(error);
        }
       },
       
  });

  return (
    <div className="bg-gray-100 h-screen ">
      <div className="flex justify-center">
        <div className="container items-center px-5 py-6 lg:px-20">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 "
          >
            <h1 className="font-bold text-3xl pb-4">Agrega Producto</h1>

            <div className="relative pt-4">
              <label
                className="text-base leading-7 text-blueGray-500"
                htmlFor="nombre"
              >
                Nombre Producto
              </label>
              <input
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                id="nombre"
                type="text"
                placeholder="Nombre "
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.nombre} </p>
              </div>
            ) : null}

            <div className="relative pt-4">
              <label
                className="text-base leading-7 text-blueGray-500"
                htmlFor="precio"
              >
                Cantidad
              </label>
              <input
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                id="cantidad"
                type="text"
                placeholder="Cantidad"
                min="0"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.cantidad && formik.errors.cantidad ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.cantidad} </p>
              </div>
            ) : null}

            <div className="relative pt-4">
              <label
                className="text-base leading-7 text-blueGray-500"
                htmlFor="nombre"
              >
                Precio
              </label>
              <input
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                id="precio"
                type="text"
                placeholder="Precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.precio} </p>
              </div>
            ) : null}

            <div className="relative pt-4">
              <label
                className="text-base leading-7 text-blueGray-500"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <input
                accept="image/*"
                id="imagen"
                name="imagen"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("imagen", event.currentTarget.files[0]);
                }}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              />
            </div>

            {formik.touched.imagen && formik.errors.imagen ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.imagen} </p>
              </div>
            ) : null}

            <div className="flex items-center w-full pt-4 mb-1">
              <input
                type="submit"
                className="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-green-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 "
                value="Agregar Producto"
              />
            </div>
            <div className="flex items-center w-full pt-1 mb-4">
              <Link
                to="/admin/productos"
                className="w-full flex justify-center py-3 text-base text-white transition duration-500 ease-in-out transform bg-red-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 "
              >
                {" "}
                Regresar{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
