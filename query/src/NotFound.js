import React from 'react'
import styles from './App.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.divMargin}>
          <h3 className={styles.aboutTitle}>Сторінку не знайдено</h3>
           <Link to='/'>&gt;Натисніть,щоб перейти на головну сторінку&lt;</Link>
    </div>
  )
}

export default NotFound
