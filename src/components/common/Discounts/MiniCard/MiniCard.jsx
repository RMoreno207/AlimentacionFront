import React, { useState, useRef } from 'react'
import { useEffect } from 'react';

import { Link } from 'react-router-dom';


const MiniCard = (props) => {
  const info = props.value;
  const [isRestaurant, setIsRrestaurant] = useState();

  useEffect(() => {
    if (props.value.resotie === "Tienda") {
      setIsRrestaurant(false)
      console.log("Es tienda", props.value.resotie);
    } else {
      setIsRrestaurant("restaurants")

    }

  }, []);

  return (
    <Link to={`/stores/details/${info.place_id}/${isRestaurant}/${props.value.index}`} className="detailLink">

      <div className="miniCardContainer">
        <div className="miniText">
          <h4>{info.place_name}</h4>
        </div>
        <img style={{ width: "100px" }} src={info.thumbnail} />
      </div>
    </Link>
  )
};

export default MiniCard;
