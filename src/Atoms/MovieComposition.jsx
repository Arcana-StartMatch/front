import React, {useEffect, useState} from 'react';
import {retrieveCreditsByMovie} from "../services/filmPresentationServices";

const MovieComposition = (props) => {
    const [actors, setActors] = useState([]);
    const [directions, setDirections] = useState([]);

    const fetchCreditMovie = async () => {
        const data = await retrieveCreditsByMovie(props.idMovie);
        setActors(data.cast);

        const filtredData = data.crew.filter(item => item.known_for_department === 'Directing' || item.known_for_department === 'Production');
        setDirections(filtredData);
    };

    // https://image.tmdb.org/t/p/w185/2ZulC2Ccq1yv3pemusks6Zlfy2s.jpg?api_key=1649235f4abb4cc17b61060b47e59b52


    useEffect(() => {
        fetchCreditMovie();
    }, []);

    return (
        <div>
            <div>
                <strong>Réalisateur: </strong>
                {
                    [...new Map(directions.map((direction) => [direction.id, direction])).values()].map((direction, index, array) => (
                        <React.Fragment key={index}>
                            <a style={{color: "blue"}} href={"/movie/" + props.idMovie}>{direction.name}</a>
                            {index < array.length - 1 && ", "}
                        </React.Fragment>
                    ))
                }
            </div>

            <div style={{marginTop: "16px"}}>
                <strong>Acteurs: </strong>
                {
                    [...new Map(actors.map((actor) => [actor.id, actor])).values()].map((actor, index, array) => (
                        <React.Fragment key={index}>
                            <a style={{color: "blue"}} href={"/movie/" + props.idMovie}>{actor.name}</a>
                            {index < array.length - 1 && ", "}
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
}

export default MovieComposition;