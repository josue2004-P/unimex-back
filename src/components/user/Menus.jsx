
export default function Menus({menu}) {

    const { nombre, cantidad, precio, imagen } = menu;

  return (
    <div className="max-w-sm bg-black ">
    <div className="p-5">
      <a href="#" className="">
        <img className="rounded-md  max-w-sm max-h-56" src={imagen} alt="" />
      </a>
      <a href="#">
        <h5 className="my-2 text-2xl font-bold tracking-tight text-white">{nombre}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-400">{precio}</p>
    </div>
  </div>
  )
}
