import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container , Dropdown} from "react-bootstrap";
import GetGeoLocation from "../components/GetGeoLocation";
import CityList from "../components/CityList";
///////////////////////////////////////////////////
import DistanceList from "../components/DistanceList";
///////////////////////////////////////////////////

function HomePage() {
  const [events, setEvents] = useState(false);
  const [eventsFiltred, setEventsFiltred] = useState(false);
  const [filtredEventsActive, setFiltredEventsActive] = useState(false);
  const [dist, setDist] = useState(1000);
  const [curentDate, setCurentDate] = useState(1000);

  

  const [autoriseGps, SetAutoriseGps] = useState(false);
  const gps = GetGeoLocation();
  const [city, setCity] = useState("here");
  const [dataTags, setDataTags] = useState(false);
  
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
    var today = new Date();
    var date = "";
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
    setCurentDate(date);
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
      const response = await axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=date_start>=+"+curentDate+"&sort=-date_start&rows=-1&facet=&geofilter.distance="+gps.coordinates.lat+"%2C+"+gps.coordinates.lng+"%2C"+dist);
   //   console.log(response.data);
   
      console.log(response.data.records);
      setEvents(response.data.records)
      setEventsFiltred(response.data.records);
      var tempo = "";
      response.data.records.forEach((element) => {
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
      array.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      console.log(counts)

      setDataTags(array);

    } catch (error) {
      console.log(error.response);
    }
  }

  const getEventByCity = async () => {
    try {
      const response = await axios.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=date_start>=+"+curentDate+"&sort=-date_start&rows=-1&facet=&geofilter.distance="+gps.coordinates.lat+"%2C+"+gps.coordinates.lng+"%2C"+dist);
   //   console.log(response.data);
   
      console.log(response.data.records);
      setEvents(response.data.records);
      setEventsFiltred(response.data.records);
      var tempo = "";
      response.data.records.forEach((element) => {
        tempo = tempo + element.fields.tags;
        tempo = tempo + ",";
      });
      tempo = tempo.replaceAll(',,', ',');
      tempo = tempo.replaceAll(',undefined', '');
      tempo = tempo.replaceAll('undefined', '');
      tempo = tempo.replaceAll(' ', '');
      let array = tempo.split(',');
      array.sort();
      array.shift();
      //Todo erase double
      setDataTags(array);

    } catch (error) {
      console.log(error.response);
    }
  }

  const getPossition = () => {
    if (city == "here") {
      if (gps.loaded == false) {
        alert("veuillez d'abors accepter ou refuser le partage de vos coordoner")
      }else{
        if (gps.error) {
          console.log(gps.error.message)
          alert("Vos avez refusser le partage de coordonee, vous pouvez malgre tout chercher les evenment par villes, si c'est une errur recharger la page")
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
        setFiltredEventsActive(true);
    }else{
      setEventsFiltred(events);
    }
  }



  const letsFiltre = (data) => {

  }
  /// metre la recherche autour de moi dans la listes des villes
  //save
  //<button onClick={()=> getPossition()}>les evenements autour de moi</button>
  //
  return (
  <div>
    <div className="back-red">
    </div>

    <div>
      <CityList data={city} onchange={(e) => { onchangeListCity(e) }}/>
      <DistanceList data={dist} onchange={(e) => { onchangeDistlist(e) }}/>
      <button onClick={()=> getPossition()}>Recherchez</button>
    </div>

    <div>
      {dataTags &&
      <>
        <label for="typeFiltre-select">Choisisez un type d'evenement : </label>
        <select name="typeFiltre-select" onChange={filtreType}>
        <option value="null">-- Tous --</option>
          {dataTags.map((data) =>
            <option value={data}>{data.toLowerCase().charAt(0).toUpperCase() + data.slice(1)}</option>
          )}
        </select>
      </>
      }
    </div>

    <Container>
        {eventsFiltred && eventsFiltred.map((event) =>
          <Row>
            <Col className="back-green">Adress :{event.fields.city}</Col>
            {event.fields.image &&
            <Col className="back-green"><img src={event.fields.image} alt="" width="250" height="200" /></Col>
            ||
            <Col className="back-green"><img src={require('../defaultposter.png')} alt="" width="250" height="200" /></Col>
            }
          </Row>
        )}
    </Container>


  </div>       
  );
}

export default HomePage;