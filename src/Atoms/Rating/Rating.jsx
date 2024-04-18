import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as fasStar, faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons/faStar";
import React from "react";

const Rating  = (props) => {
    let rate = Math.round(props.raiting) / 2;
    let lessRate = 5 - rate;
    const isHalfRate = rate.toString().includes('.');
    rate = rate - rate%1;
    lessRate = lessRate - lessRate%1;

    return (
        <div className={""}>
            {[...Array(rate)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={fasStar} style={{ color: "#F4D866" }} />
            ))}
            {isHalfRate ? <FontAwesomeIcon icon={faStarHalfStroke} style={{ color: "#F4D866" }} /> : <></>}
            {[...Array(lessRate)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={farStar} style={{ color: "#F4D866" }} />
            ))}
        </div>
    )
}

export default Rating