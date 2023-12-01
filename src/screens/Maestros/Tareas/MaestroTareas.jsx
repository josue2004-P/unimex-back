import { useContext, useState, useEffect } from "react";
import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";

import { useFormik } from "formik";
import { FirebaseContext } from "../../../firebase";

//Alerta
import Swal from "sweetalert2";

//Import componente
import Tarea from "../../../components/Maestros/Tarea";

//Autentificacion
import { getAuth } from "firebase/auth";

export default function MaestroTareas() {
  //TRAE UID DE USUARIO ACTUAL
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

  //Llama a firebase
  const { firebase } = useContext(FirebaseContext);

  //USEEFECT
  useEffect(() => {
    const obtenerMaestros = () => {
      firebase.db
        .collection("usuarios")
        .doc(uid)
        .onSnapshot(manejarSnapshotMaestro);
    };

    obtenerMaestros();
  }, [uid]);

  //snapchot maestro
  function manejarSnapshotMaestro(doc) {
    if (doc.exists) {
      const maestro = doc.data();

      formik.setValues({
        titulo: "",
        descripcion: "",
        grupo: maestro.grupo || "",
        id_materia: maestro.materiasAsignadas || "",
        maestro: uid,
      });
    } else {
      console.log("No such document!");
    }
  }

  //Modal
  const [showModal, setShowModal] = useState(false);

  //FORMIK
  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      grupo: "",
      id_materia: "",
      maestro: "",
    },
    onSubmit: (tareas) => {
      try {
        firebase.db.collection("tareas").add(tareas);
        setShowModal(false);

        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });

        tareas.titulo = "";
        tareas.descripcion = "";
      } catch (error) {
        console.log(error);
      }
    },
  });

  //busqueda de alumnos

  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const obtenerTareas = () => {
      firebase.db
        .collection("tareas")
        .where("maestro", "==", uid)
        .onSnapshot(manejarSnapshotAlumnos);
    };

    obtenerTareas();
  }, [uid]);

  //llamado ala base en tiempo real
  function manejarSnapshotAlumnos(snapshot) {
    const tareas = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //alamacena en el useState
    setTareas(tareas);
  }

  return (
    <div className="w-full h-screen flex">
      <NavbarAdmin />

      <div className="p-4 sm:ml-64 w-full ">
        <div className="w-full text-gray-900 font-semibold whitespace-nowrap">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl p-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
              Tareas
            </span>
          </h1>
        </div>

        <button
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Agregar Tarea
        </button>

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
              <div className="w-[60%] inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="flex justify-between items-center ">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900  w-full"
                          id="modal-title"
                        >
                          Agrega Tarea
                        </h3>
                        <button
                          type="button"
                          className="w-full inline-flex justify-end  text-base mr-4 font-medium text-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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
                      <div className="mt-2">
                        <form
                          className="p-4 md:p-5 text-start"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2 ">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Titulo
                              </label>
                              <input
                                id="titulo"
                                type="text"
                                value={formik.values.titulo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Title"
                                required=""
                              />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Descripcion
                              </label>
                              <input
                                id="descripcion"
                                type="text"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Description"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="flex justify-center mt-[1.5rem]">
                            <button
                              type="submit"
                              className="flex items-center  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                              Add Maestro
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="w-full  text-black">
          <div className="py-12">
            <div className=" mx-auto ">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <div className="relative overflow-x-auto min-[375px]:mt-4 ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Id tarea
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Titulo
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Descripcion
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Grupo
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Maestro
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Materia
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tareas.map((tarea) => (
                          <Tarea key={tarea.id} tarea={tarea} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
