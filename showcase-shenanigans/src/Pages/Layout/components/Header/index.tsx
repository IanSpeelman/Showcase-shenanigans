import { Link } from "react-router-dom";
import logo from "../../../../Assets/logo.png"
import styles from "./index.module.css"
import UserOverlay from "./components/UserOverlay";
import { user } from "../../../../utils/types";


type HeaderProps = {
    user: user | null,
    setUser: (arg0: user | null) => void,
    hidden: boolean,
    setHidden: (arg0: boolean) => void
}


export default function Header({ hidden, setHidden, user, setUser }: HeaderProps) {



    function toggleOverlay() {
        setHidden(!hidden);
    }


    return (
        <header className={styles.header}>
            <Link to="/">
                <img className={styles.logo} src={logo} alt="Logo" />
            </Link>
            <div className={styles.navigation}>
                <Link className={styles.link} to="/movies">Movies</Link>
                <div className={styles.anchor}>
                    <svg className={styles.profile} onClick={toggleOverlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="3" stroke="currentColor" fill="none"><circle cx="32" cy="18.14" r="11.14" /><path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" /></svg>
                    <div className={`${styles.overlay} ${hidden && styles.hidden}`}>
                        <UserOverlay user={user} setUser={setUser} setHidden={setHidden} hidden={hidden} />
                    </div>
                </div>
            </div>
        </header>
    )
}
