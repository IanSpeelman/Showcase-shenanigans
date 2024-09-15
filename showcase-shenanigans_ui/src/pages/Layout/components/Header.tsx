import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { user } from '../../../types'


type HeaderProps = {
  user: user,
  setUser: (arg0: user) => void
}

const Header = ({ setUser, user }: HeaderProps) => {
  const logout = () => {
    localStorage.removeItem("JWT_token")

    setUser({ id: 0, email: "null", role: "null", firstName: "null", lastName: "null" })

  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Showcase Shenanigans!</h1>
      </header>
      <nav>
        <ul className={styles.ul}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/movies'>Movies</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          {user.id !== 0 && <li><Link to='/profile'>Profile</Link></li>}
          {user.id == 0 && <li><Link to='/login'>Log in</Link></li>}
          {user.id != 0 && <li onClick={logout}>Log out ({user.firstName})</li>}
        </ul>
      </nav>
    </>
  )
}



export default Header
