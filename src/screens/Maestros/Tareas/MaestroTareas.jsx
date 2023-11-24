import NavbarAdmin from "../../../components/Maestros/NavbarAdmin";

export default function MaestroTareas() {
  return (
    <div className="w-full h-screen flex">
      <NavbarAdmin />

      <div className="p-4 sm:ml-64 w-full ">
        <div className="w-full text-gray-900 font-semibold whitespace-nowrap">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl p-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-4">
              Tareas
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
