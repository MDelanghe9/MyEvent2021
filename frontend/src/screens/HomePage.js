import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import GetGeoLocation from "../components/GetGeoLocation";
import CityList from "../components/CityList";
///////////////////////////////////////////////////
import DistanceList from "../components/DistanceList";
///////////////////////////////////////////////////
import MyNav from "../components/navBar";
import "../App.css";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
} from "react-bootstrap";


function HomePage() {
  const [events, setEvents] = useState(false);
  const [eventsFiltred, setEventsFiltred] = useState(false);
  const [dist, setDist] = useState(1000);
  const [curentDate, setCurentDate] = useState(1000);

  const gps = GetGeoLocation();
  const [city, setCity] = useState("Les evenements autour de moi");
  const [dataTags, setDataTags] = useState(false);
  const [paginNbr, setPaginNbr] = useState(5);
  
  const [token, setToken] = useState(false);
  const [imgProfil, setImgProfil] = useState(false);


  
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

  const setPossition = () => {
    if (city === "Les evenements autour de moi") {
      if (gps.loaded === false) {
        alert("Veuillez d'abord accepter ou refuser le partage de vos coordonées avant de continuer.")
      }else{
        if (gps.error) {
          console.log(gps.error.message)
          alert("Vous avez refusé le partage de coordonées, vous pouvez malgré tout chercher les evenements par villes. Si c'est une erreur veuillez recharger la page")
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

const creatParty = async (id_event) => {
  //par default la sortie sera private , il peux changer cela dans son profil
  console.log(token);
  var config = {};
  var id_event = id_event;
  var email_auth= token.email;
  var name_auth= token.name;

  config.headers = {
      "Authorization" : "Bearer xx", //ici le berarer token
  }
  try {
    const response = await axios.post("http://localhost:4242/api/users/creatparty", {id_event, email_auth, name_auth}, config); 
    //console.log(response);
    alert("Votre sortie a bien ete cree")
  } catch (error) {
   //console.log(error.response);
   alert("Une erreur est return")

  }

}



  return (
    <>
      <MyNav token={token}/>
      
      
      <Container>
        {gps.loaded &&
          <>
            <Row>
              <Col className='containerInput'>
                <div>
                  <label htmlFor="villes">Choissisez une ville : </label>
                    <p>...ou saisissez une ville : </p>
                </div>
                <div>
                  <CityList data={city} onchange={(e) => {onchangeListCity(e); }}/>
                  <Form.Control
                      type="text"
                      value={city}
                      placeholder="Entrez le nom d'une ville"
                      onChange={(e) => setCity(e.target.value)}
                      className="inputHome2"
                  />
                </div>
                <div>
                  <DistanceList data={dist} onchange={(e) => {onchangeDistlist(e); }} />
                </div>
                {dataTags &&
                  <>
                      <div>
                        <label htmlFor="typeFiltre-select">Choisissez un type d'evenement : </label>
                        <select name="typeFiltre-select" onChange={filtreType} className='inputHome2'>
                          <option value="null">-- Tous --</option>
                            {dataTags && dataTags.map((data, i) =>
                          <option key={i} value={data[0]}>{data[0] + " : " + data[1]}</option>
                            )}
                        </select>
                      </div>
                  </>
                  }
                  <div className="btn-setPosition">
                    <Button variant="outline-info" className="btn-home" onClick={() => setPossition()}>
                      Rechercher
                    </Button>
                  </div>
              </Col>
            </Row>
            {eventsFiltred &&
              <>
              { eventsFiltred.map((event, i) => i <= paginNbr-1 &&
                <Row key={i} className="events-list-container w-100 m-2" onMouseOver={() => trackScrolling(i)}>
                  <div className="events-list">
                    <Col>
                      <h4 className="desc">{event.fields.description}</h4>
                    </Col>
                    <Col>
                      <span className="gras">Dates :</span>{" "}
                      {event.fields.date_start} ~ {event.fields.date_end}
                    </Col>
                    <Col>
                      <span className="gras">Localité :</span> {event.fields.city}
                    </Col>
                    {event.fields.image &&
                      <Col>
                        <img src={event.fields.image} alt="affiche de l'event" width="250" height="200" />
                      </Col>
                    ||
                      <Col>
                        <img src={require("../defaultposter.png")} alt="" width="250" height="200" />
                      </Col>
                    }
                    <p>{event.fields.free_text}</p>
                    {/*afficher seulement si l'useur et co ou message d'erreur genre => mec tes pas co '-' */}
                    <Button variant="outline-info" onClick={() => creatParty(event.fields.uid)}>
                      Créer sortie
                    </Button>
                  </div>
                </Row>
              )}
              </>
              ||
              <Row className="events-list-container w-100 m-3">
                  <Col className="event-list text-center imgRandomHome">
                        <div className="absolutTitle imgConcert">
                          <p>CONCERTS</p>
                        <img src="https://w.wallhaven.cc/full/01/wallhaven-01qlk1.jpg"
                          alt="photo concerts" width="80%" height="auto"/></div>
                        <div className="absolutTitle imgMusee">
                          <p>MUSÉES</p>
                        <img src="https://w.wallhaven.cc/full/13/wallhaven-13k98v.jpg"
                          alt="photo musees" width="8%" height="auto"/></div>
                        <div className="absolutTitle imgSport">
                          <p>EXHIBITIONS</p>
                        <img src="https://w.wallhaven.cc/full/4l/wallhaven-4l337r.jpg"
                          alt="photo sports" width="80%" height="auto"/></div>
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
    </Container>
    </>
  );
}

export default HomePage;