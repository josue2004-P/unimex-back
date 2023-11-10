import { useEffect, useState, useContext } from "react";
import Menus from "../../components/user/Menus";
import { FirebaseContext } from "../../firebase";


export default function Menu() {

          // definir el state para los platillos
          const [ menus, setMenus ] = useState([]);
          //Llamadoa la clase de firebase
          const { firebase } = useContext(FirebaseContext);
      
          // consultar la base de datos al cargar
          useEffect(() => {
              const obtenerMenus=  () => {
                 firebase.db.collection('productos').onSnapshot(manejarSnapshot);
              }
              //llamado ala funcion
              obtenerMenus();
          }, []);
      
          // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
          function manejarSnapshot(snapshot) {
              const menus = snapshot.docs.map(doc => {
                  return {
                      id: doc.id,
                      ...doc.data()
                  }
              });
      
              // almacenar los resultados en el state
              setMenus(menus);
          }

  return (

<div className='bg-black  h-screen'>
    <section >
        <div className="container mx-auto  items-center flex-wrap pt-4 ">         
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a className="font-bold text-white text-3xl " href="/">
                Pasteles
            </a>
            </div>
        </nav>
        </div>
    </section>
        
    <div className="bg-black flex justify-center">
        <div className="grid grid-cols-4 gap-32  max-[420px]:grid-cols-1  max-[420px]:gap-2 ">            
        {menus.map( menu => (
                    <Menus
                        key={menu.id}
                        menu={menu}
                    />
        ))}
        </div>
    </div>
    </div>
  )
}
