import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MyNav from "../components/navBar";
import "../App.css";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function ProfilPage() {
 const [token, setToken] = useState(false);
 const [Users, setUsers] = useState([]);
 const [curentDate, setCurentDate] = useState(1000);
 const [imgProfil, setImgProfil] = useState(false);

 const [partyList, setPartyList] = useState([]);
 const [actualParty, setActualParty] = useState(false);
 const [titleActualParty, setTitleActualParty] = useState("go a ma maison pour le match !");
 const [adressActualParty, setAdressActualParty] = useState("108 rue du jambon");
 const [descriptionActualParty, setDescriptionActualParty] = useState("Vindez vous amusez !!");
 const [newMessage, setNewMessage] = useState("");
 const [intervalTime, setIntervalTime] = useState(5000);
/*
 useInterval(() => {
   // Do some API call here
   refreshChat();
   setTimeout(() => {
   }, 5000);
 }, intervalTime);*/



 
 
 /*

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setMessage({ ...message, [name]: value });
  };

  const [isMobile, setIsMobile] = useState(false)
 
  //choose the screen size 
  const handleResize = () => {
    window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false)
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })*/
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
//verif if token
//si token set token
    var tokenExist = localStorage.getItem('authToken');
    if (tokenExist) {
      var decoded = jwt_decode(tokenExist);
      setToken(decoded);
      setImgProfil(decoded.picture);
      console.log("token =>" , decoded);
    }
    getUsers();
    getPartys();
    var yourDate = new Date();

    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    yourDate = yourDate.toISOString().split('T')[0]
    console.log(yourDate);
    setCurentDate(yourDate);
    /*
      0 get all user //
      1 get token and set profil div ////
      2 get all party of user //
      3 creat select of all party //
      4 dysplay all element of party in div //
      5 dysplay list of all user for invite them
      6 update data of party
      7 leave and erase party
    */
   /* let token = (JSON.parse(window.localStorage.getItem("userInfo")).token);
    if(token){
      setToken(token);
      console.log(token);
      getSeries(token)
      setLoading(false);
    }else{
      // pas de user
    }*/
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4242/api/users/all"); 
      console.log(response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response);
    }
  }
  const getPartys = async () => {
    try {
      const response = await axios.get("http://localhost:4242/api/party/all"); 
      console.log(response.data.partys);
      setPartyList(response.data.partys);
    } catch (error) {
      console.log(error.response);
    }
  }
  const onchangePartyList= (data) => {
    setActualParty(data)
    setTitleActualParty(data.title_auth);
    setDescriptionActualParty(data.description_auth);
    setAdressActualParty(data.adress_auth);
  }

  const leaveParty = async () => {

  };
  const cancelParty = async () => {
  };
  const inviteUser = async (email) => {
    console.log(email);
  };

  const submitHandlerParty = async (e) => {
    e.preventDefault();
    console.log(titleActualParty);
    console.log(adressActualParty);
    console.log(descriptionActualParty);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    var _id = actualParty._id;
    var message = {};
    message[token.name] = newMessage;
    console.log(message);
    try {
      const response = await axios.put("http://localhost:4242/api/party/chat", {message, _id});
      setActualParty(response.data.party[0]);
      console.log(response.data.party[0]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const refreshChat = async (e) => {
    var _id = actualParty._id;
    console.log(actualParty)
    console.log(_id)
    if (_id) {
      try {
        const response = await axios.post("http://localhost:4242/api/party/chat", {_id});
        setActualParty(response.data.party[0]);
        console.log(response.data.party[0]);
      } catch (error) {
        console.log(error.response);
      }
    }
  }
  
  return (
    <>
      <MyNav token={token}/>
      <Container style={{marginTop:150}}>
            <Row>
              <Col className="back-slime" xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}> 
                <p>{token.name}</p>
                <p>{token.email}</p>
              </Col>
              <Col className="back-blue" xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}> 
                <img className="roundedPicture right" src={token.picture} alt="Image de profil" width="50" height="50" />
              </Col>
              <Col className="back-prune"> 
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                      Sorties
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  {partyList && partyList.map((data, i) =>
                    <Dropdown.Item onClick={() => onchangePartyList(data)}>
                    { data.title_auth != "" &&
                      data.title_auth
                      ||
                      data.title
                    }
                    </Dropdown.Item>
                  )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="back-black">
                { actualParty && actualParty.email_auth === token.email &&
                  <Button variant="outline-warning" className="btn-home" onClick={() => cancelParty()}>
                    Annuler la sortie
                  </Button>
                  ||
                  <Button variant="outline-warning" className="btn-home" onClick={() => leaveParty()}>
                    Partir
                  </Button>
                  }
              </Col>
            </Row>
            <Row>
            <Col  className="back-grey"  xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}> {/* donner une taille par default */}
              <Container className="back-black" >
                <Row className="back-red">
                  <Col className="back-blue2"> 
                    { actualParty &&
                      <>
                      <p>Titre de l'event : {actualParty.title}</p>
                      <p>Date de l'event : {(actualParty.date.substring(8)) + "-" + (actualParty.date.substring(5, 7)) + "-" + (actualParty.date.substring(0,4))}</p>

                      <p>Adresse de l'event : {actualParty.adress}</p>
                      <img className="" src={actualParty.picture} alt="Image de la sortie" width="50" height="50" />
                      <p>Description : {actualParty.description}</p>
                      </>
                    }
                  </Col>
                </Row>
                <Row className="back-blue">
                  <Col className="back-blue2">
                      { actualParty &&
                        <>
                        { actualParty.email_auth === token.email &&
                          <>
                          <Form onSubmit={submitHandlerParty}>
                            <Form.Group>
                              <Form.Label>Titre</Form.Label>
                              <Form.Control
                                type="text"
                                value={titleActualParty}
                                placeholder="Entrez le titre de la sortie"
                                onChange={(e) => setTitleActualParty(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Lieu</Form.Label>
                              <Form.Control
                                type="text"
                                value={adressActualParty}
                                placeholder="108 rue du jambon"
                                onChange={(e) => setAdressActualParty(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                type="text"
                                value={descriptionActualParty}
                                placeholder="Description fun !!"
                                onChange={(e) => setDescriptionActualParty(e.target.value)}
                              />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                              Valider
                            </Button>
                          </Form>
                          </>
                          ||
                          <>
                          <input type="text" />
                          
                          <p>Titre de la sortie : {actualParty.title}</p>
                          <p>lieux de la sortie : {actualParty.title}</p>
                          <img className="" src={actualParty.picture} alt="Image de la sortie" width="50" height="50" />
                          <p>Description : {actualParty.description}</p>
                          </>
                        }
                        </>

                      }
                    </Col>
                </Row>
              </Container>
            </Col>
            <Col className="back-blue"  xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}> 
              <Container>
                <Row>
                  <Col className="back-green">  {/*list des gens deja inviter*/}
                    <p>user already invited</p>
                    <p>user already invited</p>
                    <p>user already invited</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="back-prune"> {/*list des gens a inviter*/}
                    <div className="scroll_div">
                      {Users && Users.map((user, i) =>
                        <>
                          <p key={i}> {user.name}</p>
                          <Button variant="info" className="btn-home" onClick={() => inviteUser(user.email)}>
                            inviter
                          </Button>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="back-yellow"> {/*Chat*/}
            {actualParty && actualParty.chat.map((msg, i) =>
              <>
              { Object.keys(msg)[0] === token.name &&
                <p style={{color:'red'}}>{Object.keys(msg)[0]} : {msg[Object.keys(msg)[0]]}</p>
                ||
                <p>{Object.keys(msg)[0]} : {msg[Object.keys(msg)[0]]}</p>
              }
              </>
            )}
          </Row>
          <Row>
          <Form onSubmit={submitMessage}>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                value={newMessage}
                placeholder="Tapez ici votre message"
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Valider
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default ProfilPage;