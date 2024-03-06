import './App.css';
import Caroussel from "./Atoms/Caroussel/Caroussel";
import MovieDescription from "./templates/FilmPresentation/MovieDescription";
import RechercheFilm from './templates/RechercheFilm/RechercheFilm';
import {Route, Routes} from 'react-router-dom';
import Formulaire from './templates/Formulaire/Formulaire';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Formulaire/>}/>
            <Route path="/movie" element={<Caroussel/>}/>
            <Route path="/movie/:idMovie" element={<MovieDescription/>}/>
            <Route path="/recherche" element={<RechercheFilm/>}/>
        </Routes>
    );
}

export default App;
