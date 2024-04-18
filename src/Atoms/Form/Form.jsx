import React, {useEffect, useState} from "react";
import "./form.css";
import {Autocomplete, Chip, TextField, Input} from "@mui/material";
import {retrieveRandomMovie} from "../../services/filmPresentationServices";

function Form() {
    const defaultValueGender = [
        {id: 1, data: "Thriller", traductionFr: "Thriller"},
        {id: 2, data: "Comedy", traductionFr: "Comédie"},
        {id: 3, data: "Mystery", traductionFr: "Mystère"},
        {id: 4, data: "Western", traductionFr: "Western"},
        {id: 5, data: "Crime", traductionFr: "Crime"},
        {id: 6, data: "Animation", traductionFr: "Animation"},
        {id: 7, data: "Action", traductionFr: "Action"},
        {id: 8, data: "War", traductionFr: "Guerre"},
        {id: 9, data: "Adventure", traductionFr: "Aventure"},
        {id: 10, data: "Horror", traductionFr: "Horreur"},
        {id: 11, data: "Romance", traductionFr: "Romance"},
        {id: 12, data: "Fantasy", traductionFr: "Fantaisie"},
        {id: 13, data: "Foreign", traductionFr: "Etranger"},
        {id: 14, data: "History", traductionFr: "Historique"},
        {id: 15, data: "TV Movie", traductionFr: "Télévisé"},
        {id: 16, data: "Family", traductionFr: "Familliale"},
        {id: 17, data: "Science Fiction", traductionFr: "Science-fiction"},
        {id: 18, data: "Drama", traductionFr: "Drame"},
        {id: 19, data: "Music", traductionFr: "Musique"},
        {id: 20, data: "Documentary", traductionFr: "Documentaire"},
    ];

    const optionsEducation = [
        {id: 1, data: "Graduation", label: "Bac +2"},
        {id: 2, data: "PhD", label: "Doctorat"},
        {id: 3, data: "Master", label: "Licence"},
        {id: 4, data: "2n Cycle", label: "Master"},
        {id: 5, data: "Basic", label: "Bac"}
    ];

    const optionsMaritalSituation = [
        {id: 1, data: "Single", label: "Célibataire"},
        {id: 2, data: "Together", label: "Couple"},
        {id: 3, data: "Married", label: "Marrié(e)"},
        {id: 4, data: "Divorced", label: "Divorcé(e)"},
        {id: 5, data: "Widow", label: "veuf(ve)"}
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
            setError("La note du film doit être comprise entre 0 et 5");
        }
    }

    const handleSubmitForm = (event) => {
        let messageError = "";
        if (old === undefined && choiceGender.length === 0 && autoCompleteValueEducation === null
            && autoCompleteValueMaritale === null && bestMovie.length === 0 && bestMovieRate === undefined) {
            setError("Tous les champs doivent-être remplis.");
        } else {
            messageError += old === undefined ? "Vous devez définir un âge." : "";
            messageError += choiceGender.length === 0 ? "Vous devez choisir un genre." : "";
            messageError += autoCompleteValueEducation === null ? "Vous devez définir votre dernier diplôme obtenue." : "";
            messageError += autoCompleteValueMaritale === null ? "Vous devez définir votre dstatus maritale." : "";
            messageError += bestMovie.length === 0 ? "Vous devez choisir au moins un film de notre sélection" : "";
            messageError += bestMovieRate === undefined ? "Vous devez mettre uen note au film choisie de la sélection" : "";

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
                    <label htmlFor="choiceOld">Quel est votre âge ?</label>
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
                    <label htmlFor="choiceGenderMovie">Quels sont les genres de film que vous aimez ?</label>
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
                    <label htmlFor="choiceEducation">Quelle est votre niveau de diplôme ?</label>
                    <Autocomplete
                        disablePortal
                        options={optionsEducation}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Niveau diplôme"/>}
                        onChange={handleEducation}
                    />
                </div>
                <div className="education-choice">
                    <label htmlFor="choiceEducation">Quelle est votre situation maritale ?</label>
                    <Autocomplete
                        disablePortal
                        options={optionsMaritalSituation}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Situation maritale"/>}
                        onChange={handleMaritalSituation}
                    />
                </div>
                <div className="best-movie-choice">
                    <label htmlFor="choiceEducation">Quel est votre film préféré cette sélection ?</label>
                    <Autocomplete
                        disablePortal
                        options={randomMovies}
                        sx={{width: "35%", backgroundColor: "#FAF3E3", borderRadius: "4px"}}
                        renderInput={(params) => <TextField {...params} label="Film préféré parmis"/>}
                        onChange={handleBestMovie}
                        getOptionLabel={(option) => option.original_title}
                    />
                </div>
                <div className="best-movie-rate-choice">
                    <label htmlFor="choiceRateBestMovie">Quelle note lui donnerez vous sur 5 ?</label>
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
                    <label htmlFor="choiceChild">Combien d'enfants avez vous ? (moins de 12 ans)</label>
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
                    <label htmlFor="choiceTeenager">Combien d'adolescent avez vous ?</label>
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
                    Rechercher suivant mes préférences
                </button>
            </div>
        </form>

    );
}

export default Form;
