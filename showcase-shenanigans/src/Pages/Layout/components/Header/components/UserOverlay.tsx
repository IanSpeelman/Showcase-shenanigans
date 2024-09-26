import { useState, useRef, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import styles from './UserOverlay.module.css'
import { user } from '../../../../../utils/types';

type UserOverlayProps = {
    hidden: boolean,
    setHidden: (arg0: boolean) => void
    user: user | null,
    setUser: (arg0: user | null) => void,
}

export default function UserOverlay({ hidden, setHidden, user, setUser }: UserOverlayProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const modalRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLFormElement
            if (modalRef.current && !modalRef.current.contains(target) && !modalRef.current?.parentElement?.parentElement?.contains(target)) {
                setHidden(true);
            }
        }

        if (!hidden) {
            document.addEventListener('mousedown', handleClick)
        }
        else {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [hidden, setHidden])

    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        const body = {
            id: 0,
            email: email,
            password: password,
            role: "",
            firstName: "",
            lastName: ""
        }

        const result = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (result.ok) {
            const data = await result.json();
            localStorage.setItem("JWT_Token", data.token)
            setUser(data.user)
            setEmail("")
            setPassword("")
            setHidden(true)
        }
        else {
            setPassword("")
        }
    }

    function handleLogout() {
        localStorage.removeItem("JWT_Token")
        setUser(null);
        setHidden(true)
    }

    function closeModal() {
        setHidden(true)
    }

    if (user) return (
        <form className={styles.overlay} ref={modalRef}>
            <Link onClick={closeModal} to="/" className={`${styles.row} ${styles.mobile}`}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><path d="M51.61,25.21,33.2,11.4a2,2,0,0,0-2.4,0L12.39,25.21a2,2,0,0,0-.8,1.6V53.45a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V45a2,2,0,0,1,2-2h7a2,2,0,0,1,2,2v8.45a2,2,0,0,0,2,2H50.41a2,2,0,0,0,2-2V26.81A2,2,0,0,0,51.61,25.21Z" /></svg>
                <p className={styles.text}>Home</p>
            </Link>
            <Link onClick={closeModal} to="/movies" className={`${styles.row} ${styles.mobile}`}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><rect x="7.71" y="19.74" width="49.13" height="30.76" strokeLinecap="round" strokeLinejoin="round" /><rect x="12.93" y="24.62" width="32.96" height="21" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22.8 10.1 32.28 19.74 40.9 9.35" strokeLinecap="round" strokeLinejoin="round" /><polyline points="51.28 25.63 51.28 25.63 51.78 25.63" strokeLinecap="round" /><polyline points="51.28 30.75 51.28 30.75 51.78 30.75" strokeLinecap="round" /></svg>
                <p className={styles.text}>Movies</p>
            </Link>
            <Link onClick={closeModal} to="/bookings" className={styles.row}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><path d="M58.13,37.74,16.62,54.46,14.69,49s4.08-2.13,2.74-5.84-6.19-2.9-6.19-2.9L9.35,34.64,51,18.21l2.06,4.87S48.62,25.79,50,29.63s6.25,2.94,6.25,2.94Z" /><line x1="18.5" y1="31.04" x2="20.77" y2="36.18" strokeDasharray="9 4" /><line x1="21.83" y1="38.65" x2="23.75" y2="42.99" strokeDasharray="9 4" /><line x1="24.47" y1="45.04" x2="26.75" y2="50.18" strokeDasharray="9 4" /><path d="M9.4,34.54,41.52,10.71l3.38,4.06s-3.47,3.89-1,7.15" /></svg>
                <p className={styles.text}>My Bookings</p>
            </Link>
            <div onClick={handleLogout} className={styles.row}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><rect x="12.34" y="25.5" width="39.32" height="30.95" rx="1.5" /><path d="M32,7.55h0A11.29,11.29,0,0,1,43.29,18.84V25.5a0,0,0,0,1,0,0H20.71a0,0,0,0,1,0,0V18.84A11.29,11.29,0,0,1,32,7.55Z" /><circle cx="32" cy="42.83" r="3.76" /><line x1="32" y1="46.6" x2="32" y2="51.83" /></svg>
                <p className={styles.text}>Log Out</p>
            </div>
        </form >
    )

    return (
        <form className={styles.overlay} ref={modalRef}>
            <Link onClick={closeModal} to="/" className={`${styles.row} ${styles.mobile}`}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><path d="M51.61,25.21,33.2,11.4a2,2,0,0,0-2.4,0L12.39,25.21a2,2,0,0,0-.8,1.6V53.45a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V45a2,2,0,0,1,2-2h7a2,2,0,0,1,2,2v8.45a2,2,0,0,0,2,2H50.41a2,2,0,0,0,2-2V26.81A2,2,0,0,0,51.61,25.21Z" /></svg>
                <p className={styles.text}>Home</p>
            </Link>
            <Link onClick={closeModal} to="/movies" className={`${styles.row} ${styles.mobile}`}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><rect x="7.71" y="19.74" width="49.13" height="30.76" strokeLinecap="round" strokeLinejoin="round" /><rect x="12.93" y="24.62" width="32.96" height="21" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22.8 10.1 32.28 19.74 40.9 9.35" strokeLinecap="round" strokeLinejoin="round" /><polyline points="51.28 25.63 51.28 25.63 51.78 25.63" strokeLinecap="round" /><polyline points="51.28 30.75 51.28 30.75 51.78 30.75" strokeLinecap="round" /></svg>
                <p className={styles.text}>Movies</p>
            </Link>
            <div className={styles.row}>
                <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-Mail" />
            </div>
            <div className={styles.row}>
                <input className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </div>
            <div className={styles.row}>
                <button className={styles.button} onClick={handleLogin}>Log In</button>
            </div>
            <div onClick={closeModal} className={styles.row}>
                <Link to="/register" className={styles.textcenter}>No Account?</Link>
            </div>
        </form >
    )
}
