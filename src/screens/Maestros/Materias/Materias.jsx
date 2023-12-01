import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";

import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../../firebase";


import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Materias() {
  const auth = getAuth();

  const user = auth.currentUser;

  //user
  const uid = user.uid;

  //define la constante donde se guardan los datos
  const [state, setState] = useState({});
  //define la constante donde se guardan los datos
  const [materia, setMaterias] = useState([]);

  //Llama a firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerMaterias = () => {
      firebase.db

        .collection("Materias")
        .where("id", "==", "xSaZX2oaNgZQJjmcfUGN")
        .onSnapshot(manejarSnapshotMaterias);
    };

    const obtenerMaestros = () => {
      firebase.db
        .collection("usuarios")
        .doc(uid)
        .onSnapshot(manejarSnapshotMaestro);
    };

    obtenerMaterias();
    obtenerMaestros();
  }, [uid]);

  //Materias
  //llamado ala base en tiempo real
  function manejarSnapshotMaterias(snapshot) {
    const materias = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //   //alamacena en el useState
    setMaterias(materias);
  }

  //llamado ala base en tiempo real
  function manejarSnapshotMaestro(doc) {
    if (doc.exists) {
      const maestro = doc.data();
      setState({
        materiaMaestro: maestro.materiasAsignadas,
        grupoMaestro: maestro.grupo,
      });
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div className="w-full h-screen lg:flex">
      <NavbarAdmin />

      <div className="p-4 pt-14 lg:pt-0 sm:ml-64 w-full">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-4 pl-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
            Materias
          </span>
        </h1>

        <div className="flex w-full justify-center sm:justify-start">
          <div className="">
            <div className=" w-full mt-10 lg:mt-10">
              <Link
                to="/maestro/materiaVer"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="  flex  items-center justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-10">
                    Sistemas Operativos
                  </h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    width="28"
                    viewBox="0 0 576 512"
                  >
                    <path d="M469.2 75A75.6 75.6 0 1 0 317.9 75a75.6 75.6 0 1 0 151.2 0zM154.2 240.7A75.6 75.6 0 1 0 3 240.7a75.6 75.6 0 1 0 151.2 0zM57 346C75.6 392.9 108 433 150 461.1s91.5 42.6 142 41.7c-14.7-18.6-22.9-41.5-23.2-65.2c-6.8-.9-13.3-2.1-19.5-3.4c-26.8-5.7-51.9-17.3-73.6-34s-39.3-38.1-51.7-62.5c-20.9 9.9-44.5 12.8-67.1 8.2zm395.1 89.8a75.6 75.6 0 1 0 -151.2 0 75.6 75.6 0 1 0 151.2 0zM444 351.6c18.5 14.8 31.6 35.2 37.2 58.2c33.3-41.3 52.6-92.2 54.8-145.2s-12.5-105.4-42.2-149.4c-8.6 21.5-24 39.6-43.8 51.6c15.4 28.6 22.9 60.8 21.9 93.2s-10.7 64-28 91.6zM101.1 135.4c12.4 2.7 24.3 7.5 35.1 14.3c16.6-24.2 38.9-44.1 64.8-58S255.8 70.4 285.2 70c.2-5.9 .9-11.9 2-17.7c3.6-16.7 11.1-32.3 21.8-45.5c-47.7-3.8-95.4 6-137.6 28.5S94.3 91.7 70.8 133.4c2.7-.2 5.3-.3 8-.3c7.5 0 15 .8 22.4 2.3z" />
                  </svg>
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-400">
                  Cuatrimestre: 1
                </p>
                <p className="font-medium text-gray-700 dark:text-gray-400">
                  Alumnos: 25
                </p>
                <p className="font-medium text-gray-700 dark:text-gray-400">
                  Grupo: Sistemas Computacionales
                </p>
              </Link>
            </div>

            <div className=" w-full mt-5 lg:mt-6">
              <a
                href="#"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="  flex  items-center justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-10">
                    Redes
                  </h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    width="28"
                    viewBox="0 0 640 512"
                  >
                    <path d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z" />
                  </svg>
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-400">
                  Cuatrimestre: 4
                </p>
                <p className="font-medium text-gray-700 dark:text-gray-400">
                  Alumnos: 25
                </p>
                <p className="font-medium text-gray-700 dark:text-gray-400">
                  Grupo: Sistemas Computacionales
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
