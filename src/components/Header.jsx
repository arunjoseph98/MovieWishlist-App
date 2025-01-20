import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { GiWhiteTower } from "react-icons/gi";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <><Navbar className="bg-transparent">
    <Container>
      <Navbar.Brand className='fw-bolder'  style={{ color: '#F2C029' }}>Watch<GiWhiteTower size={30}/>Tower</Navbar.Brand>
      <Link to={'/'} style={{textDecoration:"none"}}>Home</Link>
    </Container>
  </Navbar></>
  )
}

export default Header