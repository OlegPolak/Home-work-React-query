import { Routes, Route, Link } from 'react-router-dom';

import TodoForm from './TodoForm';
import styles from './App.module.css';
import Home from './Home';
import About from './About';


function App() {

  return (
    <>
     <header className={styles.header}>
        <Link to='/'>Home</Link>
        <Link to='/addtodo'> AddTodo</Link> 
        <Link to='/about'>About</Link>
      </header>
       
    <div className="App">

      <main>
        <Routes>
            <Route path='/' element={<Home/>} />
          <Route path='/addtodo' element={<TodoForm/>}/>
            <Route path='/about' element={<About/>} />
          <Route path='/404' element/>
        </Routes>
      </main>
        
    </div>
    </>
   
  );
}

export default App;
