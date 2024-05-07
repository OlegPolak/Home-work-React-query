import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../App.module.css';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [auths, setAuths] = useState([]);
  const [newAuth, setNewAuth] = useState({ name: '', email:'' });
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const getAuthList = async () => {
      try {
        const authsList = await axios.get(`http://localhost:3030/auth`);
        setAuths(authsList.data);
      } catch (error) {
        console.error('Помилка', error);
      }
    };
    getAuthList();
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    if (storedAuth) {
      setNewAuth(JSON.parse(storedAuth));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuth({
      ...newAuth,
      [name]: value
    });
  };

  const handleAddAuth = async () => {
    try {
      setIsPosting(true);
      const existingUser = auths.find(user => user.email === newAuth.email);
      if (!existingUser) {
        await axios.post('http://localhost:3030/auth', newAuth);
      }
      setNewAuth({ name: '', email: '' });
      setErrorMessage('');
      setIsAuthenticated(true);
      setIsRegistered(true);
      navigate('/addtodo', { replace: true }); 
    } catch (error) {
      console.error('Помилка при додаванні auth:', error);
      setErrorMessage('Помилка при реєстрації. Будь ласка, спробуйте ще раз.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddAuth();
    localStorage.setItem('authData', JSON.stringify(newAuth)); 
  };

  return (
    <div className={styles.divMargin}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h3>Реєстрація</h3>
        <p>Зареєструйтесь та розпочніть!</p>
        <div>
          <input
            className={styles.inputLog}
            type="text"
            placeholder="Ім'я"
            id="name"
            name="name"
            value={newAuth.name}
            onChange={handleInputChange}
            minLength={3}
            maxLength={50}
            required
          />
        </div>
        <div>
          <input
            className={styles.inputLog}
            type="email"
            placeholder="Електронна пошта"
            id="email"
            name="email"
            value={newAuth.email}
            onChange={handleInputChange}
            minLength={3}
            maxLength={100}
            required
          />
        </div>
        <button className={styles.btnAdd} type="submit" disabled={isPosting}>
          {isPosting ? 'Зачекайте...' : 'Стартувати'}
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
