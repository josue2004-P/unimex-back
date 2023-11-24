import NavbarAdmin from "../../components/Maestros/NavbarAdmin";

export default function Maestros() {
  return (
    <>
      <div className="w-full h-screen sm:flex ">

        <NavbarAdmin />

        <div className="p-4 w-full sm:pl-64">
          <div className="w-full  text-gray-900 font-semibold whitespace-nowrap xl:flex text-center xl:text-left">
            <h1 className=" xl:mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl p-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
                Bienvenida
              </span>
            </h1>
            <h1 className=" xl:mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl px-4 xl:px-0 xl:p-4">
              <span >
                Maestra Heidy
              </span>
            </h1>
          </div>

          <section className=" xl:w-[80%] mx-auto mt-10"> 
            <div className="flex justify-center ">
              
              <div className="grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-4">

                <div className=" shadow-xl max-[450px]:max-w-sm max-w-sm p-6 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 border-l-[#e34c26] border-l-4">
                  <div>
                    <p className="text-xl font-semibold text-[#e34c26] mb-2">
                      Tareas Completadas
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/5 ">
                      <p className="text-xl font-semibold">80%</p>
                    </div>
                    <div className="w-4/5 bg-gray-200 rounded-xl">
                      <div className="w-4/5 h-2 rounded-xl bg-[#e34c26]"></div>
                    </div>
                  </div>
                </div>
                <div className="skill_2 shadow-xl max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 border-l-[#264de4] border-l-4">
                  <div>
                    <p className="text-xl font-semibold text-[#264de4] mb-2">
                      Tareas Pendientes
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/5 ">
                      <p className="text-xl font-semibold">70%</p>
                    </div>
                    <div className="w-4/5 bg-gray-200 rounded-xl">
                      <div className="w-[70%] h-2 rounded-xl bg-[#264de4]"></div>
                    </div>
                  </div>
                </div>
                <div className="shadow-xl max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 border-l-[#F0DB4F] border-l-4">
                  <div>
                    <p className="text-xl font-semibold text-[#F0DB4F] mb-2">
                      Tareas Pasadas de Fecha
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/5 ">
                      <p className="text-xl font-semibold">65%</p>
                    </div>
                    <div className="w-4/5 bg-gray-200 rounded-xl">
                      <div className="w-[65%] h-2 rounded-xl bg-[#F0DB4F]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          

        </div>
      </div>
    </>
  );
}
