import {useState} from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   {id: 1, description: "Pasaporte", quantity: 1, packed: false},
//   {id: 2, description: "Pares de medias", quantity: 12, packed: false},
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

  const handleClearList = () => {
    const response = window.confirm(
      "Esta acción va a reiniciar la lista. Confirmás esta operación?"
    );
    if (response) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
