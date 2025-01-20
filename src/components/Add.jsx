import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { addToWatchlistAPI, checkAPI } from '../services/allAPI';

const Add = ({ data, setResHome }) => {
    const [movieDetails, setMovieDetails] = useState({

        Title: "",
        Year: "",
        imdbID: "",
        Type: "",
        Poster: "",
        watched: false,
    })
    
    const checkExists = async (imdbID) => {
        let existsList = []
        try {
            const result = await checkAPI(imdbID)
            existsList=result.data
            console.log(existsList);
            

        } catch (error) {
            console.error("get API Error:", error);

        }
        if(existsList.length >0){
            alert("Movie already exists.")
        }
        else{ handleSuggestionClick()}
       
    }

        const handleSuggestionClick = () => {
            
            const updatedMovieDetails = {
                ...movieDetails,
                Title: data.Title,
                Year: data.Year,
                imdbID: data.imdbID,
                Type: data.Type,
                Poster: data.Poster
            };

            setMovieDetails(updatedMovieDetails);
            addMovie(updatedMovieDetails)

            console.log("Selected:", updatedMovieDetails);
        };

        const addMovie = async (movieData) => {
            try {
                const result = await addToWatchlistAPI(movieData)

                if (result.status >= 200 && result.status < 300) {
                    setResHome(result)
                }
            } catch (error) {
                console.error('Error Adding:', error);
            }
        }

        return (
            <>
                <Button
                    onClick={() => checkExists(data?.imdbID)}
                    variant="warning"
                >
                    + Add
                </Button>
            </>
        )
    }

    export default Add