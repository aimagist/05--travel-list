const initialItems = [
  {id: 1, description: "Pasaporte", quantity: 1, packed: false},
  {id: 2, description: "Pares de medias", quantity: 12, packed: true},
  {id: 3, description: "Cargador", quantity: 12, packed: false},
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>❌ Me voy del país ✈️</h1>;
}

function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Qué necesitas para tomarte el palo?</h3>
      <select>
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..."></input>
      <button>Agregar</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

const Item = ({item}) => {
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};

function Stats() {
  return (
    <footer className="">
      <em>X cosas en la lista, ya guardaste X% </em>
    </footer>
  );
}
