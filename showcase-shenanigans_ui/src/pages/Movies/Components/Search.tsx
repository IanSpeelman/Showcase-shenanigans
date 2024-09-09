import styles from "./Search.module.css"

type SearchProps = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ query, setQuery }: SearchProps) => {
  return (
    <div className={styles.search}>
      <input className={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search!" />
      <button className={styles.button}>Search!</button>
    </div>
  )
}



export default Search
