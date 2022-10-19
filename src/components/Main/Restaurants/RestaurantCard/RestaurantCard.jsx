import React from "react";
import { Link } from "react-router-dom";


const RestaurantCard = (props) => {
  const info = props.data;


  console.log(info);
  return (
    <Link to={`/restaurants/details/${info.id}`} className="detailLink">
      <div className="cardContainer">
        <div className="cardText">
          <h4 >{info.name}<p>$$</p></h4>
          <h4 className="cardCity">{info.species}</h4>
        </div>
        <img src={info.image} alt="" />
      </div>
    </Link>
  )
};


export default RestaurantCard;
