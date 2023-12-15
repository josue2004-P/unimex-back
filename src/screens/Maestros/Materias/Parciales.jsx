import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../../firebase";
import Parcial from "../../../components/Maestros/Parciales/Parcial";

export default function Parciales() {
  const { id } = useParams();
  const materia = id;

  //define la constante donde se guardan los datos
  const [parcial, setParciales] = useState([]);

  //Llama a firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerMaterias = () => {
      firebase.db.collection("parciales").onSnapshot(manejarSnapshotParcial);
    };

    obtenerMaterias();
  }, []);

  //Materias
  //llamado ala base en tiempo real
  function manejarSnapshotParcial(snapshot) {
    const parcial = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    //   //alamacena en el useState
    setParciales(parcial);
  }

  return (
    <div className="w-full h-screen lg:flex">
      <NavbarAdmin />

      <div className="p-4 pt-10  sm:ml-64 w-full">
        <h1 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white md:text-6xl lg:text-6xl pt-4 pl-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
              (Materia)
          </span>
        </h1>

        <div className="flex w-full justify-center sm:justify-start mt-10">
          <div className="">
            {parcial.map((parcial) => (
              <Parcial key={parcial.id} parciales={parcial} materia={materia} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
