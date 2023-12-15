import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import TareaDetalle from "./Tareas/TareaDetalle";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

import { getAuth } from "firebase/auth";

import { firestore } from "../../firebase/config";

export default function Alumno({ alumno }) {
  //Modal
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();

  const user = auth.currentUser;

  //user
  const uid = user.uid;

  // context de firebase para cambios en la BD
  const { firebase } = useContext(FirebaseContext);

  const { id, nombre, apellido, edad, id_grupo, materias, calp1,calp2 } =
    alumno;

  //define la constante donde se guardan los datos
  const [maestro, setMaestro] = useState([]);

  useEffect(() => {
    const obtenerMaestros = () => {
      firebase.db
        .collection("usuarios")
        .doc(uid)
        .onSnapshot(manejarSnapshotMaestro);
    };

    obtenerMaestros();
  }, [uid]);

  function manejarSnapshotMaestro(doc) {
    if (doc.exists) {
      const maestro = doc.data();
      setMaestro(maestro.materiasAsignadas);
    } else {
      console.log("No such document!");
    }
  }

  const materia = maestro.filter((element) => materias.includes(element));

  //busqueda entregados

  const [entregadas, setEntregadas] = useState([]);
  const [suma, setSuma] = useState(0);
  const [numCalificaciones, setNumCalificaciones] = useState(0);

  useEffect(() => {
    const obtenerTareas = () => {
      firebase.db
        .collection("calificada")
        .where("id_alumno", "==", id)
        .onSnapshot(manejarSnapshotEntregadas);
    };

    obtenerTareas();
  }, [uid]);

  //llamado ala base en tiempo real
  function manejarSnapshotEntregadas(snapshot) {
    const entregadas = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setNumCalificaciones(entregadas.map((entrega) => entrega.calificacion));

    // Suma de las calificaciones
    const suma = entregadas.reduce(
      (total, entrega) => total + entrega.calificacion,
      0
    );

    // Almacena en el useState
    setSuma(suma);

    //alamacena en el useState
    setEntregadas(entregadas);
  }

  const longitud = numCalificaciones.length;

  const promedio = suma !== 0 && longitud !== 0 ? suma / longitud : 0;

  const [calificado, setCalificacion] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const calificado = e.target[0]?.value;

    const productDocRef = doc(firestore, "alumnos", id);
    getDoc(productDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // El documento existe, puedes actualizarlo
          updateDoc(productDocRef, {
            calificacion: calificado,
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
    <tr
      key={alumno.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td className="px-6 py-4">{nombre}</td>
      <td className="px-6 py-4">{apellido}</td>
      <td className="px-6 py-4">{edad}</td>
      <td className="px-6 py-4">{id_grupo}</td>
      <td className="px-6 py-4">{materia}</td>
      <td className="px-6 py-4">
        {calp1 ? calp1 : "No has calificado"}
      </td>
      <td className="px-6 py-4">
        {calp2 ? calp2 : "No has calificado"}
      </td>
      <td>
        <button onClick={() => setShowModal(true)}>Ver Detalles</button>
      </td>
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
            <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
              <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div className="sm:flex sm:items-start ">
                  <div className="mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center ">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900  w-full"
                        id="modal-title"
                      >
                        {nombre} {apellido}
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
                    <div className="mt-2  ">
                      {entregadas.map((entrega) => (
                        <TareaDetalle key={entrega.id} entrega={entrega} />
                      ))}
                    </div>
                    <div className=" flex justify-end">
                      <div className="px-4">
                        <p className="font-medium text-lg">Total:</p>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="">Calificacion:</label>
                        <input
                          max="10"
                          min="1"
                          onChange={(event) =>
                            setCalificacion(event.target.value)
                          }
                          type="number"
                          disabled
                          className="border"
                          value={promedio}
                        />

                        <button type="submit">Entregar</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </tr>
  );
}
