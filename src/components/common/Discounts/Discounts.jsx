import React, { useEffect, useState, useContext } from "react";
import { checkUserContext } from '../../../context/checkUserContext'
import MiniCard from "../Discounts/MiniCard/MiniCard";
import { v4 as uuidv4 } from 'uuid';
import {Swiper,SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";

//Tendra que recibir algun parametro para indicarle la id del comercio a buscar
const Discounts = (props) => {
  const info = props.value;
  const { discounts, setDiscounts } = useContext(checkUserContext);//Hook con el listado de las stores
  const { getDiscounts } = useContext(checkUserContext);//Funcion para obtener el listado de stores


  useEffect(() => {
    getDiscounts(info);
  }, []);


  return (<>
    {/* <section>
      <h1>Descuentos:</h1>
      {discounts ? discounts.episode.slice(0, 2)
        .map((item, i) => <MiniCard key={uuidv4()} index={i} value={item} />)
        : "Loading..."}
    </section> */}
     <section className="profileSection discounts">
      <h1>Descuentos:</h1>
      {/* {recommendations ? recommendations.episode.slice(0, 5)
        .map((item, i) => <MiniCard key={uuidv4()} index={i} value={item} />)
        : "Loading..."} */}
        <Swiper freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className='discountCarousel'
                slidesPerView={2}
                spaceBetween={30}>
                {discounts?discounts.episode.slice(0,10).map((item,i)=>{
                  return <SwiperSlide key={uuidv4()} index={i}><MiniCard value={item}/></SwiperSlide>
                })
                :<div>
                  <SwiperSlide ><div className="spinner"></div></SwiperSlide>
                <SwiperSlide ><div className="spinner"></div></SwiperSlide>
                <SwiperSlide ><div className="spinner"></div></SwiperSlide>
                <SwiperSlide ><div className="spinner"></div></SwiperSlide>
                <SwiperSlide ><div className="spinner"></div></SwiperSlide>
                <SwiperSlide ><div className="spinner"></div></SwiperSlide></div>}
                
        </Swiper>
    </section>
  </>)
};

export default Discounts;
