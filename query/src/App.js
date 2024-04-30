
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import  axios  from 'axios'
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  

  useEffect(() => {
    const getTodosList = async () => {
      try{const todosList = await axios.get(`http://localhost:3030/todos`);
        setTodos(todosList.data);
      } catch (error) {
        console.error('Помилка', error);
      }
    };
    getTodosList();
  }, []);

  console.log(todos);

  
  const handleAddTodo = async () => {
  try {
    await axios.post('http://localhost:3030/todos');
  } catch (error) {
    console.error('Error adding todos:', error);
  }
};

  return (
    <div className="App">
      <form onSubmit={handleAddTodo}>
        <label  htmlFor="todos-input">Нове завдання:</label>
        <>
          {todos.length === 0 ? (
             <div>
               <p>Наразі у вас немає ще завдань</p>
               <button className={styles.btnAdd} type='submit'>Додати</button>
             </div>) : (<TodoForm/>)}
        </>
      </form>

      <TodoList/>
     
    </div>
  );
}

export default App;
