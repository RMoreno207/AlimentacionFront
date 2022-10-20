import React from "react";

const MiniCard = (props) => {
  const info = props.value;

  return (
    
    <div className="miniCardContainer">
      <div className="miniText">
        {console.log("main push")}
        <h4>{info.place_name}</h4>
      </div>
      <img style={{ width: "100px" }} src={info.thumbnail} />
    </div>
  )
};

export default MiniCard;
