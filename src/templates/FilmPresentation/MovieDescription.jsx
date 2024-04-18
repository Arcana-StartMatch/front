import {useParams} from "react-router-dom";
import "./movieDescription.css";
import NavBar from "../../Atoms/NavBar/NavBar";
import React, {useEffect, useState} from "react";
import {retrieveMovieByName} from "../../services/filmPresentationServices";
import MovieRating from "../../Atoms/MovieRating";

const MovieDescription = ({...props}) => {
    const {idMovie} = useParams();
    const dataPreferences = JSON.parse(localStorage.getItem("YMtach-preferences-response"));
    const moviePreference = dataPreferences.find((movie) => (movie.id.toString() === idMovie.toString()));

    if (moviePreference === undefined) {
        window.location.href = "/movie";
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rate, setRate] = useState("");
    const [posterURL, setPosterURL] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    const fetchMovieInformations = async () => {
        const data = await retrieveMovieByName(moviePreference.title);

        setTitle(data.title);
        setDescription(data.overview);
        setRate(moviePreference.rating);
        setPosterURL("https://image.tmdb.org/t/p/original" + data.poster_path);

        const dateObject = new Date(data.release_date);
        const options = {day: "numeric", month: "long", year: "numeric"};
        const formattedDate = dateObject.toLocaleDateString("fr-FR", options);
        setReleaseDate(formattedDate);
    };

    useEffect(() => {
        fetchMovieInformations();
    }, []);


    return (
        <div className={"container"}>
            <NavBar/>
            <div style={{margin: "16px", color: "white"}}>
                <h1 className={"title"}>Titre du film: {title}</h1>
                <div className={"description-container"}>
                    <div className="max-width-50 description">
                        <div style={{marginBottom: "28px"}}>
                            <strong>Date de sortie:</strong> {releaseDate}
                        </div>
                        {description}
                    </div>
                    <div className="poster">
                        <img className={"poster-sizing"} src={posterURL} alt={"Affiche du film: " + title}/>
                    </div>
                </div>
                {/*<MovieComposition idMovie={tmdbIdMovie} />*/}
            </div>
            <MovieRating raiting={rate}/>
        </div>
    );
};

export default MovieDescription;