import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import styles from './index.module.css'


export default function Layout() {
    return (
        <div className={styles.contentWrapper}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}



