import React, {useEffect, useState} from "react";
import "./caroussel.css";
import NavBar from "../NavBar/NavBar";
import {retrievePredictsMovie} from "../../services/filmPresentationServices";
import Rating from "../Rating/Rating";

export default function Caroussel({...props}) {
    const dataForm = JSON.parse(localStorage.getItem("YMtach-preferences"));
    const [predictMovies, setPredictMovies] = useState([]);

    if (dataForm === null) {
        window.location.href = "/";
    }

    const fetchPredictMovies = async () => {
        const data = [
            {
                "Thriller": dataValuePredict("thriller"),
                "Comedy": dataValuePredict("comedy"),
                "Mystery": dataValuePredict("mystery"),
                "Western": dataValuePredict("western"),
                "Crime": dataValuePredict("crime"),
                "Animation": dataValuePredict("animation"),
                "Action": dataValuePredict("action"),
                "War": dataValuePredict("war"),
                "Adventure": dataValuePredict("adventure"),
                "Horror": dataValuePredict("horror"),
                "Romance": dataValuePredict("romance"),
                "Fantasy": dataValuePredict("fantasy"),
                "Foreign": dataValuePredict("foreign"),
                "History": dataValuePredict("history"),
                "TV Movie": dataValuePredict("tv movie"),
                "Family": dataValuePredict("family"),
                "Science Fiction": dataValuePredict("science fiction"),
                "Drama": dataValuePredict("drama"),
                "Music": dataValuePredict("music"),
                "Documentary": dataValuePredict("documentary"),
                "age": parseInt(dataForm.old),
                "kidhome": dataForm.childChoice,
                "teenhome": dataForm.teenagerChoice,
                "rating": dataForm.bestMovieRate,
                "marital_status": dataForm.maritalStatus,
                "education": dataForm.education,
                "movieId": dataForm.bestMovie.movieId
            }
        ];

        const response = await retrievePredictsMovie(data);
        localStorage.setItem("YMtach-preferences-response", JSON.stringify(response));
        setPredictMovies(response);
    }

    useEffect(() => {
        fetchPredictMovies();
    }, []);

    const dataValuePredict = (search) => {
        const found = dataForm.choiceGender.find((element) => (element.data.toLowerCase() === search.toLowerCase()));
        return found !== undefined ? 1.0 : 0.0;
    }

    const handleMovie = (item) => {
        window.location.href = `/movie/${item.id}`;
    };

    const ListPreference = () => {
        return (
            <ul>
                {predictMovies.map((item, index) => (
                    <li key={index} className={"predict-movie"} onClick={() => handleMovie(item)}>
                        <p style={{flex: 1, margin: 0}}>{item.title}</p>
                        <Rating raiting={item.rating}/>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={"container"}>
            <NavBar/>
            <ListPreference/>
        </div>
    );
}
