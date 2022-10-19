import React from 'react'
import { Link } from 'react-router-dom';


function Card(props) {
  const info = props.value;

  return (
    <Link to={`/stores/details/${info.place_id}/${props.isRestaurant}`} className="detailLink">
      <div className="cardContainer">
        <div className="cardText">
          <h4 >{info.place_name}</h4>
        </div>
        <img src={info.thumbnail} alt="" />
      </div>
    </Link>
  )
};


export default Card
