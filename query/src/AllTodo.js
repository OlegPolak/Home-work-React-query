import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import EditTodoForm from './EditTodoForm'; 

const AllTodo = () => {
const [todos, setTodos] = useState([]);
const [editTodoId, setEditTodoId] = useState(null);
const [filter, setFilter] = useState('all');
const [search, setSearch] = useState('');
    
useEffect(() => {
    const getTodosList = async () => {
      try {
        const todosList = await axios.get('http://localhost:3030/todos');
        setTodos(todosList.data);
      } catch (error) {
        console.error('Помилка', error);
      }
    };
    getTodosList();
  }, []);

  const toggleTodosCompletion = async (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      await axios.put(`http://localhost:3030/todos/${id}`, { completed: !todos.find(todo => todo.id === id).completed });
    } catch (error) {
      console.error('Помилка при оновленні todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Помилка при видаленні todo:', error);
    }
  };

  const handleEditTodo = (id) => {
    setEditTodoId(id);
  };

  const handleSaveTodo = (editedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
  };

  const filteredTodos = todos.filter((todos) => {
  if (filter === 'active') {
    return !todos.completed;
  } else if (filter === 'completed') {
    return todos.completed;
  } else {
    return true;
  }
}).filter((todos) => {
  return (
    (todos.title && todos.title.toLowerCase().includes(search.toLowerCase())) ||
    (todos.description && todos.description.toLowerCase().includes(search.toLowerCase()))
  );
});
    
  return (
    <>
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Всі</option>
        <option value="active">Активні</option>
        <option value="completed">Завершені</option>
      </select>
      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className={styles.list}>
  {filteredTodos.map(todo => (
    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {editTodoId === todo.id ? (
        <EditTodoForm todo={todo} onSave={handleSaveTodo} />
      ) : (
        <div className={styles.todosList}>
          {todo.title} {todo.description} {todo.completed} {todo.creationDate}
          <input className={styles.check} type="checkbox" checked={todo.completed} onChange={() => toggleTodosCompletion(todo.id)} />
          <div className={styles.btnColum}>
            <button type="button" onClick={() => handleEditTodo(todo.id)}>Редагувати</button>
            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>Видалити</button>
          </div>
        </div>
      )}
    </li>
  ))}
</ul>
</>
  );
}

export default AllTodo
