import React from "react";
import { Link } from 'react-router-dom';
import LogoCircle from '../../../assets/img/logoC.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Logo = (props) => {

  console.log(props);
  const link = props.value;

  return (
    <div data-aos="fade-down">

      {link === "noLink" ?
        <div className="logoHeader"><h1 className="logoTextHeader">K'm<img className="logoImgHeader" src={LogoCircle}></img>n</h1></div>

        : <Link to={"/home"}><div className="logoHeader"><h1 className="logoTextHeader">K'm<img className="logoImgHeader" src={LogoCircle}></img>n</h1></div>
        </Link>
      }

    </div>
  );
};

export default Logo;
