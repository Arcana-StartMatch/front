import React from 'react';
import Rating from "./Rating/Rating";

const MovieRating = (props) => {

    return (
        <div className={"raiting-content"}>
            Note globale :
            <div style={{fontSize: "36px"}}>
                <Rating raiting={props.raiting}/>
            </div>
        </div>
    );
}

export default MovieRating;
