import styles from "./index.module.css"

export default function Footer() {


    return (
        <footer className={styles.footer}>
            <p></p>
            <p className={styles.text}>Created by <a className={styles.primaryLink} href="http://www.ianspeelman.com">Ian Speelman</a></p>
            <a className={styles.link} href="/credits">Credits</a>
        </footer>
    )
}
