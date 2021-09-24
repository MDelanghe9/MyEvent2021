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
      if (action === "cancelParty") {
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
            props.history.go('/partyCancel'); // reirection to cancel party

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
                  { targetUser && targetUser.image &&
                    <img style={{width:125, height:125}} src={targetUser.image}/>
                    ||
                    <img style={{width:125, height:125}} src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/>
                    
                  }
                <p>Bio : {targetUser.description}</p>
                {targetUserPartys && targetUserPartys.map((data) =>
                <>
                  {data.visibility !== "private" &&
                    <Container style={{margin:20, border:"1px solid black"}}>
                      <Row>
                        <Col>
                      <p>Titre de l'event : {data.title}</p>
                      <p>Date de l'event : {(data.date.substring(8)) + "-" + (data.date.substring(5, 7)) + "-" + (data.date.substring(0,4))}</p>
                      <p>Adresse de l'event : {data.adress}</p>
                      <p>Nombre de participant: {((data.menber).lenght) > 0 || 0}</p>
                          {((data.menber.indexOf(token.name) > -1)) &&   token.name === targetUser.name &&
                            <Button variant="outline-info" className="btn-home disabled" onClick={() => alert("vous etes deja menbre, rdv profil pour plus de posibiliter")}>
                              Déjà membre
                            </Button>
                          ||
                          <>
                              { ((data.askingInvitation.indexOf(token.name) > -1)) &&   token.name === targetUser.name &&
                                <Button variant="outline-info" className="btn-home disabled" onClick={() => alert("vous etes deja menbre, rdv profil pour plus de posibiliter")}>
                                  En attente
                                </Button>
                              ||
                              <>
                                {data.askingRequired === true &&   token.name === targetUser.name &&
                                <Button variant="outline-info" className="btn-home" onClick={() => partyTwo(data, "askInvitation", targetUser.name)}>
                                  Demander à rejoindre
                                </Button>
                                ||
                                <>
                                 {token.name === targetUser.name &&
                                  <Button variant="outline-info" className="btn-home" onClick={() => partyTwo(data, "acceptInvitation", targetUser.name)}>
                                    Rejoindre
                                  </Button>
                                  }
                                </>
                                }
                              </>
                              }
                          </>
                          }
                          </Col>
                          <Col  xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                          <img className="" src={data.picture} alt="Image de la sortie" width="200" height="200" />
                          </Col>
                          <Col  xs={0} sm={0} md={0} lg={1} xl={1} xxl={1}>
                          </Col>
                        </Row>
                    </Container>
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
                <img className="profilChange" title="Cliquez pour modifier votre photo de profil" onClick={() => (setImgInput(true))}  src={User.image}
                 alt="Image de profil" 
                 style={{borderRadius:'100%', width:'50px', height:'50px', marginRight:'10px'}}/>
                ||
                <img className="profilChange" title="Cliquez pour modifier votre photo de profil"  onClick={() => (setImgInput(true))}  src={token.picture} alt="Image de profil" style={{borderRadius:'100%', maxWidth:'40px', height:'auto', marginRight:'10px'}}/>
              }
                { imgInput &&
                  <>
                    <input  placeholder="Taper google pour restaurer votre image de profil google" title="Entrez un URL" onChange={(e) => setImageUser(e.target.value)} type="text" style={{fontSize:'15px', minWidth:'380px'}}/><br></br>
                    <Button onClick={() => (updateUser(imageUser), setImgInput(false))} variant="outline-success" className="m-1">
                      Valider
                    </Button>
                    <Button onClick={() => (setImageUser(false), setImgInput(false))} variant="outline-warning" className="m-1">
                      Annuler
                    </Button>
                    <br></br>
                  </>
                }

                {token.name}
                <hr></hr>
                <span className="email">{token.email}</span><br></br>
                <span title="Cliquez pour modifier votre description" onClick={() => (setDescInput(true))} className="userDesc">{User.description}</span>
                { descInput &&
                  <>
                    <span><input  onChange={(e) => setDescUser(e.target.value)} type="text" /></span><br></br>
                    <Button onClick={() => (updateUser(descUser), setDescInput(false))} variant="outline-success" className="m-1">
                      Valider
                    </Button>
                    <Button onClick={() => (setDescUser(false), setDescInput(false))} variant="outline-danger">
                      Annuler
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
            <Col xs={11} sm={11} md={11} lg={9} xl={9} xxl={9}> {/* donner une taille par default */}
              <Row>
                <Col className="resume"> 
                { actualParty && actualParty.email_auth === token.email &&
                  <>
                  <h2>{actualParty.title}</h2>
                    <p className="resumeDate"><span className='gras'>Date : </span> {(actualParty.date.substring(8)) + "-" + (actualParty.date.substring(5, 7)) + "-" + (actualParty.date.substring(0,4))}</p>
                    <p className="resumeImg"><img src={actualParty.picture} alt="Image de la sortie"/></p>
                    <p className="resumeAdress"><span className='gras'>Adresse : </span> {actualParty.adress}</p>
                    <p><span className='gras'>Description : </span> {actualParty.description}</p>

                    <Form onSubmit={submitHandlerParty}>
                        <Form.Group>
                          <h3>Personnalisation de ma sortie</h3>
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
                        <Button className="outline-purple mt-3 mb-3" type="submit" style={{marginRight:"10px"}}>
                          Valider
                        </Button>

                        {actualParty.visibility === "private" &&
                        <Button onClick={() => setVisibility("public")} variant="outline-dark" className="mt-3 mb-3" style={{marginRight:"10px"}}>
                          Ma sortie est actuelement privée
                        </Button>
                        ||
                        <Button onClick={() => setVisibility("private")} variant="outline-success" className="mt-3 mb-3" style={{marginRight:"10px"}}>
                          Ma sortie est actuelement publique
                        </Button>
                        }
                        {actualParty.askingRequired === true &&
                          <Button onClick={() => setAskingRequired(false)} variant="outline-dark" className="mt-3 mb-3">
                            Ma sortie est actuellement restreinte
                          </Button>
                          ||
                          <Button onClick={() => setAskingRequired(true)} variant="outline-success" className="mt-3 mb-3">
                            Tout le monde peut rejoindre ma sortie
                          </Button>
                        }
                      </Form>
                  </>
                  ||
                  <>
                    <h2>Titre de l'event : {actualParty.title}</h2>
                      <p className="resumeDate"><span className='gras'>Date : </span> {(actualParty.date.substring(8)) + "-" + (actualParty.date.substring(5, 7)) + "-" + (actualParty.date.substring(0,4))}</p>
                      <p className="resumeImg"><img src={actualParty.picture} alt="Image de la sortie"/></p>
                      <p className="resumeAdress"><span className='gras'>Adresse : </span> {actualParty.adress}</p>
                      <p><span className='gras'>Description : </span> {actualParty.description}</p>

                    <div className='events-list m-2'>
                      { actualParty.name_auth && <p><span className='gras'>Createur/Creatrice de la sortie : </span> {actualParty.name_auth}</p>}
                      <p><span className='gras'>Titre : </span>{ actualParty.title_auth && <span>{actualParty.title_auth}</span> || <span>Le créateur n'a pas encore défini sa sortie</span> }</p>
                      <p><span className='gras'>Lieu :  </span>{ actualParty.adress_auth && <span>{actualParty.adress_auth}</span> || <span>Le créateur n'a pas encore choisi le lieu</span> }</p>
                      <p><span className='gras'>Description de la sortie :  </span>{ actualParty.description_auth && <span>{actualParty.description_auth}</span> || <span>Le créateur n'a pas encore édité de description</span> }</p>
                    </div>
                  </>
                }
                </Col>
              </Row>
          </Col>
          <Col xs={10} sm={10} md={11} lg={3} xl={3} xxl={3}> 
          <Container className="memberContainer resume">
            {actualParty &&
              <Row>
              <h5 style={{marginTop:20, textDecoration:'underline'}}>Liste des participants</h5>
                <Col>  {/*list des gens qui ont rejoins*/}
                <div className="scroll_div">
                    <>
                      {actualParty.menber.map((user, i) =>
                        <div>
                          <p key={i}> {user}</p>
                          {actualParty.name_auth === token.name && 
                            <Button onClick={() => party(user, "kickUser")} variant="outline-danger">
                              Retirer de la liste
                            </Button>
                          }
                          {(actualParty.menber.indexOf(token.name) > -1) &&
                            <Button onClick={() => leaveParty(token.name)} variant="outline-danger">
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
                <h5 style={{marginTop:20, textDecoration:'underline'}}>Membres</h5>
                <Col> {/*list des gens a inviter*/}
                  <div className="scroll_div">
                  <>
                    {Users && Users.map((user, i) =>
                      <>
                        <div style={{marginBottom:10, marginTop:10}}>
                          {user.name !== token.name && (!(actualParty.askingInvitation.indexOf(user.name) > -1)) && (!(actualParty.askingInvitationByAuthor.indexOf(user.name) > -1)) &&
                          <>
                            <span>{user.name}</span>
                            <span onClick={() => (setDisplayModal(true), getUser(user.email, "profil"), getTargetUserPartys(user.name))}> 🔍</span>
                            <br></br>
                            <Button variant="info" className="outline-purple" onClick={() => party(user.name, "inviteUser")}>
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
              <Col> {/*demmande au createur a venir*/}
                  <>
                    {(actualParty.askingInvitation.indexOf(token.name) > -1) && 
                      <Button variant="outline-danger" className="btn-member mb-1" onClick={() => party(token.name, "refuseInvitation")}>
                        Annuler l'invitation
                      </Button>
                    ||
                    <>
                      {actualParty.askingRequired === true && 
                        <Button variant="outline-warning" className="btn-member mb-1" onClick={() => party(token.name, "askInvitation")}>
                          Demander à participer
                        </Button>
                        ||
                        <Button variant="outline-warning" className="btn-member mb-1" onClick={() => party(token.name, "acceptInvitation")}>
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
                <Button variant="outline-info" className="btn-member mb-1" onClick={() => party(token.name, "acceptInvitation")}>
                  Accepter l'invitation
                </Button>
                <Button variant="outline-info" className="btn-member mb-1" onClick={() => party(token.name, "cancelInvite")}>
                  Refuser l'invitation
                </Button>
              </Col>
            </Row>
          }


            { actualParty && actualParty.name_auth === token.name &&
              <Row> {/*list de demande*/}
                <h5 style={{marginTop:20, textDecoration:'underline'}}>Demandes de participation</h5>
                <Col>
                  <div className="scroll_div">
                  {actualParty.askingInvitation.map((user, i) =>
                  <div style={{display:"flex",}}>
                    <h5>{user}</h5>
                    <Button className="btnShort" variant="outline-success"  onClick={() => party(user, "acceptInvitation")}>
                    ✔
                    </Button>
                    <Button className="btnShort" variant="outline-danger" onClick={() => party(user, "refuseInvitation")}>
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
                <h5 style={{marginTop:20, textDecoration:'underline'}}>Liste en attente</h5>
                <Col className="">
                  <div className="scroll_div">
                  {actualParty.askingInvitationByAuthor.map((user, i) =>
                  <>
                    {(!(actualParty.menber.indexOf(user) > -1)) &&
                    <div style={{display:"flex",}}>
                      <h5>{user}</h5>
                      <Button variant="outline-danger" className='btnShort' onClick={() => party(user, "cancelInvite")}>
                      ✘
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
        <Row className="msgBox m-2" sm="true"> {/*Chat*/}
          <h3>Discussions : </h3>
            {actualParty && actualParty.chat.map((msg, i) =>
            <>
            { Object.keys(msg)[0] === token.name && Object.keys(msg)[0] !== actualParty.name_auth &&
              /* msg de l'user quand pas auteur*/
              <div className="msg">
                <p className="auteurMsg" style={{color:'red'}}> {Object.keys(msg)[0]} <span style={{color:'grey'}}>(auteur)</span></p> 
                <p> {msg[Object.keys(msg)[0]]}</p>
              </div>
            }
            { Object.keys(msg)[0] === token.name && Object.keys(msg)[0] === actualParty.name_auth && 
              /* msg de l'auteur quand user aussi*/
              <div className="msg">
                <p className="auteurMsg" style={{color:'blue'}}> {Object.keys(msg)[0]} <span style={{color:'grey'}}>(auteur)</span></p>
                <p> {msg[Object.keys(msg)[0]]}</p>
              </div>
            }
            { Object.keys(msg)[0] !== token.name && Object.keys(msg)[0] === actualParty.name_auth && 
              /* msg de l'auteur quand pas user*/
              <div className="msg lesAutres">
                <p className="auteurMsg" style={{color:'yellow'}} >{Object.keys(msg)[0]} </p>
                <p> {msg[Object.keys(msg)[0]]}</p>
              </div>
            }
            { Object.keys(msg)[0] !== token.name && Object.keys(msg)[0] !== actualParty.name_auth && 
               /* msg des autres */ 
              <div className="msg lesAutres">
                <p className="auteurMsg" style={{color:'green'}}> {Object.keys(msg)[0]}</p>
                <p> {msg[Object.keys(msg)[0]]} </p>
              </div>
            }
            { Object.keys(msg)[0] === token.name &&
              <Button onClick={() => deleteMsg(msg)} className="eraseMsg">
                Supprimer le message
              </Button>
              ||
              <>
              { actualParty.name_auth === token.name &&
                <Button onClick={() => deleteMsg(msg)} className="eraseMsg">
                  Supprimer le message
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
              {/* <Form.Label>Message</Form.Label> */}
              <Form.Control
                type="text"
                value={newMessage}
                placeholder="Tapez ici votre message"
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-dark mt-1 mb-3" type="submit">
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