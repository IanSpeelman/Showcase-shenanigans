import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./index.module.css"
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { user, jwtData } from '../../types'

type LoginProps = {
  setUser: ({ id, email, role }: user) => void
};


const Login = ({ setUser }: LoginProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const response = await fetch("http://localhost:5002/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: email.toLowerCase(),
        Password: password,
        Role: "user",
        FirstName: "",
        LastName: "",
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
    else {
      setPassword('')
      setError(true)
      setTimeout(() => setError(false), 1000)

    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Log in!</h1>
        <form className={styles.form} onSubmit={HandleSubmit}>
          <input className={`${styles.input} ${error && styles.error}`} value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="E-Mail" />
          <input className={`${styles.input} ${error && styles.error}`} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
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
