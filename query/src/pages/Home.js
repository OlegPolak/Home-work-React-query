import React from 'react'
import styles from '../App.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.divMargin}>
          <h1 className={styles.homeTitle}>Ласкаво просимо</h1>
          <p className={styles.homeText}>Ви завітали на сайт для планування</p>
          <Link to='/addtodo'>&gt;Натисніть,щоб перейти до планування&lt;</Link>
    </div>
  )
}

export default Home
