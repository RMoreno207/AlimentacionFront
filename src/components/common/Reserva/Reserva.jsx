import React,{useState} from "react";
import { useEffect,useContext } from "react";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css';
import { checkUserContext } from "../../../context/checkUserContext";
import axios from 'axios';
import reservaMenu from '../../../assets/img/reservaMenu.png'

const Reserva = (props) => {
  const info = props.data;
  const [date, setDate] = useState(null);
  const [showBtn,setShowBtn] = useState(false);
  const { userCheck } = useContext(checkUserContext);
  const [printDate,setPrintDate] = useState(null);
  let [people,setPeople] = useState(0);
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
       const bookingBody = {
        date:date,
        people:people
       }
       const res = await axios.post(`http://localhost:5000/api/saveBooking/${userCheck.email}`,bookingBody);
       console.log(res.data);
    }
    catch(error){
      console.log(error);
    }
  }

  return(
    <>
      <h2 className="reservaTitle">Reserva</h2>
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
      <div className="reservaHolder">
        <div className="reservaImg">
          <label htmlFor="">Haz una reserva de un menú sostenible:</label>
          <img src={reservaMenu} alt="" />
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
