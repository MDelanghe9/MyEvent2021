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
                                <Nav.Link className='icon-home' href="/home"><AiOutlineHome/></Nav.Link>
                                <Nav.Link className='icon-log' href="/login"><AiOutlineExport/></Nav.Link>
                                <Nav.Link className='icon-user' href="/profil">
                                {this.props.token && 
                                <img src={this.props.token.picture} alt="Image de profil" width="35" height="35"/>
                                ||
                                <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Image du profil par default" width="50" height="50" />
                                }
                                </Nav.Link>
                                
                            </Nav>
                            <Nav className="navbar-burger-text m-auto">
                                <Nav.Link className='icon-home' href="/home">Accueil</Nav.Link>
                                <Nav.Link className='icon-user' href="/profil">Profil</Nav.Link>
                                <Nav.Link className='icon-log' href="/">Connexion / Déconnexion</Nav.Link>
                            </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/*l'image est cachée par la bar de nav*/}
            
        </div>
        
        )
    }
}