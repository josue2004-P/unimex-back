export default function Tarea({ tarea }) {
  const { id, titulo, descripcion, grupo, maestro,id_materia } = tarea;

  function click(id) {
    console.log(id);
  }

  return (
    <tr
      key={tarea.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      onClick={() => {
        click(tarea.id);
      }}
    >
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">{titulo}</td>
      <td className="px-6 py-4">{descripcion}</td>
      <td className="px-6 py-4">{grupo}</td>
      <td className="px-6 py-4">{maestro}</td>
      <td className="px-6 py-4">{id_materia}</td>

    </tr>
  );
}
