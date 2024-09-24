import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import styles from './index.module.css'
import { user } from "../../utils/types"
import { useState } from "react"

type LayoutProps = {
    user: user | null,
    setUser: (arg0: user | null) => void,
}


export default function Layout({ user, setUser }: LayoutProps) {
    const [hidden, setHidden] = useState(true)

    return (
        <div className={styles.contentWrapper}>
            <Header hidden={hidden} setHidden={setHidden} user={user} setUser={setUser} />
            <Outlet context={[setHidden]} />
            <Footer />
        </div>
    )
}



