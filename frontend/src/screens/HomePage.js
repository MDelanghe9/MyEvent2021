import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Dropdown, Button } from "react-bootstrap";
import GetGeoLocation from "../components/GetGeoLocation";
import CityList from "../components/CityList";

import MyNav from "../components/navBar";
import "../App.css";

function HomePage() {
  const [events, setEvents] = useState(false);
  const [eventsFiltred, setEventsFiltred] = useState([]);
  const [filtredEventsActive, setFiltredEventsActive] = useState(false);

  const [autoriseGps, SetAutoriseGps] = useState(false);
  const gps = GetGeoLocation();
  const [city, setCity] = useState(false);
  const [dataTags, setDataTags] = useState([]);

  /* const [token, setToken] = useState(false);

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
  /* <p>Position : { gps.loaded && gps.error && gps.error.message &&
    <p>La géolocalisation est imposible</p>
    ||
    <p>{JSON.stringify(gps.coordinates.lat)} : {JSON.stringify(gps.coordinates.lng)}</p>
    }

    </p>*/

  const getEventByCoord = async () => {
    try {
      const response = await axios.get(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&geofilter.distance=" +
          gps.coordinates.lat +
          "%2C+" +
          gps.coordinates.lng +
          "%2C100000"
      );
      //   console.log(response.data);
      console.log(response.data.records);
      setEvents(response.data.records);
      var tempo = "";
      response.data.records.forEach((element) => {
        tempo = tempo + element.fields.tags;
        tempo = tempo + ",";
      });
      tempo = tempo.replaceAll(",,", ",");
      tempo = tempo.replaceAll(",undefined", "");
      let array = tempo.split(",");
      //Todo erase double
      setDataTags(array);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getPossition = () => {
    console.log(gps);
    if (gps.loaded == false) {
      alert("veuillez d'abors accepter ou refuser le partage de vos coordoner");
    } else {
      if (gps.error) {
        console.log(gps.error.message);
        alert(
          "Vos avez refusser le partage de coordonee, vous pouvez malgre tout chercher les evenment par les filtres, si c'est une errur recharger la page"
        );
      } else {
        console.log(gps.coordinates.lat);
        console.log(gps.coordinates.lng);
        getEventByCoord();
      }
    }
  };
  const validFilter = () => {
    console.log(city);
  };

  const onchangeListCity = (data) => {
    setCity(data);
    console.log(data);
  };

  const filtreType = (e) => {
    if (e.target.value !== "null") {
      const arrayTempo = [];
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
      setFiltredEventsActive(true);
    } else {
      setEventsFiltred(events);
    }
  };

  const letsFiltre = (data) => {};
  return (
    <div>
      <MyNav />

      <div>
        <h1 className="eventAvenir">Événements à venir</h1>
        {(gps.loaded && (
          <>
            <h4>Filtres</h4>
            <label for="typeFiltre-select">
              Choisissez un type d'evenement :{" "}
            </label>

            <select name="typeFiltre-select" onChange={filtreType}>
              {gps &&
                gps.loaded &&
                dataTags.map((data) => <option value={data}>{data}</option>)}
              <option value="null">-- Tous --</option>
            </select>

            <div className="btn-AutourDeMoi">
              <Button variant="outline-info" onClick={() => getPossition()}>
                Événements autour de moi
              </Button>{" "}
            </div>
          </>
        )) || (
          <>
            <h2>Recherches</h2>
            <CityList
              data={city}
              onchange={(e) => {
                onchangeListCity(e);
              }}
            />
            <button onClick={() => validFilter()}>Recherchez</button>
          </>
        )}
      </div>

      <Container>
        {(filtredEventsActive && (
          <>
            {eventsFiltred.map((event) => (
              <Row className="events-list-container w-100">
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
                  {(event.fields.image && (
                    <Col>
                      <img
                        src={event.fields.image}
                        alt="photo de l'event"
                        width="250"
                        height="200"
                      />
                    </Col>
                  )) || (
                    <Col>
                      <img
                        src={require("../defaultposter.png")}
                        alt=""
                        width="250"
                        height="200"
                      />
                    </Col>
                  )}
                  <p>{event.fields.free_text}</p>
                </div>
              </Row>
            ))}
          </>
        )) || (
          <>
            {events &&
              events.map((event) => (
                <Row className="events-list-container w-100">
                  <Col>
                    <h3 className="desc">{event.fields.description}</h3>
                  </Col>
                  <div className="events-list">
                    <div className="event-info">
                      <Col>
                        <span className="gras">Dates :</span>{" "}
                        {event.fields.date_start} ~ {event.fields.date_end}
                      </Col>
                      <Col>
                        <span className="gras">Localité :</span>{" "}
                        {event.fields.city}
                      </Col>
                    </div>
                    {(event.fields.image && (
                      <Col className="eventImg">
                        <img
                          src={event.fields.image}
                          alt=""
                          width="250"
                          height="200"
                        />
                      </Col>
                    )) || (
                      <Col className="eventImg">
                        <img
                          src={require("../defaultposter.png")}
                          alt=""
                          width="250"
                          height="200"
                        />
                      </Col>
                    )}
                    <p>{event.fields.free_text}</p>
                  </div>
                  <hr></hr>
                </Row>
              ))}
          </>
        )}
      </Container>
    </div>
  );
}

export default HomePage;
