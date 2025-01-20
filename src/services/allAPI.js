import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL"; 


// searchAPI - GET
export const searchAPI = async (key) => {
    const encodedKey = encodeURIComponent(key);
    return await commonAPI(`GET`,`http://www.omdbapi.com/?s=${encodedKey}&apikey=79543044&type=movie`,'')
}

// viewAPI - GET
export const viewAPI = async (key) => {
    return await commonAPI(`GET`,`http://www.omdbapi.com/?i=${key}&apikey=79543044`,'')
}

// getMyListAPI - GET
export const getWatchlistAPI = async () => {
    return await commonAPI(`GET`,`${SERVERURL}/watchlist`,'')
}

// addtoListAPI - POST
export const addToWatchlistAPI = async (movie) => {
    return await commonAPI(`POST`,`${SERVERURL}/watchlist`,movie)
}


//update watch Status 
export const updateWatchStatusAPI= async (id,Status) =>{
    return await commonAPI('PATCH',`${SERVERURL}/watchlist/${id}`,Status)
}

//delete movie from list
export const removeFromWatchlistAPI= async (id) =>{
    return await commonAPI('DELETE',`${SERVERURL}/watchlist/${id}`,{})
}

// checkAPI - GET
export const checkAPI = async (imdbID) => {
    return await commonAPI(`GET`,`${SERVERURL}/watchlist?imdbID=${imdbID}`,'')
}
