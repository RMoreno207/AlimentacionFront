import React, { useEffect, useState, useContext } from "react";
import { checkUserContext } from "../../../../context/checkUserContext";
import MiniCard from "../../../common/Discounts/MiniCard/MiniCard";
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import Card from "../../List/Card/Card";
import axios from "axios";


//Tendra que recibir algun parametro para indicarle la id del comercio a buscar
const Recommendations = (props) => {
  console.log(props);
  const info = props.value;
  const { stores, setStores, getStores } = useContext(checkUserContext);//Hook con el listado de las stores
  const { getFavorites } = useContext(checkUserContext);//Funcion para obtener el listado de stores
  const [items, setItems] = useState(stores);


  useEffect(() => {
    getStores()
    if (stores != null) {
      sortStores()
    }
  }, []);

  useEffect(() => {
    if (stores != null) {
      sortStores()
    }
  }, [stores]);

  console.log(stores);

  const sortStores = () => {
    console.log("HANDLESORT");

    console.log("Ordenado by name");
    //Para ordenar de la A a la Z
    const data = [...stores].sort((a, b) => {
      return a.phone > b.phone ? 1 : -1
    })
    setItems(data);
    console.log(data);
  }

  return (<>
    {/* <section>
      <h1>Favorites:</h1>
      {favorites ? favorites.episode.slice(0, 5)
        .map((item, i) => <MiniCard key={uuidv4()} index={i} value={item} />)
        : "Loading..."}
    </section> */}


    <section className="profileSection">
      <h1>Recomendaciones:</h1>

      <Swiper freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className='recommendationCarousel'
        slidesPerView={2}
        spaceBetween={30}>
        {items ? items.map((item, i) => {
          return <SwiperSlide key={uuidv4()} index={i}><MiniCard value={item} /></SwiperSlide>
        })
          : <div>
            <SwiperSlide ><div className="spinner"></div></SwiperSlide>
          </div>}

      </Swiper>
    </section>

  </>)
};

export default Recommendations;


// const info = props.value;
// console.log("recomendations props ", props);
// const { getDetails } = useContext(checkUserContext);//Hook con el listado de las stores
// // const { getRecommendations } = useContext(checkUserContext);//Funcion para obtener el listado de stores
// const [recommendations, setRecommendations] = useState([]);
// const [businessRecomendated, setBusinessRecomendated] = useState([177, 40, 47, 229, 339, 357, 23, 367, 503, 46]);
// const [recom, setRecom] = useState([]);

// useEffect(() => {
//   // getRecommendations();
//   getRecomendationsPersonal();
//   getDetailsByIndex(businessRecomendated)

// }, []);

// //Obtener los descuentos
// // https://protected-ravine-80490.herokuapp.com/RecomendacionDependiente?ID=0


// const getRecommendations = async () => {
//   try {
//     console.log("REEECOMENDATIOS");

//     const res = await axios.get(`https://protected-ravine-80490.herokuapp.com/RecomendacionDependiente?ID=${props.index}`);
//     console.log("Res de API ", res);
//     setBusinessRecomendated(res);
//   } catch (error) {
//     console.log(error);
//   }
// }

// //Obtener las recomendaciones personales
// const getRecomendationsPersonal = async () => {
//   try {
//     console.log("REEECOMENDATIOS PERSONAL");
//     const objeto = {
//       preferencias: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
//     }
//     const res = await axios.post(`https://protected-ravine-80490.herokuapp.com/RecomendacionPorPreferencias`, {
//       method: 'POST',
//       body: { "preferencias": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5] }
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }

// //Obtener negocios recomendados
// const getDetailsByIndex = async (recomendated) => {
//   recomendated.map((item, i) => {

//     getBusiness(item)

//   })

// }
// const getBusiness = async (item) => {
//   try {
//     const res = await axios.get(`https://alimentacionback-production.up.railway.app/api/restaurant/?index=${item}`);
//     const refactorData = {
//       place_name: res.data[0].place_name,
//       thumbnail: res.data[0].thumbnail,
//       place_id: res.data[0].place_id

//     }
//     setRecommendations([...recommendations, refactorData])
//   } catch (error) {
//     console.log(error);
//   }
// }
// console.log("RECOMENDATIONS USE ", recommendations);


// // const res = await fetch('https://alimentacionback-production.up.railway.app/api/login', {
// //       method: 'POST',
// //       body: JSON.stringify(form),
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       credentials: 'include'
// //     })




// // https://protected-ravine-80490.herokuapp.com/RecomendacionPorPreferencias

// return (<>
//   <section className="profileSection">
//     <h1>Recomendaciones:</h1>
//     {/* {recommendations ? recommendations
//       .map((item, i) => <MiniCard key={uuidv4()} index={i} value={item} />)
//       : "Loading..."} */}
//     <Swiper freeMode={true}

//       grabCursor={true}
//       modules={[FreeMode]}
//       className='recommendationCarousel'
//       slidesPerView={2}
//       spaceBetween={30}>
//       {recommendations ? recommendations.map((item, i) => {
//         return <SwiperSlide key={uuidv4()} index={i}><MiniCard value={item} /></SwiperSlide>
//       })
//         : <div>
//           <SwiperSlide ><div className="spinner"></div></SwiperSlide>
//           <SwiperSlide ><div className="spinner"></div></SwiperSlide>
//           <SwiperSlide ><div className="spinner"></div></SwiperSlide>
//           <SwiperSlide ><div className="spinner"></div></SwiperSlide>
//           <SwiperSlide ><div className="spinner"></div></SwiperSlide>
//           <SwiperSlide ><div className="spinner"></div></SwiperSlide></div>}

//     </Swiper>
//   </section>
// </>)
