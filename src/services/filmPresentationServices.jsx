export async function retrieveMovieByName(movieName) {
    return await retrieveInformations("/search/movie?query=" + movieName);
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

    return fetch("https://api.themoviedb.org/3" + url, options)
        .then(response => response.json())
        .then(response => {
            return response.results[0];
        })
        .catch(err => console.error(err));
}

export async function retrievePredictsMovie(data) {
    return await predictMovies(data);
}

const predictMovies = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjQ5MjM1ZjRhYmI0Y2MxN2I2MTA2MGI0N2U1OWI1MiIsInN1YiI6IjYwNThiOTQzYWYyZGE4MDA1NWE0M2NiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rgVMvq3see09Ylgsuw9h3gx1SGooaGDj4gtkDw6iQKs'
        },
        body: JSON.stringify(data)
    };

    return fetch("http://127.0.0.1:3001/predict", options)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => console.error(err));
}

export async function retrieveRandomMovie(){
    return await randomMovie();
}

const randomMovie = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjQ5MjM1ZjRhYmI0Y2MxN2I2MTA2MGI0N2U1OWI1MiIsInN1YiI6IjYwNThiOTQzYWYyZGE4MDA1NWE0M2NiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rgVMvq3see09Ylgsuw9h3gx1SGooaGDj4gtkDw6iQKs'
        }
    };

    return fetch("http://127.0.0.1:3001/liste", options)
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(err => console.error(err));
}