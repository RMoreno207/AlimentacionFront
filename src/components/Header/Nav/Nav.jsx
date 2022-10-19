import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkUserContext } from '../../../context/checkUserContext';
import BackLogo from '../../../assets/img/Back @2x.png';
import burgerCross from '../../../assets/img/bars-solid.svg'
// import SideBar from "./sidebar";
import { useLocation } from 'react-router-dom';
import Logo from '../../common/Logo';
import SideBar from "./sidebar";

function Nav() {
  const { userCheck, setUserCheck } = useContext(checkUserContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const {showNav,setShowNav} = useContext(checkUserContext);
  const location = useLocation();
  const [btnState,setBtnState] = useState(false);

  useEffect(()=>{
    if(location.pathname==="/"||location.pathname.includes("/stores/details/")||location.pathname.includes("/restaurants/details/")||location.pathname.includes("/user/profile/")){
      setShowNav(false);
    }
    else{
      setShowNav(true);
    }
   
    
  },[showNav])


  

  let toggleClassCheck = btnState?'active':'';

  const handleClick = () => {
    setClicked(!clicked)
  }
  console.log(showNav)
  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
      await setUserCheck(null);
      navigate("/")
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <header>
      {showNav===true?<div>{userCheck === null? <div className='navContainer'>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"navContainer"} />
        {location.pathname.includes('/profile')?null:<Logo className='logoHeader'/>}
      </div> : <div className='navContainer'>
         {location.pathname.includes('/details')?null:<SideBar pageWrapId={"page-wrap"} outerContainerId={"navContainer"} />}
      {location.pathname.includes('/profile')||location.pathname.includes('/restaurants')||location.pathname.includes('/details')||location.pathname.includes('/stores')?null:<Logo className='logoHeader'/>}
      </div>}</div>:null}
    </header>
  )
}

export default Nav