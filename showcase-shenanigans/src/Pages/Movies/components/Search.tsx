import styles from './Search.module.css'

type SearchProps = {
    query: string,
    setQuery: (arg0: string) => void,
}


export default function Search({ query, setQuery }: SearchProps) {



    return <input className={styles.search} value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" />
}
