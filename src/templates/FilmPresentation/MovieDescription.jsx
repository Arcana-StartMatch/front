import {useParams} from "react-router-dom";
import "./movieDescription.css";
import NavBar from "../../Atoms/NavBar";
import React, {useEffect, useState} from "react";
import {retrieveMovieById} from "../../services/filmPresentationServices";
import MovieRating from "../../Atoms/MovieRating";
import MovieComposition from "../../Atoms/MovieComposition";
import MovieBackGround from "../../img/bg/MovieDescription.svg"

const MovieDescription = () => {
    const {idMovie} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rate, setRate] = useState("");
    const [posterURL, setPosterURL] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    const fetchMovieInformations = async () => {
        const data = await retrieveMovieById(idMovie);

        setTitle(data.title);
        setDescription(data.overview);
        setRate(data.vote_average);
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
        <div style={{
            backgroundImage: `url(${MovieBackGround})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            minHeight: `100vh`}}>
            <div style={{margin: "16px"}}>
                <h1 className={"title"}>Titre du film: {title}</h1>
                <div className={"description-container"}>
                    <div className="max-width-50 description">
                        <div style={{marginBottom: "28px"}}>
                            <strong>Date de sortie:</strong> {releaseDate}
                        </div>
                        {description}
                        <MovieRating raiting={rate}/>
                    </div>
                    <div className="poster">
                        <img className={"poster-sizing"} src={posterURL} alt={"Affiche du film: " + title}/>
                    </div>
                </div>
                <hr style={{margin: "32px 0", width: "90%"}}/>
                <MovieComposition idMovie={idMovie} />
            </div>
        </div>
    );
};

export default MovieDescription;