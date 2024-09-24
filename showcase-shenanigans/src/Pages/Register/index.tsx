import { useState } from "react"
import styles from './index.module.css'
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()

    const [setHidden] = useOutletContext<[(arg0: boolean) => void]>();

    const [user, setUser] = useState({
        id: 0,
        role: "user",
        firstname: "",
        lastname: "",
        email: "",
        confirmemail: "",
        password: "",
        confirmpassword: ""
    })


    async function handleRegister() {
        if (user.firstname && user.lastname && (user.email === user.confirmemail) && (user.password === user.confirmpassword)) {
            if (user.password.length >= 8 && user.email.includes("@")) {
                const result = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
                    method: "post",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(user)
                })
                if (result.ok) {
                    navigate("/")
                }
            }
        }
    }




    return (
        <div className={styles.container}>
            <div className={styles.inputcontainer}>
                <input className={styles.input} type="text" placeholder="First name" id="firstname" value={user.firstname} onChange={(e) => setUser({ ...user, firstname: e.target.value })} required />
                <input className={styles.input} type="text" placeholder="Last name" id="lastname" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} required />
                <input className={styles.input} type="email" placeholder="E-Mail" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                <input className={styles.input} type="email" placeholder="Confirm your E-Mail" id="confirmemail" value={user.confirmemail} onChange={(e) => setUser({ ...user, confirmemail: e.target.value })} required />
                <input className={styles.input} type="password" placeholder="Password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                <input className={styles.input} type="password" placeholder="Confirm you Password" id="confirmpassword" value={user.confirmpassword} onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })} required />
            </div>
            <button className={styles.button} onClick={handleRegister}>Register</button>
            <p className={styles.link} onClick={() => setHidden(false)}>Already have an account?</p>
        </div >
    )
}
