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



        </div>
      </div>
    </>
  );
}
