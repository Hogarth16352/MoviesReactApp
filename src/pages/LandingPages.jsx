import { useSearchParams } from "react-router-dom";
import { MoviesGrid } from "../Components/MoviesGrid"
import { Search } from "../Components/Search"
import { useDebounce } from "../Hooks/useDebounce";

export const LandingPages = () => {
  const [query] = useSearchParams();
  const search = query.get( "search" );
  const debouncedSearch = useDebounce( search , 300 );//Para que no se haga la busqueda inmediatamente
  return (
    <div>
      <Search />
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
    </div>
  );
}