import { useParams } from "react-router"; 
import styles from "../Styles/MovieDetails.module.css";
import { useEffect, useState } from "react";
import { get } from "../utils/httpsClient";
import { Spinner } from "../Components/Spinner";
import { getMovieImg } from "../utils/getMovieImg";

export const MovieDetails = () => {  

  const { movieId }  = useParams();
  const [movie, setMovie] = useState( null );
  const [isLoading, setIsLoading] = useState(null);  

  useEffect( () => {
    setIsLoading( true );
    get("/movie/" + movieId).then( (data) => {
      setMovie(data);
      console.log(data);
      setIsLoading( false );
    }); 
  }, [ movieId ]);

  if( isLoading  ){
    return <Spinner />;
  }

  if ( !movie ) {
    return null;
  }

  const imageUrl = getMovieImg( movie.poster_path, 500);
    // const imageUrl = movie.poster_path 
    // ? "https://image.tmdb.org/t/p/w300" + movie.poster_path 
    // : placeholder;
  return (
    <div className = {styles.detailsContainer}>
        <img 
          className = { `${styles.col} ${styles.movieImage}` } 
          src = { imageUrl } 
          alt = { movie.title } 
        />
        <div className = { `${styles.col} ${styles.movieDetails}` }>
          <p className = { styles.firstItem } >
            <strong>Title: </strong> { movie.title } </p>
          <p>
            <strong>Genres: </strong>{ " " }
            { movie.genres.map( (genre) => genre.name).join(", ") }
          </p>
          <p>
            <strong> Description: </strong> { movie.overview } 
          </p>
        </div>
    </div>
  );
}
