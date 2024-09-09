import { useState } from 'react'
import { Link } from "react-router-dom"
import styles from "./index.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'



const Register = () => {

  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const emailRegex = /[a-z,0-9,-,+]+@[a-z,0-9]+\.[a-z,0-9]+/gi
  const emailMatch = email.match(emailRegex)
  const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const capitals = /[A-Z]/.test(password)
  const lowerCase = /[a-z]/.test(password)
  const numbers = /[0-9]/.test(password)

  const passwordConstraints = specialCharacters && capitals && lowerCase && numbers && password.length >= 8

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Register!</h1>
        <form className={styles.form}>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${emailMatch && styles.correct} ${email.length && styles.warn}`} value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="E-Mail" />
            <FontAwesomeIcon className={`${emailMatch ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${email === confirmEmail && emailMatch && styles.correct} ${confirmEmail.length && styles.warn}`} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} type="text" name="email-confirm" placeholder="Confirm your E-Mail" />
            <FontAwesomeIcon className={`${email === confirmEmail && email.length ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${passwordConstraints && styles.correct} ${styles.warn}`} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
            <FontAwesomeIcon className={passwordConstraints ? styles.icon : styles.hidden} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${passwordConstraints && password === confirmPassword && styles.correct} ${styles.warn}`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="password-confirm" placeholder="Confirm your Password" />
            <FontAwesomeIcon className={`${passwordConstraints && password === confirmPassword ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} type="submit">Register!</button>
            <Link to='/login' className={styles.link}>Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}




export default Register
