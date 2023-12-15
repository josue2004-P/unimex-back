import { useContext, useEffect, useState } from "react";
import NavbarAdmin from "../../../../components/Maestros/NavbarAdmin";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../../../../firebase";
import { getAuth } from "firebase/auth";
import AlumnoTarea from "../../../../components/Maestros/Tareas/AlumnoTarea";
import AlumnoNoTarea from "../../../../components/Maestros/Tareas/AlumnoNoTarea";

export default function DetallesTareas({}) {
  //TRAE ID DE URL
  const { id, mat, par } = useParams();

  // Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  //useState
  const [titulo, setTitulo] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [grupo, setGrupo] = useState([]);
  const [tarea, setTarea] = useState([]);

  //FUNCION PARA BUSCAR POR TAREA
  useEffect(() => {
    obtenerCursos(id);
  }, [id]);

  const obtenerCursos = (id) => {
    firebase.db.collection("tareas").doc(id).onSnapshot(manejarSnapshot);
  };

  function manejarSnapshot(doc) {
    if (doc.exists) {
      const maestro = doc.data();
      setTitulo(maestro.titulo);
      setDescripcion(maestro.descripcion);
      setGrupo(maestro.grupo);
      setTarea(maestro);
    } else {
      console.log("No such document!");
    }
  }

  //FUNCION BUSCAR ALUMNOS
  const auth = getAuth();

  const user = auth.currentUser;

  //user
  const uid = user.uid;

  //define la constante donde se guardan los datos
  const [state, setState] = useState({});

  const [alumnos, setAlumnos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [siEntregadas, setSiEntregadas] = useState([]);
  const [noEntregadas, setNoEntregadas] = useState([]);

  useEffect(() => {
    const obtenerAlumnos = () => {
      if (
        Array.isArray(state.materiaMaestro) &&
        state.materiaMaestro.length > 0
      ) {
        firebase.db
          .collection("alumnos")
          .where("materias", "array-contains-any", state.materiaMaestro)
          .where("id_grupo", "==", state.grupoMaestro)
          .onSnapshot(manejarSnapshotAlumnos);
      }
    };

    const obtenerEntregas = () => {
      if (
        Array.isArray(state.materiaMaestro) &&
        state.materiaMaestro.length > 0
      ) {
        firebase.db
          .collection("entregas")
          .where("tarea", "==", id)
          .where("maestro", "==", uid)
          .where("materia", "==", mat)
          .where("parcial", "==", par)

          .onSnapshot(manejarSnapshotEntregas);
      }
    };

    const obtenerMaestros = () => {
      firebase.db
        .collection("usuarios")
        .doc(uid)
        .onSnapshot(manejarSnapshotMaestro);
    };

    obtenerEntregas();
    obtenerMaestros();
    obtenerAlumnos();
  }, [uid, state]);

  //LLAMADA ENTREGAS
  //llamado ala base en tiempo real
  function manejarSnapshotEntregas(snapshot) {
    const entregas = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setSiEntregadas(entregas.map((entrega) => entrega.id_alumno));
    //   //alamacena en el useState
    setEntregas(entregas);
  }

  //llamado ala base en tiempo real
  function manejarSnapshotAlumnos(snapshot) {
    const alumnos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    //   //alamacena en el useState
    setNoEntregadas(alumnos.map((entrega) => entrega.id));
    setAlumnos(alumnos);
  }

  //FUNCION PARA PROBLEMAS CON ARREGLO
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

  // Filtra los elementos en noEntregadas que no están en siEntregadas
  const diferencia = noEntregadas.filter((id) => !siEntregadas.includes(id));
  // Filtra los alumnos cuyo ID está en la diferencia
  const noSubidas = alumnos.filter((alumno) => diferencia.includes(alumno.id));

  // Filtra los alumnos cuyo valor de 'calificado' es true
  const alumnosCalificados = entregas.filter((alumno) => alumno.entregada);

  // Filtra los alumnos cuyo valor de 'calificado' es true
  const alumnosSubidas = entregas.filter((alumno) => !alumno.entregada);

  return (
    <div className="w-full h-screen flex ">
      <NavbarAdmin />

      <div className=" flex justify-center lg:justify-start w-full">
        <div className="p-4 sm:ml-64 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 ">
            <div className=" text-gray-900 font-semibold ">
              <div className="">
                <h1 className=" text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl pt-4 px-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
                    {titulo}
                  </span>
                </h1>
              </div>
              <div>
                <h1 className="  text-xl font-bold text-gray-900 dark:text-white md:text-xl lg:text-3xl px-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
                    {descripcion}
                  </span>
                </h1>
              </div>
              <div>
                <h1 className="px-4">Grupo: {grupo}</h1>
              </div>
              <div>
                <h1 className="px-4">Fechas: 14 octubre 2029</h1>
              </div>
              <div className="bg-emerald-600 mt-5 mx-4 h-1"></div>
              <div className="my-10 mx-4">documento</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3" >
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Alumnos Calificados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td
    
                      className=""
                    >
                      {alumnosCalificados.map((alumno) => (
                        <AlumnoTarea key={alumno.id} alumno={alumno} />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Alumnos Subidas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="px-6 py-4">
                      {alumnosSubidas.map((alumno) => (
                        <AlumnoTarea
                          key={alumno.id}
                          alumno={alumno}
                          tarea={tarea}
                        />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Alumnos No Entregados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="px-6 py-4">
                      {noSubidas.map((alumno) => (
                        <AlumnoNoTarea key={alumno.id} alumno={alumno} />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
