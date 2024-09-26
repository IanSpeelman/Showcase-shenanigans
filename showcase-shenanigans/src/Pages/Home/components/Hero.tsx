import { Link } from "react-router-dom"
import banner from "../../../Assets/wolf.webp"
import styles from "./Hero.module.css"


export default function Hero() {
    return (
        <div className={styles.hero}>
            <img className={styles.banner} src={banner} alt="banner" />
            <div className={styles.overlay}>
                <div className={styles.textcontainer}>
                    <h2 className={styles.title}>Experience Movies Like Never Before</h2>
                    <p className={styles.text}>Immerse Yourself in Stunning Visuals, Epic Sound, and Unforgettable Stories.</p>
                    <Link to="/movies"><button className={styles.button}>See Movies!</button></Link>
                </div>
            </div>
        </div>

    )
}
