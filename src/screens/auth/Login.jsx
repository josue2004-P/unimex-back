import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import {  Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      await login(email, password);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="h-screen bg-[#004b93] ">
      <section className=" dark:bg-gray-900 h-full ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center p-6">
                <img
                  src="https://nuevoingreso.unimex.edu.mx/img/logo-2020.jpg"
                  className="w-[16rem]"
                  alt=""
                />
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-center">
                Aula Unimex
              </h1>
              {error && <Alert message={error} />}
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Matricula
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="w-full flex justify-end">
                  <Link to="/" 
                    className="text-sm text-[#004b93]"
                   >Cambia o recupera tu contraseña...</Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#004b93] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Iniciar Sesion
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
