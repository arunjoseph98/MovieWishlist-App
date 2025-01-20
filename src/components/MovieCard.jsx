import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { FaEye} from "react-icons/fa6";
import { FaEyeLowVision } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { removeFromWatchlistAPI, updateWatchStatusAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie,setResHome}) => {
    const [watch,setWatch] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
      setWatch(movie.watched)
    },[])




    const updateWatch=(event)=>{
      event.stopPropagation();
      console.log("clicked");
            
      if (movie?.watched) {
        setWatch(false)
        updateWatchStatus(movie?.id,false)
      } else {
        setWatch(true)
        updateWatchStatus(movie?.id,true)
      }
    }

    const updateWatchStatus=async(id,status)=>{
      try {
        const watchedstatus = {watched : status};
        const result = await updateWatchStatusAPI(id,watchedstatus)
        if (result.status >= 200 && result.status < 300) {
          setResHome(result)
      }
      } catch (error) {
        console.log("update error:",error);
      }
    }

   
    const removeMovie=async(id,event)=>{
      event.stopPropagation();
      try {
        const result = await removeFromWatchlistAPI(id)
        setResHome(result)
      }
      catch (err) {
        console.log(err);
  
      }
    }

   
    
  return (
    <>
    <Card className="border border-secondary" style={{ maxWidth: '12rem', position: 'relative' }} onClick={() => { navigate(`/${movie.imdbID}/view`); }}>
  <Card.Img 
    variant="top" 
    style={{ maxWidth: '12rem',maxHeight:"250px"}}
    src={movie.Poster} 
  />
   <span 
    className="badge border border-secondary rounded-pill" 
    onClick={updateWatch}
    style={{ position: 'absolute', top: '10px', right: '10px',backgroundColor:(watch ?'#7C2E8A' : '#868e96'),cursor: "pointer" }}
  >
    { watch ? <FaEye size={20} /> :<FaEyeLowVision size={20} />}
  </span>
  <span 
    className="badge border border-secondary rounded-circle" 
    onClick={(e)=>removeMovie(movie?.id,e)}
    style={{ position: 'absolute', top: '10px', left: '10px',backgroundColor:"#F2C029",cursor: "pointer",color:'black' }}
  >
   <IoCloseSharp size={20} />
  </span>
</Card>
    </>
  )
}

export default MovieCard