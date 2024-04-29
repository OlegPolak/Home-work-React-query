
import { useEffect, useState } from 'react';
import './App.css';
import  axios  from 'axios'
import TodoForm from './TodoForm';

function App() {
  const [todos, settodos] = useState([]);
  

  useEffect(() => {
    const gettodosList = async () => {
      try{const todosList = await axios.get(`http://localhost:3030/todos`);
        settodos(todosList.data);
      } catch (error) {
        console.error('Помилка', error);
      }
    };
    gettodosList();
  }, []);

  console.log(todos);

  // 
  const handleAddtodos = async () => {
  try {
    await axios.post('http://localhost:3030/todos');
    // Оновіть список todos або виконайте інші дії за потреби
  } catch (error) {
    console.error('Error adding todos:', error);
  }
};
//   // 
  
//  const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewtodos({
//       ...newtodos,
//       [name]: value
//     });
//  };
   const toggletodosCompletion = (id) => {
    const updatedtodos = todos.map((todos) =>
      todos.id === id ? { ...todos, completed: !todos.completed } : todos
    );
    settodos(updatedtodos);
  };


  return (
    <div className="App">
      <form onSubmit={handleAddtodos}>
        <label htmlFor="todos-input">Нове завдання:</label>
        <>
          {todos.length === 0 ? (
  <div>
    <p>Наразі у вас немає ще завдань</p>
    <button type='submit'>Додати</button>
  </div>
) : (<TodoForm/>)}
        </>
       
      </form>
      <ul>
        {todos.map((todos) => (<li  style={{ textDecoration: todos.completed ? 'line-through' : 'none' }}
            onClick={() => toggletodosCompletion(todos.id)}>{todos.title} {todos.description} <input type="checkbox" checked={todos.completed} onChange={() => {}} /></li>))}
      </ul>
    </div>
  );
}

export default App;
