import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './UserOverlay.module.css'

type UserOverlayProps = {
    hidden: boolean,
    setHidden: (arg0: boolean) => void
}


export default function UserOverlay({ hidden, setHidden }: UserOverlayProps) {

    const [login, setLogin] = useState(false);

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement
            if (modalRef.current && !modalRef.current.contains(target)) {
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






    if (login) return (
        <div className={styles.overlay} ref={modalRef}>
            <Link to="profile" className={styles.row}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="3" stroke="currentColor" fill="none"><circle cx="32" cy="18.14" r="11.14" /><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" /></svg>
                <p className={styles.text}>Profile</p>
            </Link>
            <Link to="/logout" className={styles.row}>
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke-width="3" stroke="currentColor" fill="none"><rect x="12.34" y="25.5" width="39.32" height="30.95" rx="1.5" /><path d="M32,7.55h0A11.29,11.29,0,0,1,43.29,18.84V25.5a0,0,0,0,1,0,0H20.71a0,0,0,0,1,0,0V18.84A11.29,11.29,0,0,1,32,7.55Z" /><circle cx="32" cy="42.83" r="3.76" /><line x1="32" y1="46.6" x2="32" y2="51.83" /></svg>
                <p className={styles.text}>Log Out</p>
            </Link>
        </div >
    )


    return (
        <div className={styles.overlay} ref={modalRef}>
            <div className={styles.row}>
                <input className={styles.input} type="text" placeholder="E-Mail" />
            </div>
            <div className={styles.row}>
                <input className={styles.input} type="password" placeholder="Password" />
            </div>
            <div className={styles.row}>
                <button className={styles.button}>Log In</button>
            </div>
            <div className={styles.row}>
                <Link to="/register" className={styles.textcenter}>No Account?</Link>
            </div>
        </div >
    )




}
