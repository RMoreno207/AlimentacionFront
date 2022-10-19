import React,{useState} from "react";
import { useEffect,useContext } from "react";
import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css';
import { checkUserContext } from "../../../context/checkUserContext";
import axios from 'axios';

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
      <h2>Reserva</h2>
      <DtPicker  onChange={setDate} />
      <label htmlFor="">Número de comensales</label>
      <div className="countPeople">
        <button onClick={sumPeople}>+</button>
        <p>{people}</p>
        <button onClick={subtractPeople}>-</button>
      </div>
      {showBtn!=true||people===0?null:<button onClick={sendBooking}>Reservar</button>}
      {/* {printDate?<p>Has reservado para el día {printDate}</p>:null} */}
    </>
  )
};

export default Reserva;
