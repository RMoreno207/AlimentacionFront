import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { checkUserContext } from '../../../context/checkUserContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Logo from "../../common/Logo"
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import Card from '../List/Card/Card';
import Lupa from '../../../assets/img/lupa.png'
import plusSign from '../../../assets/img/plusSign.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
// import Scanner from './Scanner/Scanner';


const Home = () => {
  const { userCheck, setUserCheck } = useContext(checkUserContext);
  const { checkUser } = useContext(checkUserContext);
  const { getStores } = useContext(checkUserContext);
  const { getRestaurants } = useContext(checkUserContext);
  const navigate = useNavigate();
  const { stores, setStores } = useContext(checkUserContext);
  const { restaurants, setRestaurants } = useContext(checkUserContext);
  const [items, setItems] = useState({ ...stores, ...restaurants });
  const { showNav, setShowNav } = useContext(checkUserContext);
  const searchInput = useRef();

  useEffect(() => {
    setShowNav(true);
    checkUser()
    getStores()
    getRestaurants();



    // if (userCheck === null) {
    //   navigate("/");
    // }
  }, []);

  //Buscar por nombre
  const handleSearch = (e) => {
    e.preventDefault();
    const parameter = searchInput.current.value;
    const newItem = stores.filter((item, i) => parameter.toUpperCase() == item.place_name.toUpperCase())//"convertimos" en mayusculas ambos parametros a comparar
    if (newItem.length > 0) {
      setItems(newItem);
      alert(newItem)
    } else {
      const newItem2 = restaurants.filter((item, i) => parameter.replace(/[\u0300-\u036f]/g, "").toUpperCase() == item.place_name.replace(/[\u0300-\u036f]/g, "").toUpperCase())//"convertimos" en mayusculas ambos parametros a comparar
      if (newItem2.length > 0) {
        setItems(newItem2);
        alert(newItem2)
      } else { alert("no se han encontrado resultados") }
    }
  }
  console.log(items);


  return (
    <div className='showcase'>
      {/* Dar funcion a este input */}
      <div className='searchContainer'>
        <button type='submit' onClick={handleSearch} ><img src={Lupa} alt="" /></button>
        <input name='search' ref={searchInput} type="text" placeholder='Búsqueda...' />
      </div>
      <Link to="/list/restaurants"><h2 className='carouselTitle'>Restaurantes</h2></Link>
      <div className='carouselHome'>
        <Swiper freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='homeDirectory'
          slidesPerView={2}
          spaceBetween={30}>
          {restaurants ? restaurants.map((item, i) => {
            return <SwiperSlide className='swiperCard' key={i}><Card isRestaurant={"restaurants"} value={item} /></SwiperSlide>
          })
            : null}
          <SwiperSlide className='plusCard'><Link to="/list/restaurants"><img className='plusImg' src={plusSign} alt="" /><h3>Ver más</h3></Link></SwiperSlide>
        </Swiper>
      </div>
      <Link to="/list/stores"><h2 className='carouselTitle'>Tiendas</h2></Link>
      <div className='carouselHome'>
        <Swiper freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='homeDirectory'
          slidesPerView={2}
          spaceBetween={30}>
          {stores ? stores.map((item, i) => {
            return <SwiperSlide className='swiperCard' key={i}><Card isRestaurant={false} value={item} /></SwiperSlide>
          })
            : null}
          <SwiperSlide className='plusCard'><Link to="/list/stores"><img className='plusImg' src={plusSign} alt="" /><h3>Ver más</h3></Link></SwiperSlide>
        </Swiper>
      </div>
      <h2 className='carouselTitle'>Saber+</h2>
      <div>
        <Swiper freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='homeDirectory'
          slidesPerView={2}
          spaceBetween={30}>
          {/* creat estado con un array de saber+ */}
          {stores ? stores.map((item, i) => {
            return <SwiperSlide className='swiperCard' key={i}><Card value={item} /></SwiperSlide>
          })
            : null}
          {/* <SwiperSlide className='plusCard'><Link to="/stores"><img className='plusImg' src={plusSign} alt="" /><h3>Ver más</h3></Link></SwiperSlide> */}
        </Swiper>
      </div>
      {/* <div className='storesDirectory'>
          <Link className='imgContainer' to={'/stores/'}><img className='storeImg' src="https://revista.storyous.es/wp-content/uploads/sites/2/2018/05/mamacampo3.jpg" alt="" /><h3 className='directoryTitle'>Tiendas</h3></Link>
        </div> */}

      {/* <div className='novedades'>
        <h1>NOVEDADES</h1>
      </div>
      <div className='profile'>
        <Link to={'/user/profile'}><h1>Perfil</h1></Link>
      </div>
      <div className='scanner'>

        <h3>Scanner</h3>
       

      </div> */}
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
}

export default Home