import NavCoodinador from "../../components/Coordinadores/NavbarCoordinador";

export default function Coordinador() {
  return (
    <>
      <div className="w-full h-screen sm:flex ">
        <NavCoodinador />

        <div className="p-4 w-full sm:pl-64">
          <div className="w-full  text-gray-900 font-semibold whitespace-nowrap xl:flex text-center xl:text-left">
            <h1 className=" xl:mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl p-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
                Bienvenid@
              </span>
            </h1>
            <h1 className=" xl:mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl px-4 xl:px-0 xl:p-4">
              <span>Coordinador</span>
            </h1>
          </div>

          <section className=" xl:w-[80%] mx-auto mt-10">
            <div className="flex justify-center ">

            </div>
          </section>
        </div>
      </div>
    </>
  );
}
