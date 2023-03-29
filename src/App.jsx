import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
// import { MoviesGrid } from './Components/MoviesGrid'
import { LandingPages } from './pages/LandingPages'
import { MovieDetails } from './pages/MovieDetails'
import styles from "./Styles/App.module.css"

export const App = () => {
  return (
    <Router>
        <header>
          <Link to = "/">
            <h1 className = {styles.title}>Movies React App</h1>
          </Link>
        </header>
            <main>
                <Routes>
                  <Route exact path="/movies/:movieId" element = {<MovieDetails />} />
                  <Route path="/" element = {<LandingPages />} />
                  <Route path="*" element = {<Navigate to="/" />} />
                </Routes>
            </main>
    </Router>
  )
}
