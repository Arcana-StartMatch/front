import './App.css';
import {Route, Routes} from 'react-router-dom';
import Caroussel from "./Atoms/Caroussel";
import MovieDescription from "./templates/FilmPresentation/MovieDescription";

function App() {
    return (
        <Routes>
            <Route path="/movie" element={<Caroussel/>}/>
            <Route path="/movie/:idMovie" element={<MovieDescription/>}/>
        </Routes>
    );
}

export default App;
