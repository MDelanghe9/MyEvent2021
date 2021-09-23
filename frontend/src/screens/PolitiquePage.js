import React from "react";
import MyNav from "../components/navBar";
import ScrollTop from 'react-scrolltop-button';
import Footer from "../components/footer";
import "../App.css";
import { Row, Col, Container } from "react-bootstrap";

function PolitiquePage() {
    return(
        <Container style={{marginTop:'100px'}}>
            <MyNav/>
            <Row>
                <Col style={{textAlign:'justify'}}>
                <h1 style={{fontSize:'45px', textAlign:'center', color:'purple', textDecoration:'underline 2px'}} className='m-5'>Politique de confidentialité & Conditions d'utilisation</h1>
                    <h2 className='gras mt-5 mb-3'>POLITIQUE DE CONFIDENTIALITE</h2>
                    <h3 className='gras'>INTRODUCTION</h3>
                        <p>
                        Quelles sont les informations recueillies et pourquoi ?
                        Très peu d’informations sont collectées. La liste de ces données personnelles et les raisons pour lesquelles nous collectons ces informations sont expliquées ci-après :
                        </p>
                        <p>La zone géographique depuis laquelle vous vous connectez à notre site Internet, depuis votre ordinateur ou appareil mobile, comme celle
                             fournie par une adresse IP, est une information que nous collectons de manière anonyme, tout comme le type d'appareil utilisé pour se connecter
                              au site. Ces données récoltées nous permettent d'orienter notre stratégie de communication. Cela peut, par exemple, être l'adaptation du site au mobile
                             face à la montée du nombre de visites depuis un mobile. L'outil Google Analytics est utilisé afin d'analyser la fréquentation de notre site web.
                        </p>
                    <h3 className='gras'>Collecte et utilisation de vos données</h3>
                        <p>Les données récoltées, via la prise de contact avec nos services depuis le site Internet, 
                            nous permettent de vous répondre sur votre besoin. Ces données ne sont 
                            pas exploitées en dehors de leur nécessité pour vous apporter une réponse. 
                            Elles sont supprimées au bout de treize mois.
                            L'adresse IP est également stockée, en plus des valeurs saisies.
                        </p>
                        <p>
                        Les données, non exhaustives, présentées sur le site internet de My_Event sont proposées à titre informatif.
                         My_Event ne peut donc être tenus responsables des modifications susceptibles d'intervenir en cours d'année.
                         Par conséquent, il vous appartient de vérifier l'exactitude des informations auprès de nos prestataires.
                        </p>
                    <h3 className='gras'>Stockage des données</h3>
                    <p>
                        Les informations sont stockées dans notre base de données Mongo Atlas. 
                        Comment actualiser ou supprimer mes informations ?
                        Les personnes souhaitant mettre à jour leurs données
                        ou les supprimer peuvent le faire en nous contactant à l’adresse : blabllabla.com                    
                    </p>
                    <p>Nous pouvons partager des renseignements ne permettant pas de vous identifier personellement ouvertement et avec nos partenaires, comme des éditeurs, 
                        des annonceurs, des concepteurs ou les titulaires des droits. Par exemple, nous partageons publiquement des renseignements relatifs aux tendances 
                        d'utilisation de nos services. Nous autorisons également des partenaires particuliers à collecter des renseignements à partir
                         de votre navigateur ou de votre appareil à des fins de publicité et de mesure au moyen de leurs propres témoins ou de technologies semblables.
                    </p>

                <h2 className='gras mt-5 mb-3'>CONDITIONS GENERALES D'UTILISATION</h2>
                <h3 className='gras'>Description du service d’intermédiation</h3>
                    <p>My Event, Association, dont le siège social est situé à Lille exploite un site internet d’intermédiation entre des personnes souhaitant vendre et acheter des prestations de service d’hébergement et de visite ou loisirs, accessible à l’adresse www.my_event.com (ci-après dénommé « le Site »).</p>
                    <p>En se connectant au Site, l’utilisateur, défini comme toute personne accédant au Site, visitant le Site ou créant un compte sur le Site ou effectuant une réservation en ligne auprès d’un Prestataire (ci-après dénommé « l’Utilisateur »), s’engage à respecter les termes des présentes conditions générales.
                         A défaut, l’Utilisateur s’engage à quitter le Site.</p>
                    <p>En acceptant les présentes conditions générales, tout Utilisateur garantit être majeur et disposer de la pleine capacité juridique pour accéder au Site et/ou créer un compte sur le Site, et/ou effectuer une réservation en ligne sur le Site auprès d’un Prestataire.</p>
                    <p>L’EXPLOITANT fournit un exemplaire des présentes conditions générales sur support durable téléchargeable sur son site internet, ce que tout Utilisateur accepte. L’Utilisateur accepte également de recevoir toutes informations concernant l’exécution des présentes conditions générales par courrier électronique.
                         L’Utilisateur, qui effectue une réservation en ligne, reconnaît que l’acceptation des conditions générales d’utilisation s’effectue en ligne sur le Site et ne nécessite pas de signature manuscrite.</p>
                    <p>Si l’Utilisateur souhaite effectuer une réservation en ligne auprès d’un Prestataire, il reconnaît qu’il devra, en sus d’accepter les présentes conditions générales d’utilisation, accepter les conditions générales de vente du Prestataire, faute de quoi il ne pourra pas effectuer une réservation en ligne.
                    On entend par « Prestataire », au sens des présentes conditions générales, tout professionnel ou particulier référencé sur le Site qui propose aux Utilisateurs des prestations d’hébergement et/ou de visites et/ou de loisirs.</p>
                    <p>
                    Le Site est une plateforme de réservation en ligne de prestations de services d’hébergement et/ou de visites et/ou de loisirs auprès de Prestataires. L’EXPLOITANT n’est qu’un intermédiaire entre un acheteur et un vendeur de prestations de services d’hébergement et/ou de visites et/ou de loisirs et permet
                     la mise en relation entre le vendeur et l’acheteur. La vente s’effectue entre le l’Utilisateur et le Prestataire.
                    L’Utilisateur peut accéder aux offres des Prestataires directement sur le Site ou en effectuant une recherche dans la barre de recherche à partir de critères de sélection.
                    </p>
                <h3 className='gras'>Propriété intellectuelle</h3>
                    <p>Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo, sons, toutes les applications informatiques qui pourraient être utilisées pour faire fonctionner ce site, tous les documents téléchargeables et plus généralement tous les contenus présents sur le site 
                        internet www.my_event.com 
                        sont protégés par les lois en vigueur au titre de la propriété intellectuelle. Ils sont la propriété pleine et entière de L’EXPLOITANT ou des tiers à qui ils appartiennent. Toute reproduction, représentation, utilisation, communication, commercialisation ou adaptation, sous quelque forme que ce soit, de tout ou partie des éléments précités,
                         y compris les applications informatiques, sans l'accord préalable et écrit de Sarthe Développement, sont strictement interdites. Le fait pour l’EXPLOITANT de ne pas engager de procédure dès la prise de connaissance de ces utilisations non autorisées ne vaut pas acceptation desdites utilisations ou renonciation aux poursuites. L’Utilisateur 
                         s’interdit tout acte de contrefaçon, de concurrence déloyale ou parasitaire à l’égard de L’EXPLOITANT, et s’interdit de diffamer ou de dénigrer L’EXPLOITANT.</p>
                
                <h3 className='gras'>Données personnelles</h3>
                    <p>
                    L’Utilisateur est informé que les données personnelles qu’il a communiquées lors de la création de son compte ou sur le Site, font l’objet d’un traitement par L’EXPLOITANT à des fins de gestion des comptes utilisateurs ou suivi de la relation utilisateurs, d’élaboration de statistiques et de gestion des demandes de réservation. 
                    Si l’Utilisateur doit remplir un questionnaire, l’EXPLOITANT lui indiquera le caractère obligatoire ou facultatif des
                    réponses au moment de la saisie des données. Les données sont enregistrées dans le fichier de clients de l’EXPLOITANT. Les données seront également communiquées au Prestataire auprès duquel l’Utilisateur aura effectué une réservation sur le Site, et ce afin qu’il puisse traiter la réservation.
                    Les données sont conservées par l’EXPLOITANT pendant la durée nécessaire à l’exercice des finalités pour lesquelles elles ont été collectées.
                    L’EXPLOITANT se réserve le droit d’adresser à l’Utilisateur une newsletter ou des offres liées aux services proposés sur le Site, par voie électronique, envoyées à l’adresse renseignée par l’Utilisateur sur le Site. Si l’Utilisateur ne souhaite plus recevoir de newsletter ou d’offres, il pourra à tout moment s’y opposer en cliquant 
                    sur un lien électronique prévu à cet effet dans le courrier électronique d’envoi de la newsletter ou de l’offre.
                    </p>
                <h3 className='gras'>COOKIES   </h3>
                    <p>
                    Le site visité utilise des traceurs (cookies). Ainsi, le site est susceptible d'accéder à des informations déjà stockées dans l’équipement terminal de communications électroniques de l’utilisateur et d'y inscrire des informations.
                    <span className='gras'>Qu’est-ce qu’un cookie ?</span><br></br>
                    Un cookie est un petit fichier texte contenant diverses informations. Il est déposé dans la mémoire du terminal de l’utilisateur (ordinateur, tablette, Smartphone...) par le serveur du site
                    internet visité ou par un serveur tiers (service de web analytique, etc.). Il va permettre, pendant la durée de validité ou d’enregistrement du cookie, d’identifier son terminal lors de vos prochaines visites. Des sociétés tierces peuvent également être amenés, en fonction de vos choix, à déposer des cookies sur votre ordinateur (Ex : Google Analytics, Facebook, etc.).
                    Les différents types de cookies utilisés par www.sarthetourisme.com ?
                    Les cookies essentiels : Ils sont indispensables à la bonne exécution du site car ils permettent d'accéder notamment à des espaces réservés grâce aux données conservées durant une session de navigation. Ils nous permettent de mémoriser les informations relatives aux formulaires que l’utilisateur est susceptible de remplir sur notre site, et d’adapter 
                    la présentation de notre site aux préférences d’affichage de son terminal. Sans ces cookies, il ne lui serait pas possible d'utiliser notre site dans des conditions normales.
                    Les cookies « panier d’achat » sont obligatoires afin de pouvoir effectuer une réservation sur le Site. Si l’Utilisateur a désactivé ces cookies, il ne pourra pas effectuer de réservation sur le Site. En effet, sans ces cookies, le site ne peut pas se souvenir de la sélection / du panier du client.
                    Les cookies analytiques ou de performance : Ces cookies nous permettent de connaître l'utilisation et les performances de notre site et d'en améliorer le fonctionnement. Ils mesurent notamment les données de votre navigation (volume de fréquentation, rubriques et contenus visités, etc.). Ces cookies sont essentiels car ils permettent d'améliorer l'intérêt et 
                    l'ergonomie de nos services voir même de détecter des problèmes de navigation.
                    Les cookies des réseaux sociaux : Certaines pages de notre site utilisent des plug-ins émanant de tiers, qui permettent à l’internaute de partager des contenus de notre site avec d'autres. C’est le cas des boutons "Partager" ou "J'aime", issus de réseaux sociaux tels que Facebook ou Twitter. Nous n'avons aucun contrôle sur le processus employé par les réseaux
                    sociaux pour collecter des informations relatives la navigation des visiteurs sur notre site.
                    Nous invitons les utilisateurs de notre site, adhérents par ailleurs à l’un de ces réseaux, à consulter les politiques de protection de la vie privée de ces réseaux sociaux afin de prendre connaissance des finalités d'utilisation, notamment publicitaires, des informations de navigation qu'ils peuvent recueillir grâce à ces boutons applicatifs.
                    Accepter ou refuser les cookies
                    L’utilisateur peut refuser la présence des cookies, en cliquant sur la bannière qui s’ouvre lorsqu’il arrive sur une page du Site permettant l’installation de cookies. La poursuite de sa navigation sur le Site vaut accord au dépôt de cookies sur son terminal. Si l’utilisateur refuse la présence de ces cookies, les fonctionnalités du Site pourront être diminuées
                    mais son utilisation sera néanmoins possible.
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
export default PolitiquePage;