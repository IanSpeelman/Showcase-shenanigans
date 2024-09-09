import { Link } from 'react-router-dom'
import styles from "./index.module.css"




const Login = () => {




  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Log in!</h1>
        <form className={styles.form}>
          <input className={styles.input} type="text" name="email" placeholder="E-Mail" />
          <input className={styles.input} type="password" name="password" placeholder="Password" />
          <div className={styles.buttons}>
            <button className={styles.button} type="submit">Log In</button>
            <Link to='/register' className={styles.link}>Don't have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}




export default Login
