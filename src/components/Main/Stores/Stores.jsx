import { checkUserContext } from '../../../context/checkUserContext'
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// import List from "../List/List"
import Card from '../List/Card/Card';
import axios from "axios";
import BackLogo from '../../../assets/img/Back @2x.png';
import BurgerBtn from '../../../assets/img/menu@2x.png';
import { slide as Menu } from 'react-burger-menu'


const Stores = () => {
  const navigate = useNavigate();
  const { userCheck } = useContext(checkUserContext);//Hook para obtener el email del usuario logado
  const { userData } = useContext(checkUserContext);//Hook para guardar los datos del perfil de usuario
  const { userDetails } = useContext(checkUserContext);//Funcion para obtener los detalles del usuario
  const { stores, setStores } = useContext(checkUserContext);//Hook con el listado de las stores
  const { getStores } = useContext(checkUserContext);//Funcion para obtener el listado de stores
  const [sortBy, setSortBy] = useState("bestValue"); //Para indicar como ordenar el listado


  console.log("userCheck", userCheck);
  console.log(sortBy);
  console.log(stores);


  useEffect(() => {
    getStores();

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
      console.log("Ordenado de la A a la Z");
      //Para ordenar de la A a la Z
      const data = [...stores].sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
      })
      setStores(data);
    }
    else if (sort === "bestValue") {//Hay que modificarlo
      console.log("Ordenado de la A a la Z");
      //Para ordenar de la A a la Z
      const data = [...stores].sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
      })
      setStores(data);
    }
    else if (sort === "byProximity") {//Hay que modificarlo
      console.log("Ordenado de la A a la Z");
      //Para ordenar de la A a la Z
      const data = [...stores].sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
      })
      setStores(data);
    }
    else if (sort === "byScore") {//Hay que modificarlo
      console.log("Ordenado de la A a la Z");
      //Para ordenar de la A a la Z
      const data = [...stores].sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
      })
      setStores(data);
    }
  }

  return (
    <div className="listContainer" >
      <div className="backButton">
        <Link to="/home"><img src={BackLogo} alt="" /></Link>
      </div>
      <div className="storesTitleContainer">
        <h2 className="storesTitle">Comercios cerca de ti</h2>
      </div>
      <div className="sortBurger">
        {/* <button><img className="burgerBtn" src={BurgerBtn} alt="" /></button> */}
        <select className="sortList" onChange={handleChange}>
          <option value="rating">Mejor valoradas</option>
          <option value="closest">Más cercanas</option>
          <option value="byName">Por nombre</option>
        </select>
      </div>
      <ul className="directoryList">
        {stores ? stores
          .map((item, i) => <li key={uuidv4()} index={i}><Card value={item} /></li>)
          : <h2>Loading...</h2>}
      </ul>
    </div >
  )
};


export default Stores;
