import React, { useState } from 'react';
import axios from 'axios';

function EditTodoForm({ todo, onSave }) {
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3030/todos/${todo.id}`, editedTodo);
      onSave(editedTodo);
    } catch (error) {
      console.error('Помилка при редагуванні todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Назва:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editedTodo.title}
          onChange={handleInputChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Опис:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={editedTodo.description}
          onChange={handleInputChange}
          minLength={3}
          maxLength={100}
          required
        />
      </div>
      <button type="submit">Зберегти</button>
    </form>
  );
}

export default EditTodoForm;
