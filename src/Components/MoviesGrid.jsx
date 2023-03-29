import { MovieCard } from './MovieCard';// Importar el componente MovieCard desde el archivo MovieCard.js
import styles from '../Styles/MoviesGrid.module.css';// Importar estilos para el componente MoviesGrid
import { useEffect, useState } from 'react';// Importar los hooks useState y useEffect desde React
import { get } from '../utils/httpsClient';// Importar la función "get" desde el módulo "httpsClient" ubicado en el archivo httpsClient.js
import { Spinner } from "../Components/Spinner";// Importar el componente Spinner desde el archivo Spinner.js
import InfiniteScroll from 'react-infinite-scroll-component';// Importar el componente InfiniteScroll desde la librería "react-infinite-scroll-component"
import { Empty } from './Empty';

export function MoviesGrid( { search } ) {
  const [movies, setMovies] = useState([]);// Lista de películas
  const [isLoading, setIsLoading] = useState(true);// Indicador de carga
  const [page, setPage] = useState(1);// Página actual
  const [hasMore, setHasMore] = useState(true);// Indicador de si hay más resultados para mostrar

  useEffect(() => {// Definir efecto secundario que se ejecuta cuando se monta o actualiza el componente
    setIsLoading(true);// Iniciar la carga de datos
    const searchUrl = search// Definir la URL de la API a la que se hará la petición según el término de búsqueda y la página actual
      ? "/search/movie?query=" + search + "&page=" + page
      : "/discover/movie?page=" + page;
    get(searchUrl).then((data) => {// Realizar petición GET a la API
      // Filtrar los resultados que no tienen la propiedad 'id'
      const filteredResults = data.results.filter((result) => result.id);
      // Verificar si los resultados son un array válido
      if (!filteredResults || !Array.isArray(filteredResults)) {
        return;
      }
      setMovies((prevMovies) => {
        // Obtener una lista de los ids de las películas ya agregadas
        const existingIds = prevMovies.map((movie) => movie.id);
        // Filtrar los resultados para excluir las películas que ya se han agregado
        const newMovies = data.results.filter((movie) => !existingIds.includes(movie.id));
        // Concatenar las películas nuevas con las ya existentes
        return prevMovies.concat(newMovies);
      });
      setHasMore( data.page < data.total_pages );// Actualizar el indicador de si hay más resultados para mostrar
      setIsLoading(false);// Finalizar la carga de datos
    });
  }, [search, page]);// Ejecutar el efecto cuando cambien los valores de search y page
  //Si la carga ha finalizado y la lista de películas está vacía, se renderiza un componente Empty.
  if (!isLoading && movies.length === 0) {// Verificar si no hay resultados y no se está cargando datos
    return <Empty />;
  }

  return (// Renderizar el componente
    // Agregar el componente InfiniteScroll para manejar el paginado dinámico
    <InfiniteScroll
      dataLength={movies.length} // Tamaño actual de la lista de películas
      next={ () => setPage( (prevPage) => prevPage + 1 )}
      hasMore={hasMore}
      loader={<Spinner />}
    >
      <ul className={styles.moviesGrid}>
      {movies.map((movie, index) => (//Toma la lista de películas y crea un componente MovieCard para cada una.
      //key es un atributo especial que React utiliza para identificar de manera única cada componente de la lista.
      <MovieCard key={movie.id}//En este caso, se usa su id para generar una clave única.
            movie={movie} />//Recibe la información de la película como una propiedad
        ))}
      </ul>
    </InfiniteScroll>
  );
}