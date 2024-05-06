import { Routes, Route, NavLink } from 'react-router-dom';

import TodoForm from './TodoForm';
import styles from './App.module.css';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';



function App() {

  return (
    <>
     <header className={styles.header}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/addtodo'> AddTodo</NavLink> 
        <NavLink to='/about'>About</NavLink>
      </header>
       
    <div className="App">

      <main>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/addtodo' element={<TodoForm />} />
            <Route path='/about' element={<About/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
      </main>
        
    </div>
    </>
   
  );
}

export default App;
