import React, {useEffect, useState} from "react";
import "./form.css";
import {Autocomplete, Chip, TextField, Input} from "@mui/material";
import {retrieveRandomMovie} from "../../services/filmPresentationServices";

function Form() {
    const defaultValueGender = [
        {id: 1, data: "Thriller", traductionFr: "Thriller"},
        {id: 2, data: "Comedy", traductionFr: "Comedy"},
        {id: 3, data: "Mystery", traductionFr: "Mystery"},
        {id: 4, data: "Western", traductionFr: "Western"},
        {id: 5, data: "Crime", traductionFr: "Crime"},
        {id: 6, data: "Animation", traductionFr: "Animation"},
        {id: 7, data: "Action", traductionFr: "Action"},
        {id: 8, data: "War", traductionFr: "War"},
        {id: 9, data: "Adventure", traductionFr: "Adventure"},
        {id: 10, data: "Horror", traductionFr: "Horror"},
        {id: 11, data: "Romance", traductionFr: "Romance"},
        {id: 12, data: "Fantasy", traductionFr: "Fantasy"},
        {id: 13, data: "Foreign", traductionFr: "Foreign"},
        {id: 14, data: "History", traductionFr: "History"},
        {id: 15, data: "TV Movie", traductionFr: "TV Movie"},
        {id: 16, data: "Family", traductionFr: "Family"},
        {id: 17, data: "Science Fiction", traductionFr: "Science Fiction"},
        {id: 18, data: "Drama", traductionFr: "Drama"},
        {id: 19, data: "Music", traductionFr: "Music"},
        {id: 20, data: "Documentary", traductionFr: "Documentary"},
    ];

    const optionsEducation = [
        {id: 1, data: "Graduation", label: "Graduation"},
        {id: 2, data: "PhD", label: "PhD"},
        {id: 3, data: "Master", label: "Master"},
        {id: 4, data: "2n Cycle", label: "2n Cycle"},
        {id: 5, data: "Basic", label: "Basic"}
    ];

    const optionsMaritalSituation = [
        {id: 1, data: "Single", label: "Single"},
        {id: 2, data: "Together", label: "Together"},
        {id: 3, data: "Married", label: "Married"},
        {id: 4, data: "Divorced", label: "Divorced"},
        {id: 5, data: "Widow", label: "Widow"}
    ];

    const sortByName = (a, b) => {
        const dataA = a.traductionFr.toUpperCase();
        const dataB = b.traductionFr.toUpperCase();

        if (dataA < dataB) {
            return -1;
        }
        if (dataA > dataB) {
            return 1;
        }
        return 0;
    }

    const [optionsGenderMovie, setOptionsGenderMovie] = useState(defaultValueGender.sort((a, b) => sortByName(a, b)));
    const [choiceGender, setChoiceGender] = useState([]);
    const [autocompleteValue, setAutocompleteValue] = useState(null);
    const [autoCompleteValueEducation, setAutoCompleteValueEducation] = useState(null);
    const [autoCompleteValueMaritale, setAutoCompleteValueMaritale] = useState(null);
    const [old, setOld] = useState();
    const [error, setError] = useState("")
    const [teenagerChoice, setTeenagerChoice] = useState(0);
    const [childChoice, setChildChoice] = useState(0)
    const [randomMovies, setRandomMovies] = useState()
    const [bestMovie, setBestMovie] = useState([]);
    const [bestMovieRate, setBestMovieRate] = useState()

    const handleGenderMovie = (event, value) => {
        if (value !== null) {
            setOptionsGenderMovie(optionsGenderMovie.filter(option => option.id !== value.id));
            setChoiceGender([...choiceGender, value]);
            setAutocompleteValue(null);
        }
    };

    const handleEducation = (event, value) => {
        if (value !== null) {
            setAutoCompleteValueEducation(value.data);
        } else {
            setAutoCompleteValueEducation(null);
        }
    }

    const handleMaritalSituation = (event, value) => {
        if (value !== null) {
            setAutoCompleteValueMaritale(value.data);
        } else {
            setAutoCompleteValueMaritale(null);
        }
    }

    const handleBestMovie = (event, value) => {
        if (value !== null) {
            setBestMovie(value);
        } else {
            setBestMovie(null);
        }
    }

    const handleDeleteGenderMovie = (gender) => {
        setChoiceGender(choiceGender.filter(option => option.id !== gender.id));
        setOptionsGenderMovie([...optionsGenderMovie, gender].sort((a, b) => sortByName(a, b)));
    }

    const fetchRandomMovies = async () => {
        const response = await retrieveRandomMovie();
        setRandomMovies(response)
    }

    useEffect(() => {
        fetchRandomMovies();
    }, []);

    const handleVerifRateBestMovie = (e) => {
        const value = e.target.value;
        if (value <= 5 && value >= 0) {
            setError("");
            setBestMovieRate(e.target.value);
        } else {
            setError("Film score must be between 0 and 5");
        }
    }

    const handleSubmitForm = (event) => {
        let messageError = "";
        if (old === undefined && choiceGender.length === 0 && autoCompleteValueEducation === null
            && autoCompleteValueMaritale === null && bestMovie.length === 0 && bestMovieRate === undefined) {
            setError("All fields must be completed.");
        } else {
            messageError += old === undefined ? "You need to set an age." : "";
            messageError += choiceGender.length === 0 ? "You need to choose a genre." : "";
            messageError += autoCompleteValueEducation === null ? "You need to define your most recent diploma." : "";
            messageError += autoCompleteValueMaritale === null ? "You need to define your marital status." : "";
            messageError += bestMovie.length === 0 ? "You must choose at least one film from our selection." : "";
            messageError += bestMovieRate === undefined ? "You must rate the film chosen from the selection." : "";

            if (messageError === "") {
                event.preventDefault();
                setError("");
                window.location.href = "/movie"
                localStorage.setItem("YMtach-preferences",
                    JSON.stringify({
                        old: old, choiceGender: choiceGender, bestMovie: bestMovie, bestMovieRate: bestMovieRate,
                        maritalStatus: autoCompleteValueMaritale, education: autoCompleteValueEducation,
                        childChoice: childChoice, teenagerChoice: teenagerChoice
                    })
                );
            } else {
                setError(messageError);
            }
        }
    }

    return (
        <form>
            <div className="gender-movie-container">
                <div className="old-choice" style={{display: "flex"}}>
                    <label htmlFor="choiceOld">How old are you?</label>
                    <Input id={"choiceOld"} type={"number"} defaultValue={old}
                           sx={{
                               width: "20%",
                               backgroundColor: "#FAF3E3",
                               borderRadius: "4px",
                               border: "1px solid black",
                               padding: "8px"
                           }}
                           onChange={(e) => (setOld(e.target.value))} placeholder={"23"}/>
                </div>
                <div className="gender-movie-choice">
                    <label htmlFor="choiceGenderMovie">What kind of films do you like?</label>
                    <Autocomplete
                        id={"choiceGenderMovie"}
                        disablePortal
                        options={optionsGenderMovie}
                        value={autocompleteValue}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Genre"/>}
                        getOptionLabel={(option) => option.traductionFr}
                        onChange={handleGenderMovie}
                    />
                </div>
                <div style={{marginBottom: "12px"}}>
                    {choiceGender.map((element, index) => {
                        return <Chip key={index} label={element.traductionFr}
                                     style={{fontSize: "20px", margin: "6px"}}
                                     onDelete={() => handleDeleteGenderMovie(element)}/>
                    })}
                </div>
                <div className="education-choice">
                    <label htmlFor="choiceEducation">What is your level of qualification?</label>
                    <Autocomplete
                        disablePortal
                        options={optionsEducation}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Diploma level"/>}
                        onChange={handleEducation}
                    />
                </div>
                <div className="education-choice">
                    <label htmlFor="choiceEducation">What is your marital status?</label>
                    <Autocomplete
                        disablePortal
                        options={optionsMaritalSituation}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Marital status"/>}
                        onChange={handleMaritalSituation}
                    />
                </div>
                <div className="best-movie-choice">
                    <label htmlFor="choiceEducation">What's your favourite film in this selection?</label>
                    <Autocomplete
                        disablePortal
                        options={randomMovies}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Favourite film among"/>}
                        onChange={handleBestMovie}
                        getOptionLabel={(option) => option.original_title}
                    />
                </div>
                <div className="best-movie-rate-choice">
                    <label htmlFor="choiceRateBestMovie">How would you rate it out of 5?</label>
                    <Input id={"choiceRateBestMovie"} type={"number"} defaultValue={bestMovieRate}
                           sx={{
                               width: "20%",
                               backgroundColor: "#FAF3E3",
                               borderRadius: "4px",
                               border: "1px solid black",
                               padding: "8px"
                           }}
                           onChange={(e) => (handleVerifRateBestMovie(e))}/>
                </div>

                <div className="child-choice" style={{display: "flex", marginBottom: "16px"}}>
                    <label htmlFor="choiceChild">How many children do you have (under 12) ?</label>
                    <Input id={"choiceChild"} type={"number"} defaultValue={childChoice}
                           sx={{
                               width: "20%",
                               backgroundColor: "#FAF3E3",
                               borderRadius: "4px",
                               border: "1px solid black",
                               padding: "8px"
                           }}
                           onChange={(e) => (setChildChoice(e.target.value))}/>
                </div>
                <div className="teenager-choice" style={{display: "flex"}}>
                    <label htmlFor="choiceTeenager">How many teenagers do you have?</label>
                    <Input id={"choiceTeenager"} type={"number"} defaultValue={teenagerChoice}
                           sx={{
                               width: "20%",
                               backgroundColor: "#FAF3E3",
                               borderRadius: "4px",
                               border: "1px solid black",
                               padding: "8px"
                           }}
                           onChange={(e) => (setTeenagerChoice(e.target.value))}/>
                </div>
            </div>
            <div className="error">{error}</div>
            <div style={{display: "flex", justifyContent: "center", margin: "32px 0 16px 0"}}>
                <button className={"searchForm"} type={"button"} onClick={handleSubmitForm}>
                    Search by preference
                </button>
            </div>
        </form>

    );
}

export default Form;
