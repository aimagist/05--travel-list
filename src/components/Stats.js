export default function Stats({items}) {
  // Early returning as conditional rendering
  if (!items.length)
    return (
      <p className="stats">
        <em>Empezá a armar tu lista de equipaje! 🐣</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "✅ Ya está todo empacado! Listo para salir? 🛫"
          : `💼 Hay ${numItems} cosas en la lista, ya guardaste ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
