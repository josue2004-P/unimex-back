import { useState, useEffect } from "react";

export default function TareaDetalle({ entrega}) {
  const { id, calificacion, tarea, titulo, descripcion } = entrega;


  


  return (
    <div className="mt-5 w-full ">
      <div className=" w-full">
        <div className="w-full pt-5 flex">
          <div className="">
            <p className="text-xl font-bold text-gray-500 uppercase ">
              {titulo}
            </p>
            <p className="text-lg font-medium text-gray-500 uppercase ">
              {descripcion}
            </p>
          </div>
          <div className="ml-10 text-center">
            <p className="font-medium text-lg">Calificacion:</p>
            <p>{calificacion}</p>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
