import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container , Dropdown} from "react-bootstrap";
import GetGeoLocation from "../components/GetGeoLocation";
import CityList from "../components/CityList";

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
      const response = await axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&geofilter.distance="+gps.coordinates.lat+"%2C+"+gps.coordinates.lng+"%2C100000");
   //   console.log(response.data);
      console.log(response.data.records);
      setEvents(response.data.records)
      var tempo = "";
      response.data.records.forEach((element) => {
        tempo = tempo + element.fields.tags;
        tempo = tempo + ",";
      });
      tempo = tempo.replaceAll(',,', ',');
      tempo = tempo.replaceAll(',undefined', '');
      let array = tempo.split(',');
      //Todo erase double
      setDataTags(array);

    } catch (error) {
      console.log(error.response);
    }
  }

  const getPossition = () => {
    console.log(gps)
    if (gps.loaded == false) {
      alert("veuillez d'abors accepter ou refuser le partage de vos coordoner")
    }else{
      if (gps.error) {
        console.log(gps.error.message)
        alert("Vos avez refusser le partage de coordonee, vous pouvez malgre tout chercher les evenment par les filtres, si c'est une errur recharger la page")
      }
      else{
        console.log(gps.coordinates.lat)
        console.log(gps.coordinates.lng)
        getEventByCoord()
      }
    }
  }
  const validFilter = () => {
    console.log(city);
  }

  const onchangeListCity = (data) => {
    setCity(data)
    console.log(data);
  }

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
        setFiltredEventsActive(true);
    }else{
      setEventsFiltred(events);
    }
  }



  const letsFiltre = (data) => {

  }
  return (
  <div>
    <div className="back-red">
      <button onClick={()=> getPossition()}>les evenements autour de moi</button>
    </div>

    <div>
      {gps.loaded &&
      <>
      <h2>Filtres</h2>
      <label for="typeFiltre-select">Choisisez un type d'evenement:</label>
      <select name="typeFiltre-select" onChange={filtreType}>
        {gps && gps.loaded && dataTags.map((data) =>
          <option value={data}>{data}</option>
        )}
        <option value="null">-- Tous --</option>
      </select>
      </>
      ||
      <>
        <h2>Recherches</h2>
        <CityList data={city} onchange={(e) => { onchangeListCity(e) }}/>
        <button onClick={()=> validFilter()}>Recherchez</button>
      </>
      }
    </div>

    <Container>
      {filtredEventsActive &&
      <>
        {eventsFiltred.map((event) =>
          <Row>
            <Col className="back-green">Adress :{event.fields.city}</Col>
            {event.fields.image &&
            <Col className="back-green"><img src={event.fields.image} alt="" width="250" height="200" /></Col>
            ||
            <Col className="back-green"><img src={require('../defaultposter.png')} alt="" width="250" height="200" /></Col>
            }
          </Row>
        )}
      </>
      ||
      <>
        {events && events.map((event) =>
          <Row>
            <Col className="back-green">Adress :{event.fields.city}</Col>
            {event.fields.image &&
            <Col className="back-green"><img src={event.fields.image} alt="" width="250" height="200" /></Col>
            ||
            <Col className="back-green"><img src={require('../defaultposter.png')} alt="" width="250" height="200" /></Col>
            }
          </Row>
        )}
      </>
      }

  </Container>


  </div>       
  );
}

export default HomePage;