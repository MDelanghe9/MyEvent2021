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
  Form,  Modal,
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
 const [User, setUser] = useState(false);
 const [curentDate, setCurentDate] = useState(1000);
 const [imgProfil, setImgProfil] = useState(false);

 const [partyList, setPartyList] = useState([]);
 const [actualParty, setActualParty] = useState(false);
 const [titleActualParty, setTitleActualParty] = useState("go a ma maison pour le match !");
 const [adressActualParty, setAdressActualParty] = useState("108 rue du jambon");
 const [descriptionActualParty, setDescriptionActualParty] = useState("Vindez vous amusez !!");
 const [newMessage, setNewMessage] = useState("");
 const [intervalTime, setIntervalTime] = useState(5000);
 const [imgInput, setImgInput] = useState(false);
 const [imageUser, setImageUser] = useState(false);
 const [descInput, setDescInput] = useState(false);
 const [descUser, setDescUser] = useState("");
 const [displayModal, setDisplayModal] = useState(false);
 const [targetUser, setTargetUser] = useState(false);
 const [targetUserPartys, setTargetUserPartys] = useState(false);

 
 useInterval(() => {
   // Do some API call here
   //refreshChat();
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
    getUser(token.email, "token");
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

  const getUser = async (email, mode) => {
    if (typeof email !== 'object') {
      email = { email }
    }
    try {
      const response = await axios.post("http://localhost:4242/api/users/one", {email}); 
      console.log(response.data.user);
      if (mode == "token") {
        setUser(response.data.user[0]);
      }else{
        setTargetUser(response.data.user[0]);
      }
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

  const partyTwo = async (name = "", action ="", auth) => {
    console.log(name);
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/"+action , {name, _id}); 
      console.log(response);
      getTargetUserPartys(auth);
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
  
  const setAskingRequired = async (askingRequired) => {
    var _id = actualParty._id;
    try {
      const response = await axios.post("http://localhost:4242/api/party/askingRequired", {askingRequired, _id});
      setActualParty(response.data.party[0]);
      console.log(response.data.party[0]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateUser = async (data) => {
    var email = User.email;
    var description = descUser;
    var image = imageUser;
    if (image == "google") {
      image = token.picture;
    }
    console.log(email);
    console.log(description);
    console.log(image);
    try {
      const response = await axios.post("http://localhost:4242/api/users/updateInfo", {email, description, image});
      console.log(response.data.user[0]);
      setUser(response.data.user[0]);
    } catch (error) {
      console.log(error.response);
    }
  };
  
  const getTargetUserPartys = async (name_auth) => {
    if (typeof name_auth !== 'object') {
      name_auth = { name_auth }
    }
    try {
      const response = await axios.post("http://localhost:4242/api/users/allPartys", {name_auth}); 
      console.log(response.data.partys);
      setTargetUserPartys(response.data.partys);
    } catch (error) {
      console.log(error.response);
    }
  }
  

  return (
    <>
      <MyNav token={token}/>
        <Modal show={displayModal}>
                <Modal.Header>
                  <Modal.Title>Profil de : {targetUser.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                {targetUser.description}
                {targetUserPartys && targetUserPartys.map((data) =>
                <>
                  {data.visibility !== "private" &&
                    <div>
                      {data.adress}
                      <p>Nombre de participant: {((data.menber).lenght) > 0 || 0}</p>
                          {((data.menber.indexOf(token.name) > -1)) &&
                            <Button variant="outline-info" className="btn-home disabled" onClick={() => alert("vous etes deja menbre, rdv profil pour plus de posibiliter")}>
                              Deja menbre
                            </Button>
                          ||
                          <>
                              { ((data.askingInvitation.indexOf(token.name) > -1)) && 
                                <Button variant="outline-info" className="btn-home disabled" onClick={() => alert("vous etes deja menbre, rdv profil pour plus de posibiliter")}>
                                  En attente
                                </Button>
                              ||
                              <>
                                {data.askingRequired === true && 
                                <Button variant="outline-info" className="btn-home" onClick={() => partyTwo(data, "askInvitation", targetUser.name)}>
                                  Demander a rejoindre
                                </Button>
                                ||
                                <Button variant="outline-info" className="btn-home" onClick={() => partyTwo(data, "acceptInvitation", targetUser.name)}>
                                  Rejoindre
                                </Button>
                                }
                              </>
                              }
                          </>
                          }
                      } 
                    </div>
                  }
                </>
                )}
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="outline-dark" onClick={() => (setDisplayModal(false))}>
                    Retour
                  </Button>
                </Modal.Footer>
            </Modal>
        <Container style={{marginTop:100}} fluid >
          <Row>
            <Col className='profil'>
              <p className='name'>
              <img className="fond-profil" alt="fond profil" src='https://cdn4.vectorstock.com/i/thumb-large/76/78/abstract-light-gray-watercolor-stain-shape-vector-37737678.jpg'/>
              
              {User && User.image && User.image !== "" &&
                <img onClick={() => (setImgInput(true))}  src={User.image}
                 alt="Image de profil" 
                 style={{borderRadius:'100%', width:'50px', height:'50px', marginRight:'10px'}}/>
                ||
                <img onClick={() => (setImgInput(true))}  src={token.picture} alt="Image de profil" style={{borderRadius:'100%', maxWidth:'40px', height:'auto', marginRight:'10px'}}/>
              }
                { imgInput &&
                  <>
                    <input  placeholder="Taper google pour revenir a votre image google" onChange={(e) => setImageUser(e.target.value)} type="text" />
                    <Button onClick={() => (updateUser(imageUser), setImgInput(false))} variant="outline-success">
                      valider
                    </Button>
                    <Button onClick={() => (setImageUser(false), setImgInput(false))} variant="outline-warning">
                      annuler
                    </Button>
                  </>
                }

                {token.name}
                <hr></hr>
                <span className="email">{token.email}</span>
                <p onClick={() => (setDescInput(true))} className="email">{User.description}</p>
                { descInput &&
                  <>
                    <input  onChange={(e) => setDescUser(e.target.value)} type="text" />
                    <Button onClick={() => (updateUser(descUser), setDescInput(false))} variant="outline-success">
                      valider
                    </Button>
                    <Button onClick={() => (setDescUser(false), setDescInput(false))} variant="outline-warning">
                      annuler
                    </Button>
                  </>
                }
              </p>
            </Col>

            <Col className='m-auto btns-profil mb-4'> 
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className='btn-profil mt-2'>
                    Les sorties publiques
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
                <Dropdown.Toggle id="dropdown-basic" className='btn-profil'>
                    Mes sorties personnalisées
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
                <Dropdown.Toggle id="dropdown-basic" className='btn-profil btn-long'>
                    Les sorties auxquelles je participe / Invitations
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

                  { actualParty && actualParty.email_auth === token.email &&
                    <Button className="btn-none btn-profil m-auto" onClick={() => party("","cancelParty")}>
                      Annuler ma sortie
                    </Button>
                  }
              </Dropdown>
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
                  <h4>Résumé</h4>
                    <p><span className='gras'>Titre de l'event : </span> {actualParty.title}</p>
                    <p><span className='gras'>Date de l'event : </span> {(actualParty.date.substring(8)) + "-" + (actualParty.date.substring(5, 7)) + "-" + (actualParty.date.substring(0,4))}</p>
                    <p><span className='gras'>Adresse de l'event : </span> {actualParty.adress}</p>
                    <p><img className="" src={actualParty.picture} alt="Image de la sortie" width="50" height="50" /></p>
                    <p><span className='gras'>Description : </span> {actualParty.description}</p>

                    <Form onSubmit={submitHandlerParty}>
                        <Form.Group>
                          <Form.Label>Titre de ma sortie :</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleActualParty}
                            placeholder="Entrez le titre de la sortie"
                            onChange={(e) => setTitleActualParty(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Lieu de ma sortie :</Form.Label>
                          <Form.Control
                            type="text"
                            value={adressActualParty}
                            placeholder="108 rue du jambon"
                            onChange={(e) => setAdressActualParty(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Description de ma sortie : </Form.Label>
                          <Form.Control
                            type="text"
                            value={descriptionActualParty}
                            placeholder="Description fun !!"
                            onChange={(e) => setDescriptionActualParty(e.target.value)}
                          />
                        </Form.Group>
                        <Button className="outline-purple" type="submit">
                          Valider
                        </Button>
                      </Form>
                      {actualParty.visibility === "private" &&
                        <Button style={{marginTop:10}} onClick={() => setVisibility("public")} variant="outline-dark">
                          Ma sortie est actuelement privée
                        </Button>
                        ||
                        <Button style={{marginTop:10}} onClick={() => setVisibility("private")} variant="outline-success">
                          Ma sortie est actuelement publique
                        </Button>
                      }
                      {actualParty.askingRequired === true &&
                        <Button style={{marginTop:10}} onClick={() => setAskingRequired(false)} variant="outline-dark">
                          Ma sortie est actuellement restreinte
                        </Button>
                        ||
                        <Button style={{marginTop:10}} onClick={() => setAskingRequired(true)} variant="outline-success">
                          Tout le monde peux rejoindre ma sortie
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
                    <p>Titre : { actualParty.title_auth && <span>{actualParty.title_auth}</span> || <span>Le créateur de cette sortie n'a pas encore défini sa sortie</span> }</p>
                    <p>Lieu : { actualParty.adress_auth && <span>{actualParty.adress_auth}</span> || <span>Le créateur n'a pas encore choisi le lieu</span> }</p>
                    <p>Description de la sortie : { actualParty.description_auth && <span>{actualParty.description_auth}</span> || <span>Le créateur n'a pas encore édité de description</span> }</p>
                  </>
                }
                </Col>
              </Row>
          </Col>
          <Col className="back-blue"  xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}> 
          <Container>
            {actualParty &&
              <Row>
              <h4 style={{marginTop:20}}>Listes des participants</h4>
                <Col className="back-green"  >  {/*list des gens qui ont rejoins*/}
                <div className="scroll_div">
                    <>
                      {actualParty.menber.map((user, i) =>
                        <div className="back-slime">
                          <p key={i}> {user}</p>
                          {actualParty.name_auth === token.name && 
                            <Button onClick={() => party(user, "kickUser")}>
                              Retirer de la liste
                            </Button>
                          }
                          {(actualParty.menber.indexOf(token.name) > -1) &&
                            <Button onClick={() => leaveParty(token.name)}>
                              Quitter cet événement
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
                <h4 style={{marginTop:20}}>Membres à inviter</h4>
                <Col className="back-prune"  > {/*list des gens a inviter*/}
                  <div className="scroll_div">
                  <>
                    {Users && Users.map((user, i) =>
                      <>
                        <div className="back-slime" style={{marginBottom:10, marginTop:10}}>
                          {user.name !== token.name && (!(actualParty.askingInvitation.indexOf(user.name) > -1)) && (!(actualParty.askingInvitationByAuthor.indexOf(user.name) > -1)) &&
                          <>
                            <span>{user.name}</span>
                            <span onClick={() => (setDisplayModal(true), getUser(user.email, "profil"), getTargetUserPartys(user.name))}>profil 🔍</span>
                            
                            <Button variant="info" className="btn-home" onClick={() => party(user.name, "inviteUser")}>
                              Inviter
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
                        Annuler l'invitation
                      </Button>
                    ||
                    <>
                      {actualParty.askingRequired === true && 
                        <Button variant="info" className="btn-home" onClick={() => party(token.name, "askInvitation")}>
                          Demander à participer
                        </Button>
                        ||
                        <Button variant="info" className="btn-home" onClick={() => party(token.name, "acceptInvitation")}>
                          Participer
                        </Button>
                      } 
                    </>
                    }
                  </>
              </Col>
            </Row>
          }
          {actualParty && actualParty.name_auth !== token.name && (!(actualParty.menber.indexOf(token.name) > -1)) && actualParty.askingInvitationByAuthor.indexOf(token.name) > -1 &&
            <Row>
              <Col>
                <Button variant="info" className="btn-home" onClick={() => party(token.name, "acceptInvitation")}>
                  Accepter l'invitation
                </Button>
                <Button variant="info" className="btn-home" onClick={() => party(token.name, "cancelInvite")}>
                  Refuser l'invitation
                </Button>
              </Col>
            </Row>
          }


            { actualParty && actualParty.name_auth === token.name &&
              <Row> {/*list de demande*/}
                <h4 style={{marginTop:20}}>Demandes de participation</h4>
                <Col className="back-red">
                  <div className="scroll_div">
                  {actualParty.askingInvitation.map((user, i) =>
                  <div style={{display:"flex",}}>
                    <h5>{user}</h5>
                    <Button style={{width:15, }} variant="success"  onClick={() => party(user, "acceptInvitation")}>
                    ✔
                    </Button>
                    <Button  style={{width:15,}} variant="danger" onClick={() => party(user, "refuseInvitation")}>
                    ✘
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
        {( actualParty.name_auth === token.name || (actualParty.menber.indexOf(token.name) > -1)) &&
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
        }

        </>
        }
      </Container>
    </>
  );
}

export default ProfilPage;