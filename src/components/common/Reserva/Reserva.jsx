import React,{useState} from "react";
import { useEffect,useContext } from "react";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css';
import { checkUserContext } from "../../../context/checkUserContext";
import axios from 'axios';
import reservaMenu from '../../../assets/img/reservaMenu.png';
import { useLocation } from 'react-router-dom';
import reservaTienda from '../../../assets/img/reservaTienda.jpg';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

const Reserva = (props) => {
  const info = props.value;
  const [date, setDate] = useState(null);
  const [showBtn,setShowBtn] = useState(false);
  const { userCheck } = useContext(checkUserContext);
  const [printDate,setPrintDate] = useState(null);
  let [people,setPeople] = useState(0);
  const location = useLocation();
  useEffect(()=>{
    if(date){
      setShowBtn(true);
      
    }
  })

  const sumPeople = ()=>{
    setPeople(people+=1)
  }
  const subtractPeople = ()=>{
    if(people>=1){
      setPeople(people-=1)
    }
  }

  const sendBooking = async()=>{
    try{
      //  const bookingBody = {
      //   date:date,
      //   people:people
      //  }
      //  const res = await axios.post(`http://localhost:5000/api/saveBooking/${userCheck.email}`,bookingBody);
      //  console.log(res.data);
       setPeople(0)
       const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Reserva realizada'
      })
       
    }
    catch(error){
      console.log(error);
    }
  }

  return(
    <>
      <h2 className="reservaTitle">Reserva</h2>
      {location.pathname.includes("restaurants")? <div>
      <DtPicker  placeholder="Elige una fecha" onChange={setDate} />
      <div className="bookingRestaurant">
      <div className="countPeople">
        <h3>Pax</h3>
      <button onClick={subtractPeople}>-</button>
        <p>{people}</p>
       <button onClick={sumPeople}>+</button>
      </div>
      <button className="bookingBtn" onClick={sendBooking}>Reservar</button>
      </div>
      </div>:null}
      <div className="reservaHolder">
        <div className="reservaImg">
         {info==="restaurants"? <label htmlFor="">Haz una reserva de un menú sostenible:</label>: <label htmlFor="">Hazte con un pack sostenible:</label>}
         {info==="restaurants"? <img src={reservaMenu} alt="" />: <img src={reservaTienda} alt="" />}
        </div>
        <div className="countPeople">
          <div className="operation">
            <button onClick={subtractPeople}>-</button>
            <p>{people}</p>
            <button onClick={sumPeople}>+</button>
          </div>
          <button className="bookingBtn" onClick={sendBooking}>Reservar</button>
        </div>
       
      </div>
     
      {/* {printDate?<p>Has reservado para el día {printDate}</p>:null} */}
    </>
  )
};

export default Reserva;
