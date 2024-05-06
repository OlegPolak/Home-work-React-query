import React from 'react'
import styles from './App.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
      <div className={styles.divMarginAbout}>
          <h3 className={styles.aboutTitle}>Опис сайту</h3>
          <p className={styles.aboutText}>Цей код - це компонент <u>React</u>, який відповідає за форму додавання нових завдань (todo). Давай розберемо його по частинах:</p>
          <ul className={styles.aboutList}>
              <li>
                  <span className={styles.itemTitle}>Імпорти:</span> Код починається з імпорту необхідних бібліотек та файлів.
                  Він використовує бібліотеки <u>React</u> та <u>Axios</u> для роботи з <u>React-компонентами</u> та виконання <u>HTTP-запитів</u> відповідно.
              </li>
              <li>
                  <span className={styles.itemTitle}>Стан компонента:</span> Використовується хук <mark>&lt;useState&gt;</mark> для збереження стану компонента. <u>todos</u> зберігає список завдань, <mark>&lt;newTodo&gt;</mark> містить дані нового завдання,
                  <mark>&lt;isPosting&gt;</mark> вказує на те, чи відбувається відправка даних на сервер, а <mark>&lt;showCreateForm&gt;</mark> вказує на те, чи відображається форма для створення нового завдання.
              </li>
              <li>
                <span className={styles.itemTitle}>Ефект компонента:</span> Використовується хук <mark>&lt;useEffect&gt;</mark> для отримання списку завдань з сервера після того, як компонент був відображений у <u>DOM</u>.
              </li>
              <li>
                  <span className={styles.itemTitle}>Функції обробників подій:</span> <mark>&lt;handleInputChange&gt;</mark> оновлює <mark>&lt;newTodo&gt;</mark> при зміні введених користувачем даних.
                  <mark>&lt;handleAddTodo&gt;</mark> відправляє нове завдання на сервер та оновлює стан компонента.
              </li>
              <li>
                  <span className={styles.itemTitle}>Функція відображення форми додавання завдань:</span> Відображається форма для додавання нового завдання, якщо <mark>&lt;showCreateForm&gt;</mark> має значення true.
                  В іншому випадку виводиться повідомлення про відсутність завдань і кнопка для відображення форми.
              </li>
              <li>
                  <span className={styles.itemTitle}>Рендеринг компонента:</span> Відображення форми додавання завдань та списку завдань.
                  Кнопка "Додати" має властивість disabled, яка встановлюється, коли <mark>&lt;isPosting&gt;</mark> має значення true,
                  щоб запобігти подвійному натисканню під час відправки даних на сервер.
              </li>
          </ul>
          <p>Цей компонент використовується для взаємодії з користувачем у додаванні нових завдань у додатку.</p>
           <Link to='/'>&gt;Натисніть,щоб перейти на головну сторінку&lt;</Link>
    </div>
  )
}

export default About
