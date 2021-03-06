import React, {Component} from 'react';
import '../App.css';
import {Navbar, Nav, Container, NavDropdown, Item} from 'react-bootstrap';

export default class NavLogin extends Component {
    render(){

        return(
        <div className='w-100'>

            <Navbar collapseOnSelect expand="sm" bg="light" variant="light" fixed="top" className="navbar mb-5">
                <Container>
                <Navbar.Brand className='navTitle' href="/">Bienvenue sur My_Events</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="navbar-burger-icon m-auto">
                                {/* <Nav.Link className='icon-home' href="/home"><img src="https://img.icons8.com/dotty/80/home-page.png"/></Nav.Link> */}
                                <Nav.Link className='icon-log' href="/login"><img src="https://img.icons8.com/dotty/80/enter-2.png"/></Nav.Link>
                                    {/* <Nav.Link href="/profil">
                                        {this.props.token && 
                                        <img src={this.props.token.picture} alt="Image de profil" className='profilImg'/>
                                        ||
                                        <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Image du profil par default"  className='profilImg'/>
                                        }
                                    </Nav.Link> */}
                            </Nav>
                            <Nav className="navbar-burger-text m-auto">
                                {/* <Nav.Link className='icon-home' href="/home">Accueil</Nav.Link>
                                <Nav.Link className='icon-user' href="/profil">Profil</Nav.Link> */}
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