import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import styles from "./index.module.css"
import { user, jwtData } from '../../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'

type RegisterProps = {
  setUser: (arg0: user) => void
};

const Register = ({ setUser }: RegisterProps) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
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

  const navigate = useNavigate();

  const passwordConstraints = specialCharacters && capitals && lowerCase && numbers && password.length >= 8

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const response = await fetch("http://localhost:5002/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: email.toLowerCase(),
        Password: password,
        Role: "user",
        FirstName: firstName,
        LastName: lastName,
      })
    })
    const data = await response.json()
    if (response.ok) {
      localStorage.setItem("JWT_token", data.token)
      const decodedToken = jwtDecode<JwtPayload & jwtData>(data.token)
      setUser({
        id: decodedToken.sub ? parseInt(decodedToken.sub) : 0,
        email: decodedToken.unique_name,
        role: decodedToken.role,
        firstName: decodedToken.FirstName,
        lastName: decodedToken.LastName,
      })
      navigate('/')
    }
  }







  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Register!</h1>
        <form className={styles.form} onSubmit={HandleSubmit}>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${firstName.length && styles.correct}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" placeholder="First Name" required />
            <FontAwesomeIcon className={`${firstName.length ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${lastName.length && styles.correct}`} value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" placeholder="Last Name" required />
            <FontAwesomeIcon className={`${lastName.length ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${emailMatch && styles.correct} ${email.length && styles.warn}`} value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="E-Mail" required />
            <FontAwesomeIcon className={`${emailMatch ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${email === confirmEmail && emailMatch && styles.correct} ${confirmEmail.length && styles.warn}`} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} type="email" name="email-confirm" placeholder="Confirm your E-Mail" required />
            <FontAwesomeIcon className={`${email === confirmEmail && email.length ? styles.icon : styles.hidden}`} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${passwordConstraints && styles.correct} ${password.length && styles.warn}`} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
            <FontAwesomeIcon className={passwordConstraints ? styles.icon : styles.hidden} icon={faCheck} />
          </div>
          <div className={styles.inputcontainer}>
            <input className={`${styles.input} ${passwordConstraints && password === confirmPassword && styles.correct} ${confirmPassword.length && styles.warn}`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="password-confirm" placeholder="Confirm your Password" />
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
