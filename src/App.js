import Caroussel from "./Atoms/Caroussel";
import MovieDescription from "./templates/FilmPresentation/MovieDescription";
import './App.css';
import RechercheFilm from './templates/RechercheFilm/RechercheFilm';
import {Route, Routes} from 'react-router-dom';
import Formulaire from './templates/Formulaire/Formulaire';

function App() {
    return (
        <Routes>
            <Route path="/movie" element={<Caroussel/>}/>
            <Route path="/movie/:idMovie" element={<MovieDescription/>}/>
            <Route path="/" element={<Formulaire/>}/>
            <Route path="/recherche" element={<RechercheFilm/>}/>
        </Routes>
    );
}

export default App;
