import axios from "../config/axios";

export async function retrieveMovieById(idMovie) {
    return await retrieveInformations("/movie/" + idMovie);
}

export async function retrieveCreditsByMovie(idMovie) {
    return await retrieveInformations("/movie/" + idMovie + "/credits");
}

const retrieveInformations = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjQ5MjM1ZjRhYmI0Y2MxN2I2MTA2MGI0N2U1OWI1MiIsInN1YiI6IjYwNThiOTQzYWYyZGE4MDA1NWE0M2NiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rgVMvq3see09Ylgsuw9h3gx1SGooaGDj4gtkDw6iQKs'
        }
    };

    return fetch("https://api.themoviedb.org/3" + url + "?language=fr-FR", options)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => console.error(err));
}