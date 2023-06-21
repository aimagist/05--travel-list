import {useState} from "react";

// const initialItems = [
//   {id: 1, description: "Pasaporte", quantity: 1, packed: false},
//   {id: 2, description: "Pares de medias", quantity: 12, packed: true},
//   {id: 3, description: "Cargador", quantity: 12, packed: false},
// ];

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? {...item, packed: !item.packed} : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>❌ Me voy del país ✈️</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      qty,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    setDescription("");
    setQty(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Qué necesitas para tomarte el palo?</h3>

      <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}></input>
      <button>Agregar</button>
    </form>
  );
}

function PackingList({items, onDeleteItem, onToggleItem}) {
  // console.log(items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

const Item = ({item, onDeleteItem, onToggleItem}) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.qty} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

function Stats({items}) {
  // Early returning as conditional rendering
  if (!items.length)
    return (
      <p className="stats">
        <em>Empezá a armar tu lista de equipaje!</em>
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
