import styles from "../Styles/Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
    const [query, setQuery] = useSearchParams();
    const search = query.get( "search" );
    const handleSubmit = ( event ) => {
        event.preventDefault();/*Previene el comportamiento por defecto que trae consigo el evento*/
    }
  return (
    <form className = {styles.searchContainer} onSubmit = { handleSubmit } >
        <div className = {styles.searchBox} >
            <input
                className = {styles.searchInput} 
                value={search ?? ""}
                autoFocus
                placeholder="Title"
                aria-label = "Search Movies"
                onChange = { (event) => {
                    const value = event.target.value;
                    setQuery( {search: value} );
                    // navigate("/?search=" + value);
                } }
                type="text" 
            />
                <FaSearch size = {20} color = "black"  className = {styles.searchButton}/>
        </div>
    </form>
  )
}