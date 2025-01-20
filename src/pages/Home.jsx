import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { getWatchlistAPI } from '../services/allAPI'
import loadingGif from "../assets/loading.gif";


const Home = () => {
    const [resHome,setResHome] = useState('')
    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        getWatchlist()
    },[resHome])
    const getWatchlist = async () => {
        try {
            setLoading(true)
            const result = await getWatchlistAPI()
            setMovieList(result.data)

        } catch (error) {
            console.error("get API Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Container className="d-flex flex-column justify-content-center  mt-3 w-lg-75  w-50 ">
                <h3 className='text-center mt-1'>Create Your Perfect Movie Wishlist</h3>
                <h6 className='text-center mt-1' style={{ color: '#F2C029' }}>Search, add to your wishlist, and track your movies with ease.</h6>
                <SearchBar setResHome={setResHome}/>
            </Container>
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <h4>My Wishlist</h4>
                    </Col>

                </Row>
                <Row className="mt-3">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <img src={loadingGif} alt="Loading..." width="80" />
                        </div>
                    ) : movieList?.length > 0 ? (
                        movieList.map((movie) => (
                            <Col className='mt-3' key={movie?.id} xs={6} sm={6} md={4} lg={2}>
                                <MovieCard movie={movie} setResHome={setResHome}/>
                            </Col>
                        ))
                    ) : (
                        <div className="fw-bolder text-warning">No Movies Added</div>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default Home