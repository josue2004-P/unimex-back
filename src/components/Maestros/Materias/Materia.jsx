import React from "react";
import { Link } from "react-router-dom";

export default function Materias({ materia }) {
  const {id, nombreMateria, cuatrimestre, id_grupo } = materia;

  return (
    <div className=" w-full mt-10 lg:mt-5">
      <Link
        to={`/maestro/parciales/${id}`}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="  flex  items-center justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-10">
            {nombreMateria}
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
          Cuatrimestre: {cuatrimestre}
        </p>
        <p className="font-medium text-gray-700 dark:text-gray-400">
          Alumnos: 25
        </p>
        <p className="font-medium text-gray-700 dark:text-gray-400">
          Grupo: {id_grupo}
        </p>
      </Link>
    </div>
  );
}
