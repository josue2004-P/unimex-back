import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";

import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../../firebase";
import Materia from "../../../components/Maestros/Materias/Materia";

import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Materias() {
  const auth = getAuth();

  const user = auth.currentUser;

  //user
  const uid = user.uid;

  //define la constante donde se guardan los datos
  const [materia, setMaterias] = useState([]);

  //Llama a firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerMaterias = () => {
      firebase.db

        .collection("Materias")
        .where("maestro", "==", uid)
        .onSnapshot(manejarSnapshotMaterias);
    };

    obtenerMaterias();
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

  return (
    <div className="w-full h-screen lg:flex">
      <NavbarAdmin />

      <div className="p-4 pt-14 lg:pt-0 sm:ml-64 w-full">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-4 pl-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
            Materias
          </span>
        </h1>

        <div className="flex w-full justify-center sm:justify-start mt-10">
          <div className="">
            {materia.map((materia) => (
              <Materia key={materia.id} materia={materia} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
