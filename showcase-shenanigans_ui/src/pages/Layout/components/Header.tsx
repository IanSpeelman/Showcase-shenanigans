import { Link } from 'react-router-dom'
import styles from './Header.module.css'


const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Showcase Shenanigans!</h1>
      </header>
      <nav>
        <ul className={styles.ul}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/movies'>Movies</Link></li>
          <li><Link to='/theatres'>Theatres</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </nav>
    </>
  )
}



export default Header
