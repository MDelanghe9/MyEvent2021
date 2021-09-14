import React, {Component} from 'react';
import '../App.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai';
import SearchBar from './searchBar';


export default class MyNav extends Component {
    render(){

        return(
        <div className='navbar w-100'>
            <Navbar variant="light">
                <Container>
                    <Nav className="me-auto">
                        <Navbar.Brand className='navTitle' href="#home">My_Events</Navbar.Brand>
                        <Nav.Link className='icon-home' href="#home"><AiOutlineHome/></Nav.Link>
                        <Nav.Link className='icon-user' href="/profil"><AiOutlineUser/></Nav.Link>
                    </Nav>
                    {/* <SearchBar/> */}
                </Container>
            </Navbar>
        </div>
        
        )
    }
}