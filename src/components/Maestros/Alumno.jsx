import { useContext,useState,useEffect } from "react";
import { FirebaseContext } from "../../firebase";

import { getAuth } from "firebase/auth";

export default function Alumno({ alumno }) {

  const auth = getAuth();

  const user = auth.currentUser;

  //user
  const uid = user.uid;

  // context de firebase para cambios en la BD
  const { firebase } = useContext(FirebaseContext);

  const { id, nombre, apellido, edad, id_grupo, materias } = alumno;

    //define la constante donde se guardan los datos
    const [maestro, setMaestro] = useState([]);

    useEffect(() => {

      const obtenerMaestros = () => {
        firebase.db.collection("usuarios").doc(uid).onSnapshot(manejarSnapshotMaestro);
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

 
     const materia = maestro.filter(element => materias.includes(element));
     

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
    </tr>
  );
}
