import React, {createContext} from "react";

const MovieContext = createContext(undefined);

const MovieProvider = ({value, ...props}) => {
    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    )
}

export {MovieContext, MovieProvider}