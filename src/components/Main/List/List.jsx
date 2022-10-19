import { checkUserContext } from '../../../context/checkUserContext'
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// import List from "../List/List"
import Card from '../List/Card/Card';
import axios from "axios";
import BackLogo from '../../../assets/img/Back @2x.png';
import BurgerBtn from '../../../assets/img/menu@2x.png';
import { slide as Menu } from 'react-burger-menu'
import { Fragment } from 'react';//ScrollButton
import ScrollButton from "../../common/ScrollButton";//ScrollButton
import { Content, Heading } from "../../common/Styles";//ScrollButton



const List = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userCheck } = useContext(checkUserContext);//Hook para obtener el email del usuario logado
  const { userData } = useContext(checkUserContext);//Hook para guardar los datos del perfil de usuario
  const { userDetails } = useContext(checkUserContext);//Funcion para obtener los detalles del usuario
  const { stores, setStores } = useContext(checkUserContext);//Hook con el listado de las stores
  const { restaurants, setRestaurants } = useContext(checkUserContext);//Hook con el listado de las stores
  const [items, setItems] = useState();
  const { getStores, getRestaurants } = useContext(checkUserContext);//Funcion para obtener el listado de stores
  const [sortBy, setSortBy] = useState("bestValue"); //Para indicar como ordenar el listado


  console.log("userCheck", userCheck);
  console.log(sortBy);
  console.log(stores);


  useEffect(() => {
    const restaurant = params.re;
    if (restaurant === "restaurants") {
      console.log("es restaurante", params.re);
      getRestaurants()
      setItems(restaurants)

    } else {
      console.log("no es restaurante", params.re);
      getStores();
      setItems(stores)

    }

    console.log(userCheck);
    if (userCheck === null) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    setSortBy(e.target.value)
    console.log("sorBy", e.target.value);
    handleSort(e.target.value);
  }

  //Ordenar por nombre
  const handleSort = (sort) => {
    console.log("HANDLESORT", sortBy);
    if (sort === "byName") {
      console.log("Ordenado by name");
      //Para ordenar de la A a la Z
      const data = [...items].sort((a, b) => {
        return a.place_name > b.place_name ? 1 : -1
      })
      setItems(data);
    }
    else if (sort === "rating") {//Hay que modificarlo
      console.log("Ordenado bestValue");
      //Para ordenar de la A a la Z
      const data = [...items].sort((a, b) => {
        return a.rating > b.rating ? 1 : -1
      })
      setItems(data);
    }
    else if (sort === "coments") {//Hay que modificarlo
      console.log("Ordenado de la A a la Z");
      //Para ordenar de la A a la Z
      const data = [...items].sort((a, b) => {
        return a.reviews > b.reviews ? 1 : -1
      })
      setItems(data);
    }
  }

  return (
      <div className='showcase'>
         <div className="listContainer" >
      <div className="backButton">
        <Link to="/home"><img src={BackLogo} alt="" /></Link>
      </div>
      <div className="storesTitleContainer">
        {params.re === "restaurants" ?
          <h2 className="storesTitle">Restaurantes cerca de ti</h2>
          : <h2 className="storesTitle">Comercios cerca de ti</h2>

        }
      </div>
      <div className="sortBurger">
        {/* <button><img className="burgerBtn" src={BurgerBtn} alt="" /></button> */}
        <select className="sortList" onChange={handleChange}>
          <option value="rating">Mejor valorados</option>
          <option value="coments">Más comentados</option>
          <option value="byName">Por nombre</option>
        </select>
      </div>
      <ul className="directoryList">
        {items ? items
          .map((item, i) => <li key={uuidv4()} index={i}><Card isRestaurant={params.re} value={item} /></li>)
          : <h2>Loading...</h2>}
      </ul>
      <ScrollButton />
    </div >
    <article class="menuHamb">
        <ul>
          <li><a href="#">Bienvenida</a></li>
          <li><a href="./pages/biografia.html">Sobre mí</a></li>
          <li><a href="./pages/portfolio.html">Portfolio</a></li>
          <li><a href="./pages/contacto.html">Contacto</a></li>
         
        </ul>
      </article>
      </div>
  )
};


export default List;

