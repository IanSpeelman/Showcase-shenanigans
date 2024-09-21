import { movie } from "../../../utils/types"
import styles from "./Trailer.module.css"

type TrailerProps = {
    Movie: movie,
}


export default function Trailer({ Movie }: TrailerProps) {
    return (
        <div className={styles.container}>
            <img className={styles.thumbnail} src={Movie.thumbnail} alt={Movie.title} />
            <div className={styles.filter}>
                <svg className={styles.play} stroke="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" id="play">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#A52020", stopOpacity: 0.85 }} />
                            <stop offset="100%" style={{ stopColor: "#C85C21", stopOpacity: 0.85 }} />
                        </linearGradient>
                    </defs>

                    <path className={styles.fill} fill="url(#gradient)" d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"></path>
                </svg>

            </div>
        </div>
    )
}
