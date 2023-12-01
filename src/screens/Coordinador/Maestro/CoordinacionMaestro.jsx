import React, { useState } from "react";
import NavCoodinador from "../../../components/Coordinadores/NavbarCoordinador";
import { useAuth } from "../../../context/AuthContext";

export default function CoordinacionMaestro() {
  const [showModal, setShowModal] = useState(true);

  const { registrarUsuario } = useAuth();

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = 1;

    registrarUsuario(email, password, rol);
  }

  return (
    <div className="w-full h-screen sm:flex ">
      <NavCoodinador />

      <div className="p-4 w-full sm:pl-64">
        <div className="w-full text-gray-900 font-semibold whitespace-nowrap xl:flex text-center xl:text-left">
          <h1 className=" xl:mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl p-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
              Maestros
            </span>
          </h1>
          <h1 className=" xl:mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl px-4 xl:px-0 xl:p-4"></h1>
        </div>

        <section className=" xl:w-[80%] mx-auto mt-10">
          <button
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Agregar Maestro
          </button>

          {showModal ? (
            <div className="fixed sm:pl-[15.59rem] z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3  text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="flex justify-between items-center">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-title"
                          >
                            Agrega Maestro
                          </h3>
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setShowModal(false)}
                          >
                            X
                          </button>
                        </div>
                        <div className="mt-2">
                          <form className="p-4 md:p-5" onSubmit={submitHandler}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                              <div className="col-span-2">
                                <label
                                  for="name"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Correo
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Type product name"
                                  required=""
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-1">
                                <label
                                  for="price"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Contraseña
                                </label>
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Password"
                                  required=""
                                />
                              </div>
                              {/* <div class="col-span-2 sm:col-span-1">
                                <label
                                  for="category"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Category
                                </label>
                                <select
                                  id="category"
                                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                  <option selected="">Select category</option>
                                  <option value="TV">TV/Monitors</option>
                                  <option value="PC">PC</option>
                                  <option value="GA">Gaming/Console</option>
                                  <option value="PH">Phones</option>
                                </select>
                              </div> */}
                            </div>
                            <button
                              type="submit"
                              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                className="me-1 -ms-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              Add Maestro
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
