import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import GetGeoLocation from "../components/GetGeoLocation";
import CityList from "../components/CityList";
///////////////////////////////////////////////////
import DistanceList from "../components/DistanceList";
///////////////////////////////////////////////////
import MyNav from "../components/navBar";
import ScrollTop from 'react-scrolltop-button';
import Footer from "../components/footer";
import "../App.css";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  Modal,
  Dropdown,
  PopoverTitle
} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { random } from "colors";

function HomePage(props) {
  const [events, setEvents] = useState(false);
  const [eventsFiltred, setEventsFiltred] = useState(false);
  const [dist, setDist] = useState(1000);
  const [curentDate, setCurentDate] = useState(1000);

  const gps = GetGeoLocation();
  const [city, setCity] = useState("Ou entrez ici la ville de votre choix !");
  
  const [dataTags, setDataTags] = useState(false);
  const [paginNbr, setPaginNbr] = useState(5);
  
  const [token, setToken] = useState(false);
  const [imgProfil, setImgProfil] = useState(false);
  const [partysOfEvent, setPartysOfEvent] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [infosEvent, setInfosEvent] = useState(false);

  useEffect(() => {
    var tokenExist = localStorage.getItem('authToken');
    if (tokenExist) {
      var decoded = jwt_decode(tokenExist);
      setToken(decoded);
      setImgProfil(decoded.picture);
      console.log("token =>" , decoded);
    }

    var yourDate = new Date();

    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    yourDate = yourDate.toISOString().split('T')[0]
    console.log(yourDate);
    setCurentDate(yourDate);
   // getEvent();
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

  // changer le nombre a -2 pou viser 2 div event ou more dans le futur
  const trackScrolling = (i) => {
    if (i == paginNbr -1) {
      setPaginNbr(paginNbr + 5)
     // console.log(paginNbr);
    }else{
     // console.log(i);
    }
  };

  const creatArrayTags = (data) => {
    var tempo = "";
    data.forEach((element) => {
      tempo = tempo + element.fields.tags;
      tempo = tempo + ",";
    });
    tempo = tempo.replaceAll(',,', ',');
    tempo = tempo.replaceAll(',undefined', '');
    tempo = tempo.replaceAll('"', '');
    let array = tempo.split(',');
    array.sort();
    array.shift();

    const counts = {};
    let array2 = [];
    var sortable = [];

    array.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    for (var event in counts) {
        sortable.push([event, counts[event]]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    array2 = sortable.reverse();
    setDataTags(array2);
  }

  const getEventByCoord = async () => {
    try {
      const response = await axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=date_start>=+"+curentDate+"&sort=-date_start&rows=10000&facet=&geofilter.distance="+gps.coordinates.lat+"%2C+"+gps.coordinates.lng+"%2C"+dist);
      creatArrayTags(response.data.records);
      setEvents(response.data.records)
      console.log(response.data.records);
      setEventsFiltred(response.data.records);
    } catch (error) {
      console.log(error.response);
    }
  }

  const getEventByCity = async () => {
    try {
      const response = await axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=date_start>=+"+curentDate+"&sort=-date_start&refine.city="+(city.toLowerCase().charAt(0).toUpperCase() + city.slice(1)));
 
      creatArrayTags(response.data.records);
      setEvents(response.data.records)
      setEventsFiltred(response.data.records);
    } catch (error) {
      console.log(error.response);
    }
  }

  //exposition
  const getEventByType  = async (type) => {
    try {
      const response = await axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=date_start>=+"+curentDate+"&sort=-date_start&&refine.tags="+type);
      creatArrayTags(response.data.records);
      setEvents(response.data.records)
      setEventsFiltred(response.data.records);
      window.scrollTo(-500, -500);
    } catch (error) {
      console.log(error.response);
    }
  }

  


  const setPossition = () => {
    if (city === "Ou entrez ici la ville de votre choix !") {
      if (gps.loaded === false) {
        toast.info("Partage de vos coordonn??es : Vous devez confirmer votre choix avant de pouvoir continuer.")
      }else{
        if (gps.error) {
          console.log(gps.error.message)
          toast.warning("Vous avez refus?? le partage de coordon??es, vous pouvez malgr?? tout chercher les evenements par villes. Si c'est une erreur veuillez recharger la page")
        }
        else{
          console.log(gps.coordinates.lat)
          console.log(gps.coordinates.lng)
          getEventByCoord()
        }
      }
    }else{
      getEventByCity();
    }
  }

  const onchangeListCity = (data) => {
    setCity(data)
    console.log(data);
  }
///////////////////////////////////////////////////
  const onchangeDistlist = (data) => {setDist(data)}
///////////////////////////////////////////////////
//todo retirer event, we just need filtred events all time
const filtreType = (e) => {
  if (e.target.value !== "null") {
      const arrayTempo = []
      events.forEach((event) => {
        if (event.fields.tags) {
          arrayTempo.push(event);
        }
      });
  //   console.log(arrayTempo)
      const result = arrayTempo.filter((event, i) => 
          event.fields.tags.includes(e.target.value)
      );
      console.log(result);
      setEventsFiltred(result);
  }else{
    setEventsFiltred(events);
  }
}

const fetchParty = async (data) => {
  console.log("uid =>", data.uid);
  var id = data.uid;
  try {
    const response = await axios.post("http://localhost:4242/api/party/party", {id});
    console.log(response.data.result);
    setPartysOfEvent(response.data.result);
  } catch (error) {
   console.log(error.response);
  }
}

const party = async (data, action) => {
  var _id = data._id;
  var name = token.name;
  console.log("id =< ",_id);
  console.log(name);
  try {
    const response = await axios.post("http://localhost:4242/api/party/"+action , {name, _id}); 
    console.log(response);
    fetchParty(infosEvent);
  } catch (error) {
    console.log(error.response);
  }
};

const creatParty = async (event) => {
  //par default la sortie sera private , il peux changer cela dans son profil
  console.log(event);
  var config = {};
  var id_event = event.uid;
  var email_auth= token.email;
  var name_auth= token.name; 
  var title = event.title;
  var date = event.date_start;
  var description = event.free_text;
  var picture = event.image;
  var adress = event.address;
  config.headers = {
      "Authorization" : "Bearer xx", //ici le berarer token
  }
  try {
    const response = await axios.post("http://localhost:4242/api/party/creatparty", {id_event, email_auth, name_auth, title, picture, date, adress, description}, config); 
    
    //console.log(response);

    toast.dark("??? Votre sortie a bien ??t?? cr????e ! ???? Rendez vous sur votre profil afin de la configurer et la passer en publique.")
    
  } catch (error) {
   //console.log(error.response);
   toast.error("Une erreur s'est produite, veuillez r??essayer.")

  }
}
// Modal

let date = "";
  return (
    <>
      <MyNav  token={token}/>
      {displayModal && infosEvent &&
      <Container fluid  >
        <Row>
          <Col>
          <Col>
            <div>
            <Modal show={displayModal}>
                <Modal.Header>
                  <Modal.Title>{infosEvent.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Row>
                    <h4 className="mb-3">{infosEvent.description}</h4>
                      <hr></hr><hr></hr>
                      <Col className='mt-3' sm>
                        <img src={infosEvent.image} alt="affiche de l'event" width="100%" height="auto" className='modal-img'/>
                      </Col>
                      <Col className='mt-3' sm>
                        <p className="adressEvent gras">{infosEvent.address}<br></br>{infosEvent.city_district}</p>
                        <p className="textEvent">{infosEvent.free_text}</p>
                      </Col>
                  </Row>
                  <Row>
                      <h4 className="mb-3" style={{borderTop:"1px solid black", marginTop:20}}>Les sorties de cet ??v??nement</h4>
                      {partysOfEvent && partysOfEvent.map((data, i) =>
                      <div  style={{backgroundColor:"rgb("+ (i%2 * 197 + 120)+","+(i%2 * 197 + 120)+","+(i%2 * 197 + 120)+")", margin:20, 
                      }}>
                        {data.visibility === "private" && 
                        <div key={i}>
                          <p>Cr??ateur : {data.name_auth}</p>
                          <p>Nombre de participants: {((data.menber).lenght) > 0 || 0}</p>
                          {((data.menber.indexOf(token.name) > -1)) &&
                            <Button variant="outline-info" className="btn-home disabled" onClick={() => alert("Vous ??tes d??j?? menbre, rendez voussur votre profil pour plus de posibilit??s")}>
                              D??j?? membre
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
                                <Button variant="outline-info" className="btn-home" onClick={() => party(data, "askInvitation")}>
                                  Demander ?? rejoindre
                                </Button>
                                ||
                                <Button variant="outline-info" className="btn-home" onClick={() => party(data, "acceptInvitation")}>
                                  Rejoindre
                                </Button>
                                }
                              </>
                              }
                          </>
                          }
                        </div>
                        }
                      </div>
                      )}
                  </Row>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="outline-dark" onClick={() => (setDisplayModal(false), setInfosEvent(false))}>
                    Retour
                  </Button>
                  <Button className="outline-purple" onClick={() => creatParty(infosEvent)}>
                    Cr??er sortie
                  </Button>
                </Modal.Footer>
            </Modal>
            </div>
          </Col>
          </Col>
        </Row>
      </Container>
      }
      <Container>
        {gps.loaded &&
          <>
            <Row className='containerInput'>
              <span className='spanHome'>Choissisez une ville : </span>
              <Col>
                  <CityList data={city} onchange={(e) => {onchangeListCity(e); }}/>
              </Col>
              <Col>
                  <Form.Control
                      type="text"
                      value={city}
                      placeholder="Ou entrez ici la ville de votre choix !"
                      onChange={(e) => setCity(e.target.value)}
                      className="inputHome2"
                  />
                </Col>
                <Col>
                  <DistanceList data={dist} onchange={(e) => {onchangeDistlist(e); }} />
                </Col>
                {dataTags &&
                  <>
                      <Col>
                        <select name="typeFiltre-select" onChange={filtreType} className='inputHome3 selectList'>
                          <option value="null">Filtrer les types d'??v??nements ici</option>
                            {dataTags && dataTags.map((data, i) =>
                          <option key={i} value={data[0]}>{data[0] + " : " + data[1]}</option>
                            )}
                        </select>
                      </Col>
                  </>
                  }
                  <Col className="btn-setPosition">
                    <Button variant="outline-info" className="btn-home" onClick={() => setPossition()}>
                      RECHERCHER
                    </Button>
                  </Col>
            </Row>

            {eventsFiltred &&

              <>
              { eventsFiltred.map((event, i) => i <= paginNbr-1 &&

                <Row key={i} className="events-list-container w-100 m-2" onMouseOver={() => trackScrolling(i)}>
                  <div className="events-list">
                    <Col>
                      <h2 className="desc">{event.fields.title}</h2>
                    </Col>
                    <Dropdown.Divider className='m-3'/>
                    <Col>
                      <p className="gras text-center">
                        <span>Du </span>
                        {(event.fields.date_start.substring(8)) + "-" + (event.fields.date_start.substring(5, 7)) + "-" + (event.fields.date_start.substring(0,4))}
                        <span> au </span>
                        {(event.fields.date_end.substring(8)) + "-" + (event.fields.date_end.substring(5, 7)) + "-" + (event.fields.date_end.substring(0,4))}
                      </p>
                    </Col>
                    <Col className='mb-3'>
                      <h4 className="gras">{event.fields.city}</h4>
                    </Col>
                    {event.fields.image &&
                      <Col>
                        <img src={event.fields.image} alt="affiche de l'event" width="400px" height="auto" className='imgEvent' />
                      </Col>
                    ||
                      <Col>
                        <img src={require("../defaultposter.png")} alt="" width="250" height="200" />
                      </Col>
                    }
                    {/*afficher seulement si l'useur et co ou message d'erreur genre => mec tes pas co '-' */}
                    <Button className='m-3 outline-purple'
                      onClick={() => (setDisplayModal(true), setInfosEvent(event.fields), fetchParty(event.fields))}>
                      En savoir +
                    </Button>
                  </div>
                </Row>
              )}
              </>
              ||
              <Row className="w-100">
                  <Col className="event-list text-center imgRandomHome">
                        <div  onClick={() => (getEventByType("concert"))} className="absolutTitle imgConcert">
                          <p>CONCERTS</p>
                        <img src="https://www.lusineamusique.fr/wp-content/uploads/2018/05/CONCERTS-e1535802666628.jpg"
                          alt="photo concerts" width="100%" height="auto"/></div>
                        <div  onClick={() => (getEventByType("exposition"))} className="absolutTitle imgMusee">
                          <p>MUS??ES</p>
                        <img src="https://storage.lebonguide.com/crop-1600x700/56/42/7364E7F4-B7AF-4C20-97CA-4A1D561C03FB.png"
                          alt="photo musees" width="100%" height="auto"/></div>
                        <div onClick={() => (getEventByType("sport"))} className="absolutTitle imgSport">
                          <p>EXHIBITIONS</p>
                        <img src="https://www.ggba-switzerland.ch/wp-content/uploads/2018/04/Sports-HSC.jpg"
                          alt="photo sports" width="100%" height="auto"/></div>
                  </Col>
              </Row>
            }
          </>
          ||
          <Row className="row-spinner">
            <Col className="text-center">
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Col>
          </Row>
      }
      <Footer/>
      <ScrollTop
        breakpoint={3000}
        text=' '
        icon={<img src="https://img.icons8.com/dotty/80/000000/thick-arrow-pointing-up.png" width="30px" height="30px"/>}
      />
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
    </>
  );
}

export default HomePage;