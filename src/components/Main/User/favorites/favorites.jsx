import React, { useEffect, useState, useContext } from "react";
import { checkUserContext } from "../../../../context/checkUserContext";
import MiniCard from "../../../common/Discounts/MiniCard/MiniCard";
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import { Link } from "react-router-dom";

//Tendra que recibir algun parametro para indicarle la id del comercio a buscar
const Favorites = (props) => {
  console.log(props);
  const info = props.value;
  const { stores, setStores, getStores } = useContext(checkUserContext);//Hook con el listado de las stores
  const { getFavorites } = useContext(checkUserContext);//Funcion para obtener el listado de stores
  const [items, setItems] = useState(stores);


  useEffect(() => {
    getStores(6)
    if (stores != null) {
      sortStores()
    }
  }, []);

  useEffect(() => {
    if (stores != null) {
      sortStores()
    }
  }, [stores]);

  const sortStores = () => {
    console.log("HANDLESORT");

    console.log("Ordenado by name");
    //Para ordenar de la A a la Z
    const data = [...stores].sort((a, b) => {
      return a.place_id > b.place_id ? 1 : -1
    })
    setItems(data);
    console.log(data);
  }

  return (<>
    {/* <section>
      <h1>Favorites:</h1>
      {favorites ? favorites.episode.slice(0, 5)
        .map((item, i) => <MiniCard key={uuidv4()} index={i} value={item} />)
        : "Loading..."}
    </section> */}


    <section className="profileSection">
      <h1>Favoritos:</h1>

      <Swiper freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className='recommendationCarousel'
        slidesPerView={2}
        spaceBetween={30}>
        {items ? items.map((item, i) => {
          return <SwiperSlide key={uuidv4()} index={i}><MiniCard value={item} /></SwiperSlide>
        })
          : <div>
            <SwiperSlide ><div className="spinner"></div></SwiperSlide>
          </div>}

      </Swiper>
    </section>

  </>)
};

export default Favorites;