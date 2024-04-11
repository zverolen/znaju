import { NavLink } from "react-router-dom"

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1><NavLink className="link logo" to="/"><span>Знаю!</span></NavLink></h1>
      <div>
        <button className="link">Инструкция</button>
        <NavLink className="link" to="/account"><span>Аккаунт</span></NavLink>
      </div>
    </header>
  )
}