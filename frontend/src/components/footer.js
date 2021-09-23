import React, {Component} from 'react';
import "../App.css";
import {
  Row,
  Col,
  Container
} from "react-bootstrap";

export default class Footer extends Component {
    render(){
        return(
            <Container fluid>
                <Row fixed="bottom">
                    <Col style={{marginTop:'200px'}}>
                    <footer>
                        <div class="footer">
                            <div class="social">
                                <a href="https://www.facebook.com/" target="_blank"><img src="https://img.icons8.com/dotty/50/000000/facebook.png" width="50px"/> </a>
                                <a href="https://www.snapchat.com/l/fr-fr/download" target="_blank"><img src="https://img.icons8.com/dotty/80/000000/snapchat.png" width="50px"/> </a>
                                <a href="https://www.instagram.com/" target="_blank"><img src="https://img.icons8.com/dotty/80/000000/instagram-new.png" width="50px"/> </a>
                                <a href="https://twitter.com/?lang=fr" target="_blank"><img src="https://img.icons8.com/dotty/80/000000/twitter-squared.png" width="50px"/> </a>
                            </div>
                            <ul class="list-inline">
                                <li class="list-inline-item"><a href="/home">Accueil</a></li>
                                <li class="list-inline-item"><a href="https://www.epitech.eu/fr/ecole-informatique-lille/" target='_blank'>Contact</a></li>
                                <li class="list-inline-item"><a href="/mentions">Mentions légales</a></li>
                                <li class="list-inline-item"><a href="/politique">Politique de confidentialité</a></li>
                            </ul>
                            <p class="copyright">My_Event by M.D & A.D © 2021</p>
                        </div>

                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
                    </footer>
                    </Col>
                </Row>
            </Container>
        )
    }
}