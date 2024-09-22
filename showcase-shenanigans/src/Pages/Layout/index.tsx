import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import styles from './index.module.css'
import { user } from "../../utils/types"

type LayoutProps = {
    user: user | null,
    setUser: (arg0: user | null) => void,
}


export default function Layout({ user, setUser }: LayoutProps) {

    return (
        <div className={styles.contentWrapper}>
            <Header user={user} setUser={setUser} />
            <Outlet />
            <Footer />
        </div>
    )
}



