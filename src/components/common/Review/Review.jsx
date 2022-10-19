import axios from "axios";
import React, { Component } from "react";
import { useState,useContext } from "react";
import { useEffect } from "react";
import { checkUserContext } from "../../../context/checkUserContext";
import {useForm} from 'react-hook-form';

const Review = (props)=>{
  const { register, formState: { errors }, handleSubmit } = useForm();
  const info = props.data;
  const {getRestaurantDetails} = useContext(checkUserContext);
  const {restaurantDetails} = useContext(checkUserContext);
  const [reviewsList,setReviewsList] = useState([])
  useEffect(()=>{
    const getReviews = async()=>{
      try{
        // const res = axios.get(`http://localhost:5000/api/restaurant/reviews/${info}`)
        getRestaurantDetails(info)
        // setReviewsList(res.data);
      }
      catch(error){
        console.log(error);
      }
    }
    getReviews();
  },[])

  const onSubmit = async (form) => {
    try {
      console.log(form); 
      const res = await axios.post(`http://localhost:5000/api/restaurant/${info}`, form);
     
    }
    catch (error) {
      console.log(error);
    }
  }


  return(
    <>
      <h2>Reseñas</h2>
      <div className="reviewsList">
          <h4>{info}</h4>
          <p>{restaurantDetails?restaurantDetails.status:""}</p>
          {/* {reviewsList.length>0?reviewsList.map((item,i)=>{
            return <div key={i}>
              <h4>{item.email}<p>{item.rating}</p></h4>
              <p>{item.text}</p>
            </div>
          }):<h3>No hay reseñas</h3>} */}
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Valoración</label>
          <select {
            ...register("rating",{
              required:true
            })
          }>
            <option value="bad">Muy mala</option>
            <option value="veryBad">Mala</option>
            <option value="improve">Mejorable</option>
            <option value="good">Buena</option>
            <option value="veryGood">Muy buena</option>
          </select>
          <input type="text"{
            ...register("review",{
              required:true,
              minLength:3
            })
          }/>{errors.review?.type === 'required' && <p>Debes rellenar el espacio de reseña para poder enviarla</p>}
          {/* <label htmlFor="">1</label>
          <input type="radio" value="1" />
          <label htmlFor="">2</label>
          <input type="radio" value="2"/>
          <label htmlFor="">3</label>
          <input type="radio" value="3"/>
          <label htmlFor="">4</label>
          <input type="radio" value="4"/>
          <label htmlFor="">5</label>
          <input type="radio" value="5" /> */}
         
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </>
  )
}

export default Review;
