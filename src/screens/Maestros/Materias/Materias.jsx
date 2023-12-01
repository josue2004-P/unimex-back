import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";

import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../../firebase";
import Alumno from "../../../components/Maestros/Alumno";

import { getAuth } from "firebase/auth";

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

  console.log(materia);

  return (
    <div className="w-full h-screen flex">
      <NavbarAdmin />

      <div className="p-4 sm:ml-64 w-full ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-4 pl-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
            Materias
          </span>
        </h1>
      </div>
    </div>
  );
}
