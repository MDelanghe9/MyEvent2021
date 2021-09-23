import React from "react";
import MyNav from "../components/navBar";
import ScrollTop from 'react-scrolltop-button';
import Footer from "../components/footer";
import "../App.css";
import { Row, Col, Container } from "react-bootstrap";

function MentionsPage() {
    return(
        <Container style={{marginTop:'100px'}}>
            <MyNav/>
            <Row>
                <Col style={{textAlign:'justify'}}>
                <h1 style={{fontSize:'45px', textAlign:'center', color:'purple', textDecoration:'underline 2px'}} className='m-5'>Mentions Légales</h1>
                    <h3 className='gras'>DROITS D'AUTEUR</h3>
                        <p>
                        Le site internet www.my_event.com est la propriété de nous.
                        </p>
                        <p>Les photographies, textes, dessins, séquences animées, séquences sonores ainsi que toutes œuvres intégrés dans le contenu du site
                             sont propriété de My_Event ou de tiers ayant autorisé l'agence à les utiliser.
                        </p>
                        <p>Les reproductions, sur un support papier ou informatique, dudit site et des œuvres qui y sont reproduits sont autorisées sous réserve qu’elles soient strictement réservées
                             à un usage personnel excluant tout usage à des fins publicitaires et/ou commerciales et/ou d’information et/ou qu’elles soient conformes aux dispositions de l’article L122-5
                              du code de la propriété intellectuelle.
                        </p>
                        <p>
                            À l’exception des dispositions ci-dessus, toute reproduction, représentation, utilisation ou modification,
                         par quelque procédé que ce soit et sur quelque support que ce soit, de tout ou partie du site, de tout ou partie des différentes œuvres qui le composent,
                         sans avoir obtenu l’autorisation préalable de My_Event, est strictement interdite et constitue un délit de contrefaçon.
                        </p>
                    <h3 className='gras'>AVERTISSEMENT</h3>
                        <p>
                        Les données, non exhaustives, présentées sur le site internet de My_Event sont proposées à titre informatif.
                         My_Event ne peut donc être tenus responsables des modifications susceptibles d'intervenir en cours d'année.
                         Par conséquent, il vous appartient de vérifier l'exactitude des informations auprès de nos prestataires.
                        </p>
                    <h3 className='gras'>LIENS HYPERTEXTES</h3>
                        <p>
                        My_Event décline toute responsabilité quant aux sites internet accessibles depuis son propre site.
                        Un lien vers le site www.my_event.com ne peut être créé qu'après autorisation expresse et préalable auprès de Faire Savoir.
                        </p>
                    <h3 className='gras'>INFORMATIQUE ET LIBERTES</h3>
                        <p>
                        Le site internet de Web@c Devlopment a été déclaré à la Commission Nationale de l'Informatique et des Libertés (CNIL - LMFAO).
                        Vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données vous concernant 
                        (art. 34 de la loi « Informatique et Libertés » du 6 janvier 1978). Pour toute demande, adressez-vous :</p>
                        <p className='gras'>My_Event</p>
                        <p className='gras'>4 rue du Palis Rihour</p>
                        <p className='gras'>59000 LILLE</p>
                        <p className='gras'>Tél : 01.02.03.04.05</p>
                        <p className='gras'>E-mail : contact@my_event.com</p>
                        
                    <h3 className='gras'>GOOGLE</h3>
                    <p>
                        En utilisant ce site et en vous connectant avec votre adresse email Google, vous acceptez que vos informations personnelles soient utilisées et sauvegardées 
                        afin d'assurer le bon fonctionneemnt du site.
                    </p>
                    <p>Nous pouvons partager des renseignements ne permettant pas de vous identifier personellement ouvertement et avec nos partenaires, comme des éditeurs, 
                        des annonceurs, des concepteurs ou les titulaires des droits. Par exemple, nous partageons publiquement des renseignements relatifs aux tendances 
                        d'utilisation de nos services. Nous autorisons également des partenaires particuliers à collecter des renseignements à partir
                         de votre navigateur ou de votre appareil à des fins de publicité et de mesure au moyen de leurs propres témoins ou de technologies semblables.
                    </p>
                    <p>Dans le cas où Google prendrait part à une opération de fusion, d'acquisition ou à toute autre forme de cession d'actifs, nous nous engageons à préserver la confidentialité
                         de vos renseignements personnels et à vous informer avant que ceux-ci ne soient transférés ou soumis à de nouvelles politiques de confidentialité.
                    </p>
                </Col>
            </Row>
            <ScrollTop
                breakpoint={3000}
                text=' '
                icon={<img src="https://img.icons8.com/dotty/80/000000/thick-arrow-pointing-up.png" width="30px" height="30px"/>}
            />
            <Footer/>
        </Container>

    )
}
export default MentionsPage;