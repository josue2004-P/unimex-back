import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";
import Materia from "../../../components/Maestros/Alumno";

import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../../firebase";
import Alumno from "../../../components/Maestros/Alumno";

import { getAuth } from "firebase/auth";

export default function Alumnos() {
  const auth = getAuth();

  const user = auth.currentUser;

  //user
  const uid = user.uid;

  //define la constante donde se guardan los datos
  const [state,setState] = useState({})

  const [alumnos, setAlumnos] = useState([]);

  //Llama a firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerAlumnos = () => {
      if (Array.isArray(state.materiaMaestro) && state.materiaMaestro.length > 0) {
        firebase.db
          .collection("alumnos")
          .where("materias", "array-contains-any", state.materiaMaestro).where("id_grupo","==",state.grupoMaestro)
          .onSnapshot(manejarSnapshotAlumnos);
      }
    };
   
    const obtenerMaestros = () => {
      firebase.db
        .collection("usuarios")
        .doc(uid)
        .onSnapshot(manejarSnapshotMaestro);
    };
   
    obtenerMaestros();
    obtenerAlumnos();

  
   }, [uid,state]);

  //llamado ala base en tiempo real
  function manejarSnapshotAlumnos(snapshot) {
    const alumnos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //   //alamacena en el useState
    setAlumnos(alumnos);
  }

  function manejarSnapshotMaestro(doc) {
    if (doc.exists) {
      const maestro = doc.data();
      setState({
        materiaMaestro: maestro.materiasAsignadas,
        grupoMaestro: maestro.grupo
      });
    } else {
      console.log("No such document!");
    }
   }
   


  return (
    <div className="w-full h-screen flex">
      <NavbarAdmin />

      <div className="p-4 sm:ml-64 w-full ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-4 pl-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
            Alumnos
          </span>
        </h1>

        <div className="w-full text-black">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                  <div className="relative overflow-x-auto min-[375px]:mt-4 ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Nombre
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Apellido
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Edad
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Grupo
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Materia
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {alumnos.map((alumno) => (
                          <Alumno key={alumno.id} alumno={alumno} />
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
