import React from "react";

const MiniCard = (props) => {
  const info = props.value;

  return (
    <div className="miniCardContainer">
      <div className="cardText">
        <h4 >{info}</h4>
      </div>
      <img style={{ width: "100px" }} src="https://media.istockphoto.com/photos/percents-picture-id172444168?k=20&m=172444168&s=612x612&w=0&h=7p_ZEb5MjSto0dPi0Y6uJvu4sCjrESGgaDe85hxVOLE=" alt="" />
    </div>
  )
};

export default MiniCard;
