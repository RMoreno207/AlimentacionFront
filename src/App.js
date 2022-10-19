import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";
import 'normalize.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { checkUserContext } from './context/checkUserContext';
import '../src/styles/styles.scss';
import jwtDecode from 'jwt-decode';
import Restaurants from "./components/Main/Restaurants/Restaurants";



function App() {
  const [userCheck, setUserCheck] = useState(null);
  const [userData, setUserData] = useState(null)//Hook para almacenar los datos del perfil de usuario
  const [stores, setStores] = useState(null);//Hook para almacenar el listado de tiendas
  const [details, setDetails] = useState(null);//Hook para almacenar los detalles de una store
  const [restaurantDetails, setRestaurantDetails] = useState(null);//Almacenar detalles de restaurants
  const [discounts, setDiscounts] = useState(null);//Hook con el listado de los descuentos
  const [recommendations, setRecommendations] = useState(null);//Hook con el listado de recomendaciones
  const [favorites, setFavorites] = useState(null);//Hook con el listado de Favoritos
  const [showNav, setShowNav] = useState(null);
  const [restaurants, setRestaurants] = useState(null)


  console.log("userCheck ", userCheck);

  useEffect(() => {

  }, [])

  //Checkear usuario
  const checkUser = async () => {
    try {

      const res = await axios.get('https://alimentacionback-production.up.railway.app/api/checkUser', { withCredentials: true });
      // const userToken = res.data.msg.substr(6, res.data.msg.length);
      const userToken = res.data.msg;

      const user = await jwtDecode(userToken);
      console.log("Token user ", user);
      setUserCheck(user.email);

      console.log(userCheck)

    }
    catch (error) {
      console.log(error.stack);
    }
  }

  //Obtener todos los datos de user
  const userDetails = async () => {
    try {
      console.log(userCheck);
      const datas = await axios.get(`https://alimentacionback-production.up.railway.app/api/getUser/?email=${userCheck}`);
      setUserData(...datas.data)
      console.log("user detail", datas.data);
    } catch (error) {
      console.log(error);
    }
  }

  //Obtener listado de todas las tiendas
  const getStores = async () => {
    try {
      const res = await axios.get('https://alimentacionback-production.up.railway.app/api/store');
      setStores(res.data.slice(0, 10));
    }
    catch (error) {
      console.log(error);
    }
  }

  const getRestaurants = async () => {
    try {
      const res = await axios.get('https://alimentacionback-production.up.railway.app/api/restaurant');
      setRestaurants(res.data.slice(0, 10));
    }
    catch (error) {
      console.log(error)
    }
  }


  //Obtener los detalles de una store
  const getDetails = async (id) => {
    try {
      const res = await axios.get(`https://alimentacionback-production.up.railway.app/api/restaurant/?id=${id}`);
      console.log(...res.data);
      setDetails(...res.data)
    } catch (error) {
      console.log(error);
    }
  }


  //Obtener los descuentos
  const getDiscounts = async (id) => {
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/1`);
      console.log(res);
      setDiscounts(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  //Obtener las recomendaciones
  const getRecommendations = async (id) => {
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/1`);
      console.log(res);
      setRecommendations(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  //Obtener los favoritos
  const getFavorites = async (id) => {
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/1`);
      console.log(res);
      setFavorites(res.data)
    } catch (error) {
      console.log(error);
    }
  }


  const data = {
    userDetails,
    checkUser,
    userCheck,
    setUserCheck,
    userData,
    setUserData,
    stores,
    setStores,
    getStores,
    getDetails,
    details,
    setDetails,
    restaurantDetails,
    setRestaurantDetails,

    discounts,
    setDiscounts,
    getDiscounts,
    getRecommendations,
    recommendations,
    setRecommendations,
    favorites,
    setFavorites,
    getFavorites,
    getRestaurants,
    restaurants,
    setRestaurants,
    showNav,
    setShowNav
  }


  return (
    <div className="App">
      <BrowserRouter>
        <checkUserContext.Provider value={data}>
          <Header />

          <Main />
        </checkUserContext.Provider>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
