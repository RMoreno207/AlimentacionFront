import React, { useEffect, useState, useContext } from "react";
import { checkUserContext } from '../../../context/checkUserContext'
import MiniCard from "../Discounts/MiniCard/MiniCard";
import { v4 as uuidv4 } from 'uuid';
import {Swiper,SwiperSlide} from 'swiper/react';
import {FreeMode} from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import discount1 from '../../../assets/img/descuento1.png';
import discount2 from '../../../assets/img/descuento2.png';
import discount3 from '../../../assets/img/descuento3.png';
import discount4 from '../../../assets/img/descuento4.png';

//Tendra que recibir algun parametro para indicarle la id del comercio a buscar
const Discounts = (props) => {
  const info = props.value;
  const { discounts, setDiscounts } = useContext(checkUserContext);//Hook con el listado de las stores
  const { getDiscounts } = useContext(checkUserContext);//Funcion para obtener el listado de stores


  return (<>

     <section className="profileSection discounts">
      <h1>Descuentos:</h1>
     
      {props.value==="stores"?<div className="discountImgs">
        <div className="discountMini">
        <p className="discountText">15% de descuento en mermeladas</p>
        <img src={discount3} alt="" />
        </div>
        <div className="discountMini">
        <p className="discountText">10% de descuento en batidos</p>
        <img src={discount4} alt="" />
        </div>
     </div>:<div className="discountImgs">
        <div className="discountMini">
        <p className="discountText">2x1 en nuestras pizzas</p>
        <img src={discount1} alt="" />
        </div>
        <div className="discountMini">
        <p className="discountText">20% en nuestros brunch</p>
        <img src={discount2} alt="" />
        </div>
      </div>}
      
        
                
       
    </section>
  </>)
};

export default Discounts;
