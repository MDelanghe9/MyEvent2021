import React, {Component} from 'react';
import '../App.css';
import {Navbar, Nav, Container, NavDropdown, Item} from 'react-bootstrap';
import {AiOutlineHome, AiOutlineUser, AiOutlineExport, AiOutlineMenu} from 'react-icons/ai';

export default class MyNav extends Component {
    render(){

        return(
        <div className='w-100'>
            <Navbar collapseOnSelect expand="sm" bg="light" variant="light" fixed="top" className="navbar mb-5">
                <Container>
                <Navbar.Brand className='navTitle' href="/">My_Events</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="navbar-burger-icon m-auto">
                                <Nav.Link className='icon-home' href="/"><AiOutlineHome/></Nav.Link>
                                <Nav.Link className='icon-user' href="/profil"><AiOutlineUser/></Nav.Link>
                                <Nav.Link className='icon-log' href="/login"><AiOutlineExport/></Nav.Link>
                            </Nav>
                            <Nav className="navbar-burger-text m-auto">
                                <Nav.Link className='icon-home' href="/">Accueil</Nav.Link>
                                <Nav.Link className='icon-user' href="/profil">Profil</Nav.Link>
                                <Nav.Link className='icon-log' href="/login">Connexion / Déconnexion</Nav.Link>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        
        )
    }
}