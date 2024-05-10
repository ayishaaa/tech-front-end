import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const addItem = (itemText) => {
    if (itemText !== '') {
      setItems([...items, { text: itemText, completed: false }]);
    }
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <select
          value={selectedItem}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setSelectedItem(selectedValue);
            addItem(selectedValue);
          }}
        >
          <option value="">Select a suggestion</option>
          <option value="wifi">Wifi</option>
          <option value="swimming pool">Swimming Pool</option>
          <option value="restaurant">Restaurant</option>
          <option value="gym">Gym</option>
        </select>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.text}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;