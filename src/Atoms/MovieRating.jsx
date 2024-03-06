import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const MovieRating = (props) => {
    let rate = Math.round(props.raiting) / 2;
    let lessRate = 5 - rate;
    console.log(rate)
    console.log(lessRate)

    return (
        <div className={"raiting-content"}>
            Note globale :
            <div style={{fontSize: "36px"}}>
                {[...Array(rate)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={fasStar} style={{ color: "#FFF700" }} />
                ))}
                {[...Array(lessRate)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={farStar} style={{ color: "#FFF700" }} />
                ))}
            </div>
        </div>
    );
}

export default MovieRating;
