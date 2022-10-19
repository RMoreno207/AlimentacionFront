import { checkUserContext } from '../../../../context/checkUserContext';
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Recommendations from '../Recommendations/Recommendations';
import Favorites from "../favorites/favorites"
import Discounts from "../../../common/Discounts/Discounts";
import Card from '../../List/Card/Card';
import Settings from '../../../../assets/img/settings.png'

const Profile = () => {
  const navigate = useNavigate();
  const { userCheck } = useContext(checkUserContext);//Hook para obtener el email del usuario logado
  const { userData } = useContext(checkUserContext)//Hook para guardar los datos del perfil de usuario
  const { userDetails, checkUser } = useContext(checkUserContext);

  console.log(userCheck);


  useEffect(() => {
    if (userData == null) {
      checkUser()
      userDetails()
    }
    // console.log(userCheck);
    if (userCheck === null) {
      navigate("/home");
    }
  }, []);


  return <div className='showcase'>
    <div className='profileTop'>
      <div className='profileImg'>
        <img style={{ width: "100px" }} src='https://cdn-icons-png.flaticon.com/512/17/17004.png'></img>
        <Link to="/user/profile/edit"><img src={Settings} alt="" /></Link>
      </div>
      <h1>{userData ? userData.email : "Usuario"}</h1>
    </div>


    <Recommendations />

    <Discounts />

    <Favorites />
    <article class="menuHamb">
        <ul>
          <li><a href="#">Bienvenida</a></li>
          <li><a href="./pages/biografia.html">Sobre mí</a></li>
          <li><a href="./pages/portfolio.html">Portfolio</a></li>
          <li><a href="./pages/contacto.html">Contacto</a></li>
         
        </ul>
      </article>

  </div >;
};

export default Profile;
