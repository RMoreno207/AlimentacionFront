import React, { useEffect, useState, useContext } from "react";
import { checkUserContext } from "../../../../context/checkUserContext";
import MiniCard from "../../../common/Discounts/MiniCard/MiniCard";
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import Card from "../../List/Card/Card";
import axios from "axios";


//Tendra que recibir algun parametro para indicarle la id del comercio a buscar
const Recommendations = (props) => {
  const objeto = props.preferences;
  const { stores, setStores, getStores } = useContext(checkUserContext);//Hook con el listado de las stores
  const { getFavorites } = useContext(checkUserContext);//Funcion para obtener el listado de stores
  const [items, setItems] = useState(stores);
  //Estado para guardar los objetos recomendados
  const [recommendations, setRecommendations] = useState([]);
  console.log(props);


  useEffect(() => {
    if (props.negocio === "restaurants") {
      console.log("es restaurante en");
      getRecommendations("restaurante");//Obtener lista de index recomendados de la API de Data segun el index del negocio actual

    } else if (props.negocio === "false") {
      console.log("es tieneda en");
      getRecommendations("tienda");//Obtener lista de index recomendados de la API de Data segun el index del negocio actual
    }

    if (props.type === "profile") {
      console.log("Es profile");
      console.log(objeto);
      getRecomendationsPersonal(objeto); //Obtener Listado de index recomendados de la API de Data dependiendo de las preferencias del usuario

    } else {
      console.log("es negocio");
    }


  }, []);


  //Obtener lista de objetos recomendados de la API de Data segun el index del negocio actual
  const getDetailsByIndex = async (recomendated) => {
    const nuevaLista = recomendated.map(getBusiness);

    Promise.all(nuevaLista).then(data => {
      setRecommendations([...data])
    });
  }
  //Fetch de cada uno de los index recomendados
  const getBusiness = async (item) => {
    try {
      const res = await axios.get(`https://alimentacionback-production.up.railway.app/api/restaurant/?index=${item}`);
      const refactorData = {
        place_name: res.data[0].place_name,
        thumbnail: res.data[0].thumbnail,
        place_id: res.data[0].place_id,
        index: res.data[0].index
      }
      return res.data[0];
    } catch (error) {
      console.log(error);
    }
  }

  //Obtener lista de index recomendados de la API de Data segun el index del negocio actual
  const getRecommendations = async (tipo) => {
    try {
      console.log("Endopint negocios ", tipo);
      const res = await axios.get(`https://desafio-env.eba-nzuhu9uy.us-east-2.elasticbeanstalk.com/RecomendacionDependiente?ID=${props.index}&Filtro=${tipo}`);
      getDetailsByIndex(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  //Obtener las recomendaciones personales
  const getRecomendationsPersonal = async (objeto) => {
    try {
      const res = await axios.post('https://desafio-env.eba-nzuhu9uy.us-east-2.elasticbeanstalk.com/RecomendacionPorPreferencias?Filtro=todos', objeto);
      console.log(res);
      getDetailsByIndex(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  // ----------------------------------------------------


  return (<>
    {/* <section>
      <h1>Favorites:</h1>
      {favorites ? favorites.episode.slice(0, 5)
        .map((item, i) => <MiniCard key={uuidv4()} index={i} value={item} />)
        : "Loading..."}
    </section> */}


    <section className="profileSection">
      <h1>Recomendaciones:</h1>

      <Swiper freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className='recommendationCarousel'
        slidesPerView={2}
        spaceBetween={30}>
        {recommendations ? recommendations.map((item, i) => {
          return <SwiperSlide key={uuidv4()} index={i}><MiniCard value={item} /></SwiperSlide>
        })
          : <div>
            <SwiperSlide ><div className="spinner"></div></SwiperSlide>
          </div>}

      </Swiper>
    </section>

  </>)
};

export default Recommendations;
