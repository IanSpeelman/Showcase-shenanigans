import styles from "./Search.module.css"

type SearchProps = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  admin: boolean,
}

const Search = ({ query, setQuery, admin }: SearchProps) => {
  return (
    <div className={styles.search}>
      <input className={`${styles.input} ${admin && styles.admin}`} value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search!" />
      <button className={styles.button}>Search!</button>
    </div>
  )
}



export default Search

