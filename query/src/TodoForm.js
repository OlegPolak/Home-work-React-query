import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import TodoList from './TodoList';

function TodoForm() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false, creationDate: new Date().toISOString() });
  const [isPosting, setIsPosting] = useState(false); 
  const [showCreateForm, setShowCreateForm] = useState(false); 

  useEffect(() => {
    const getTodosList = async () => {
      try {
        const todosList = await axios.get(`http://localhost:3030/todos`);
        setTodos(todosList.data);
      } catch (error) {
        console.error('Помилка', error);
      }
    };
    getTodosList();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleAddTodo = async () => {
    try {
      setIsPosting(true); 
      await axios.post('http://localhost:3030/todos', newTodo);
      setNewTodo({ title: '', description: '', completed: false, creationDate: new Date().toISOString() });
    } catch (error) {
      console.error('Помилка при додаванні todo:', error);
    } finally {
      setIsPosting(false); 
    }
  };

  const openCreateForm = () => {
    setShowCreateForm(true); 
  };

  return (
    <div className={styles.divMargin}>
      {showCreateForm ? (
        <div>
          <p>Наразі у вас немає ще завдань</p>
          <button className={styles.btnAdd} onClick={openCreateForm}>Додати завдання</button>
        </div> 
      ) : (
       <form className={styles.form} onSubmit={handleAddTodo}>
          <label htmlFor="todos-input">Нове завдання:</label>
          <div>
            <label htmlFor="title">Назва:</label>
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
          </div>
          <div>
            <label htmlFor="description">Опис:</label>
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
          </div>
          <button className={styles.btnAdd} type="submit" disabled={isPosting}>
            {isPosting ? 'Зачекайте...' : 'Додати'}
             </button>
             {/* <button className={styles.btnAdd} type="submit">Додати</button> */}
        </form>
      )}
       <TodoList/>
    </div>
  );
}

export default TodoForm;



