import { useState } from "react";
import { Link } from "react-router-dom";
export default function Tarea({ tarea,materia,parcial }) {
  //Modal
  const [showModal, setShowModal] = useState(false);

  const { id, titulo, descripcion, grupo, maestro, id_materia } = tarea;

  return (
    <div className="mt-5   w-full shadow-xl  bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 border-l-[#264de4] border-l-4">

      <Link to={`/maestro/${parcial}/${materia}/detallestareas/${id}`} className="">
        <span className="flex justify-between items-center h-full  p-5">
          <p className="text-xl font-bold text-gray-500 uppercase ">{titulo}</p>
          <p className="font-medium text-sm">7 noviembre 2023</p>
        </span>
      </Link>
    </div>
  );
}
