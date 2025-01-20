import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loadingGif from "../assets/loading.gif";
import { Col, Container, Row } from 'react-bootstrap';
import { updateWatchStatusAPI, viewAPI } from '../services/allAPI';
import { FaEye, FaEyeLowVision } from 'react-icons/fa6';
const View = () => {
  const param = useParams()
  const [movieDetails, setMovieDetails] = useState({})
  const [loading, setLoading] = useState(false);
  const [watch,setWatch] = useState(false)

  useEffect(() => {
    getView(param.id)
  }, [])
 

  const getView = async (id) => {
    try {
      setLoading(true)
      const result = await viewAPI(id)
      setMovieDetails(result.data)
      console.log(movieDetails);
      

    } catch (error) {
      console.error("get API Error:", error);
    } finally {
      setLoading(false);
    }
  }
 


  return (
    <>
  {loading ? (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <img src={loadingGif} alt="Loading..." width="150" />
    </Container>
  ) : (
    <Container className="mt-5 px-5">
      <Row className="mt-5">
        {/* Image Column */}
        <Col
          sm={12}
          md={6}
          className="d-flex justify-content-center align-items-center mb-4 mb-md-0"
        >
          <img
            className="rounded border border-secondary"
            src={movieDetails.Poster} 
            alt="Movie Poster"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </Col>

        {/* Details Column */}
        <Col sm={12} md={6} className="d-flex flex-column mt-4">
          <h2>{movieDetails?.Title}</h2>
          
          <div>
            <p style={{ marginBottom: "5px" }}>Year: {movieDetails?.Year}</p>
            <p>Genre: {movieDetails?.Genre}</p>
          </div>
          <h6>Director: {movieDetails?.Director}</h6>
          <h6>Writer: {movieDetails?.Writer}</h6>
          <h6>IMDB Rating: {movieDetails?.imdbRating}</h6>
          <p className="mt-4">
          {movieDetails?.Plot}
          </p>
        </Col>
      </Row>
    </Container>
  )}
</>
  )
}

export default View