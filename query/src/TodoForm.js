import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';

function TodoForm() {
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false, creationDate: new Date().toISOString() });
  // const [isPostLoading, setIsPostLoading] = useState(false);// Треба вручну оновлювати
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleAddTodo = async () => {
    try {
      // setIsPostLoading(true);// Треба вручну оновлювати
      await axios.post('http://localhost:3030/todos', newTodo);
      setNewTodo({ title: '', description: '', completed: false, creationDate: new Date().toISOString() });
    } catch (error) {
      console.error('Помилка при додаванні todo:', error);
    } finally {
      //  setIsPostLoading(false);// Треба вручну оновлювати
     } 
  };

  return (
    <div className={styles.appForm}>
      <div> <label htmlFor="title">Назва:</label>
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
     
      {/* <button type="submit" disabled={isPostLoading} onClick={handleAddTodo}>{isPostLoading ? 'Loading' : 'Додати' }</button> // Треба вручну оновлювати  */} 
      <button className={styles.btnAdd} type="submit"  onClick={handleAddTodo}>Додати</button>
    </div>
  );
}

export default TodoForm;
