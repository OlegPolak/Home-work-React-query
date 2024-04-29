import React, { useState } from 'react';
import axios from 'axios';

function TodoForm() {
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleAddTodo = async () => {
    try {
      await axios.post('http://localhost:3030/todos', newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={newTodo.title}
        onChange={handleInputChange}
        minLength={3}
        maxLength={50}
        required
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={newTodo.description}
        onChange={handleInputChange}
        minLength={3}
        maxLength={100}
        required
      />
      <button type="submit" onClick={handleAddTodo}>Додати</button>
    </div>
  );
}

export default TodoForm;
