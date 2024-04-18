import './App.css';
import Caroussel from "./Atoms/Caroussel/Caroussel";
import MovieDescription from "./templates/FilmPresentation/MovieDescription";
import {Route, Routes} from 'react-router-dom';
import Formulaire from './templates/Formulaire/Formulaire';
import {MovieContext, MovieProvider} from "./Context/MovieProvider";
import {useContext, useState} from "react";

function App() {
    const movieContext = useContext(MovieContext)
    const [movieTitle, setMovieTitle] = useState(movieContext)

    return (
        <MovieProvider value={{
            setMovieTitle: (movieTitle) => setMovieTitle(movieTitle),
            movieTitle: movieTitle
        }}>
            <Routes>
                <Route path="/" element={<Formulaire/>}/>
                <Route path="/movie" element={<Caroussel/>}/>
                <Route path="*" element={<Formulaire/>}/>
                <Route path="/movie/:idMovie" element={<MovieDescription/>}/>
            </Routes>
        </MovieProvider>
    );
}

export default App;
