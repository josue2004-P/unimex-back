import { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { firestore } from "../../../firebase/config";

export default function AlumnoTarea({ alumno, tarea }) {
  //Modal
  const [showModal, setShowModal] = useState(false);
  const [calificacion, setCalificacion] = useState([]);

  const { id, nombre, apellido, entregada } = alumno;

  //FUNCION CAFILICACION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const calificacion = e.target[0]?.value;

    const productDocRef = doc(firestore, "entregas", id);
    getDoc(productDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // El documento existe, puedes actualizarlo
          updateDoc(productDocRef, {
            calificacion: calificacion,
            entregada: true,
          })
            .then(() => {
              setShowModal(false);
              //ALERTA DE EXITO

              Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success",
              });
            })
            .catch((error) => {
              //MENSAJE DE ERROR
              console.error("Error updating document: ", error);
            });
        } else {
          // El documento no existe
          console.log("El documento no existe");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento: ", error);
      });
  };

  return (
    <div className="bg-white border-b ">
      <div className="flex justify-between py-4 ">
        {nombre} {apellido}
        <div className="flex ml-2">
          {entregada ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <div>
              <button onClick={() => setShowModal(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          )}
          {!entregada ? "" : ""}
        </div>
      </div>

      {showModal ? (
        <div className="fixed sm:pl-[15.59rem] z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="sm:w-[90%] inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left ">
                    <div className="flex bjustify-between items-center ">
                      <h3
                        className="text-2xl leading-6 font-medium text-gray-900 mr-4"
                        id="modal-title"
                      >
                        Tarea By {nombre} {apellido}
                      </h3>
                      <button
                        type="button"
                        className=" inline-flex justify-end  text-base mr-4 font-medium text-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setShowModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="">
                      <div className="mt-5 ">
                        <p className="text-xl font-medium"> {tarea.titulo}</p>
                        <p className="text-sm font-medium">
                          {" "}
                          {tarea.descripcion}
                        </p>
                        <div className="my-4">
                          <p>Documento</p>
                        </div>
                      </div>
                      <div className=" mt-5">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-2">
                            <label className="font-medium" htmlFor="">
                              Calificacion:
                            </label>
                          </div>
                          <div>
                            {" "}
                            <input
                              max="10"
                              min="1"
                              onChange={(event) =>
                                setCalificacion(event.target.value)
                              }
                              type="number"
                              className="border p-1 text-end rounded-lg mb-2"
                            />
                          </div>

                          <div className="flex mt-2">
                            <div className="w-1/2 mr-2">
                              <button
                                className="bg-blue-900 font-medium text-white p-2 px-4 rounded-xl w-full"
                                type="submit"
                              >
                                Calificar
                              </button>
                            </div>
                            <div className="w-1/2">
                              <button 
                                                      onClick={() => setShowModal(false)}
                              className="w-full font-medium bg-red-900 text-white p-2 px-4 rounded-xl ">
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
