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

function ProfilPage(props) {
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

 useInterval(() => {
   // Do some API call here
   refreshChat();
   setTimeout(() => {
   }, 5000);
 }, intervalTime);

  useEffect(() => {
    var tokenExist = localStorage.getItem('authToken');
    if (tokenExist) {
      var decoded = jwt_decode(tokenExist);
      setToken(decoded);
      setImgProfil(decoded.picture);
      //console.log("token =>" , decoded);
    }
    getUsers();
    getPartys();
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


  const party = async (name = "", action ="") => {
    console.log(name);
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/"+action , {name, _id}); 
      console.log(response);
      if (action === "cancelParty" || action === "cancelInvite") {
        props.history.go(0); // route evenet anuuler
      }else{
        setActualParty(response.data.party[0]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const leaveParty = async (name) => { //bannie un participant de la sortie
    console.log(name);
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/leaveParty", {name, _id}); 
      props.history.go(0);
    } catch (error) {
      console.log(error.response);
    }
  }; //special
  
  
  const submitHandlerParty = async (e) => {
    e.preventDefault();
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/setFieldParty", {titleActualParty, adressActualParty, descriptionActualParty, _id}); 
      console.log(response);
      setActualParty(response.data.party[0]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    var _id = actualParty._id;
    var message = {};
    message[token.name] = newMessage;
    console.log(message);
    try {
      const response = await axios.put("http://localhost:4242/api/party/chat", {message, _id});
      console.log(response.data.party[0]);
      setNewMessage("");
    } catch (error) {
      console.log(error.response);
    }
  };

  const refreshChat = async (e) => {
    if(actualParty){
      var _id = actualParty._id;
      if (_id) {
        try {
          const response = await axios.post("http://localhost:4242/api/party/chat", {_id});
          setActualParty(response.data.party[0]);
          if(response.data.party[0].lenght == 0){
            props.history.go(0); // reirection to cancel party
          }
          // console.log(response.data.party[0]);
        } catch (error) {
          props.history.go(0);
        }
      }
    }else{
      if(actualParty){
        props.history.go(0);
      }
    }
  }

  const deleteMsg = async (msg) => {
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/deleteMsg", {msg, _id});
      setActualParty(response.data.party[0]);
      console.log(response.data.party[0]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const setVisibility = async (visibility) => {
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/setVisibility", {visibility, _id});
      setActualParty(response.data.party[0]);
      console.log(response.data.party[0]);
    } catch (error) {
      console.log(error.response);
    }
  };
  
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
            <Col className="back-prune" xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}> 
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Sorties Publique ou je ne suis pas
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {partyList && partyList.map((data) =>
                  <>
                  { data.name_auth !== token.name && (!(data.menber.indexOf(token.name) > -1)) && data.visibility === "public" &&
                    <Dropdown.Item onClick={() => onchangePartyList(data)}>
                      { data.title_auth != "" && data.title_auth || data.title }
                    </Dropdown.Item>
                  }
                  </>
                )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Mes Sorties a moi
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {partyList && partyList.map((data, i) =>
                  <>
                    { data.name_auth === token.name &&
                      <Dropdown.Item onClick={() => onchangePartyList(data)}>
                        { data.title_auth != "" && data.title_auth || data.title }
                      </Dropdown.Item>
                    }
                  </>
                )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Les Sorties ou je participe ou suis inviter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {partyList && partyList.map((data, i) =>
                  <>
                  { data.menber.indexOf(token.name) > -1 &&
                    <Dropdown.Item onClick={() => onchangePartyList(data)}>
                      { data.title_auth != "" && data.title_auth || data.title }
                    </Dropdown.Item>
                  ||
                    <>
                    { data.askingInvitationByAuthor.indexOf(token.name) > -1 &&
                      <Dropdown.Item onClick={() => onchangePartyList(data)}>
                        { data.title_auth != "" && data.title_auth || data.title }
                      </Dropdown.Item>
                    }
                    </>
                  }
                  </>
                )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col className="back-black">
              { actualParty && actualParty.email_auth === token.email &&
                <Button variant="outline-warning" className="btn-home" onClick={() => party("","cancelParty")}>
                  Annuler la sortie
                </Button>
              }
            </Col>
          </Row>
          { actualParty &&
          <>
          <Row>
            <Col  className="back-grey"  xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}> {/* donner une taille par default */}
              <Row className="back-red">
                <Col className="back-blue2"> 
                { actualParty && actualParty.email_auth === token.email &&
                  <>
                    <p>Titre de l'event : {actualParty.title}</p>
                    <p>Date de l'event : {(actualParty.date.substring(8)) + "-" + (actualParty.date.substring(5, 7)) + "-" + (actualParty.date.substring(0,4))}</p>
                    <p>Adresse de l'event : {actualParty.adress}</p>
                    <img className="" src={actualParty.picture} alt="Image de la sortie" width="50" height="50" />
                    <p>Description : {actualParty.description}</p>

                    <Form onSubmit={submitHandlerParty}>
                        <Form.Group>
                          <Form.Label>Titre de la sortie :</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleActualParty}
                            placeholder="Entrez le titre de la sortie"
                            onChange={(e) => setTitleActualParty(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Lieu de la sortie :</Form.Label>
                          <Form.Control
                            type="text"
                            value={adressActualParty}
                            placeholder="108 rue du jambon"
                            onChange={(e) => setAdressActualParty(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Description de la sortie : </Form.Label>
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
                      {actualParty.visibility === "private" &&
                        <Button style={{marginTop:10}} onClick={() => setVisibility("public")}>
                          Ma sortie est actuelement prive
                        </Button>
                        ||
                        <Button style={{marginTop:10}} onClick={() => setVisibility("private")}>
                          Ma sortie est actuelement public
                        </Button>
                      }

                  </>
                  ||
                  <>
                    <p>Titre de l'event : {actualParty.title}</p>
                    <p>Date de l'event : {(actualParty.date.substring(8)) + "-" + (actualParty.date.substring(5, 7)) + "-" + (actualParty.date.substring(0,4))}</p>
                    <p>Adresse de l'event : {actualParty.adress}</p>
                    <img className="" src={actualParty.picture} alt="Image de la sortie" width="50" height="50" />
                    <p>Description : {actualParty.description}</p>
                    
                    { actualParty.name_auth && <p>Createur/Creatrice de la sortie : {actualParty.name_auth}</p>}
                    <p>Titre de la sortie : { actualParty.title_auth && <span>{actualParty.title_auth}</span> || <span>le createur ne la pas encore definie</span> }</p>
                    <p>Lieux de la sortie : { actualParty.adress_auth && <span>{actualParty.adress_auth}</span> || <span>le createur ne la pas encore definie</span> }</p>
                    <p>Description de la sortie : { actualParty.description_auth && <span>{actualParty.description_auth}</span> || <span>le createur ne la pas encore definie</span> }</p>
                  </>
                }
                </Col>
              </Row>
          </Col>
          <Col className="back-blue"  xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}> 
          <Container>
            {actualParty &&
              <Row>
              <h4 style={{marginTop:20}}>Listes des menbres</h4>
                <Col className="back-green"  >  {/*list des gens qui ont rejoins*/}
                <div className="scroll_div">
                    <>
                      {actualParty.menber.map((user, i) =>
                        <div className="back-slime">
                          <p key={i}> {user}</p>
                          {actualParty.name_auth === token.name && 
                            <Button onClick={() => party(user, "kickUser")}>
                              retirer
                            </Button>
                          }
                          {(actualParty.menber.indexOf(token.name) > -1) &&
                            <Button onClick={() => leaveParty(token.name)}>
                              Quiter la sortie
                            </Button>
                          }
                        </div>
                      )}
                    </>
                  </div>
                </Col>
              </Row>
            }
            { actualParty && actualParty.name_auth === token.name &&
              <Row>
                <h4 style={{marginTop:20}}>Inviter des personnes</h4>
                <Col className="back-prune"  > {/*list des gens a inviter*/}
                  <div className="scroll_div">
                  <>
                    {Users && Users.map((user, i) =>
                      <>
                        <div className="back-slime" style={{marginBottom:10, marginTop:10}}>
                          {user.name !== token.name && (!(actualParty.askingInvitation.indexOf(user.name) > -1)) && (!(actualParty.askingInvitationByAuthor.indexOf(user.name) > -1)) &&
                          <>
                            <span>{user.name}</span>
                            <Button variant="info" className="btn-home" onClick={() => party(user.name, "inviteUser")}>
                              inviter
                            </Button>
                          </>
                          }
                        </div>
                      </>
                    )}
                  </>
                </div>
              </Col>
            </Row>
          }
          {actualParty && actualParty.name_auth !== token.name && (!(actualParty.menber.indexOf(token.name) > -1)) && actualParty.visibility === "public" &&
            <Row>
              <Col className="back-prune"  > {/*demmande au createur a venir*/}
                  <>
                    {(actualParty.askingInvitation.indexOf(token.name) > -1) && 
                      <Button variant="warning" onClick={() => party(token.name, "refuseInvitation")}>
                        Annuler la demande d'invitation
                      </Button>
                    ||
                      <Button variant="info" className="btn-home" onClick={() => party(token.name, "askInvitation")}>
                        demander a se faire inviter
                      </Button>
                    }
                  </>
              </Col>
            </Row>
          }
          {actualParty && actualParty.name_auth !== token.name && (!(actualParty.menber.indexOf(token.name) > -1)) && actualParty.askingInvitationByAuthor.indexOf(token.name) > -1 &&
            <Row>
              <Col>
                <Button variant="info" className="btn-home" onClick={() => party(token.name, "acceptInvitation")}>
                  accepter l'invitation
                </Button>
                <Button variant="info" className="btn-home" onClick={() => party(token.name, "cancelInvite")}>
                  refuser l'invitation
                </Button>
              </Col>
            </Row>
          }


            { actualParty && actualParty.name_auth === token.name &&
              <Row> {/*list de demande*/}
                <h4 style={{marginTop:20}}>Liste des demandes</h4>
                <Col className="back-red">
                  <div className="scroll_div">
                  {actualParty.askingInvitation.map((user, i) =>
                  <div style={{display:"flex",}}>
                    <h5>{user}</h5>
                    <Button style={{width:15, }} variant="success"  onClick={() => party(user, "acceptInvitation")}>
                    ✓
                    </Button>
                    <Button  style={{width:15,}} variant="danger" onClick={() => party(user, "refuseInvitation")}>
                    X
                    </Button>
                  </div>
                  )}
                  </div>
                </Col>
              </Row>
            }
            { actualParty && actualParty.name_auth === token.name &&
              <Row> {/*list des demande de l'auteur en attente d'acceptation*/}
                <h4 style={{marginTop:20}}>Liste en attente</h4>
                <Col className="back-black">
                  <div className="scroll_div">
                  {actualParty.askingInvitationByAuthor.map((user, i) =>
                  <>
                    {(!(actualParty.menber.indexOf(user) > -1)) &&
                    <div style={{display:"flex",}}>
                      <h5>{user}</h5>
                      <Button  style={{width:15,}} variant="danger" onClick={() => party(user, "cancelInvite")}>
                        X
                      </Button>
                    </div>
                    }
                  </>
                  )}
                  </div>
                </Col>
              </Row>
            }
          </Container>
        </Col>
        </Row>
        <Row className="back-yellow"> {/*Chat*/}
            {actualParty && actualParty.chat.map((msg, i) =>
            <>
            { Object.keys(msg)[0] === token.name && Object.keys(msg)[0] !== actualParty.name_auth &&
              <p /* msg de l'user quand pas auteur*/ style={{color:'red'}}>{Object.keys(msg)[0]} : {msg[Object.keys(msg)[0]]}</p>
            }
            { Object.keys(msg)[0] === token.name && Object.keys(msg)[0] === actualParty.name_auth && 
              <p /* msg de l'auteur quand user aussi*/ style={{color:'yellow'}}>{Object.keys(msg)[0]} : {msg[Object.keys(msg)[0]]}</p>
            }
            { Object.keys(msg)[0] !== token.name && Object.keys(msg)[0] === actualParty.name_auth && 
              <p /* msg de l'auteur quand pas user*/ style={{color:'blue'}}>{Object.keys(msg)[0]} : {msg[Object.keys(msg)[0]]}</p>
            }
            { Object.keys(msg)[0] !== token.name && Object.keys(msg)[0] !== actualParty.name_auth && 
              <p /* msg des autres */ style={{color:'green'}}>{Object.keys(msg)[0]} : {msg[Object.keys(msg)[0]]}</p>
            }
            { Object.keys(msg)[0] === token.name &&
              <Button  style={{width:15,}} variant="danger" onClick={() => deleteMsg(msg)}>
                X
              </Button>
              ||
              <>
              { actualParty.name_auth === token.name &&
                <Button  style={{width:15,}} variant="danger" onClick={() => deleteMsg(msg)}>
                  X
                </Button>
              }
              </>
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
        </>
        }
      </Container>
    </>
  );
}

export default ProfilPage;