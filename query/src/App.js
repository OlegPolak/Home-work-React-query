import { Routes, Route, NavLink, Link } from 'react-router-dom';
import styles from './App.module.css';
import { Suspense, lazy, useState } from 'react';
import PrivateRoutes from './components/PrivateRoutes';


const Home = lazy(() => import('./pages/Home'));
const TodoForm = lazy(() => import('./pages/TodoForm'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <header className={styles.header}>
  <NavLink to='/'>Home</NavLink>
  {isAuthenticated ? (
    <>
      <NavLink to='/addtodo'>Add Todo</NavLink>
      <NavLink to='/about'>About</NavLink>
      <Link
        to='/'
        onClick={() => {
          setIsAuthenticated(false);
          localStorage.removeItem('authData');
        }}
      >
        Log Out
      </Link>
    </>
  ) : (
    <NavLink to='/login'>Login</NavLink>
  )}
</header>

      <div className="App">
        <main>
          <Suspense fallback={'Loading...'}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/addtodo' element={<PrivateRoutes isAuthenticated={isAuthenticated} ><TodoForm /></PrivateRoutes>} />
              <Route path='/about' element={<PrivateRoutes isAuthenticated={isAuthenticated} ><About /></PrivateRoutes>} />
              <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default App;
