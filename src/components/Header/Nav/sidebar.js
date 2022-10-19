import React,{useContext} from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { checkUserContext } from '../../../context/checkUserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default props => {
  const { userCheck, setUserCheck } = useContext(checkUserContext);
  const navigate = useNavigate();

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
    // Pass on our props
    <Menu {...props}>
      <Link className="menu-item" to='/home'>
        Inicio
      </Link>

      <Link className="menu-item" to='list/restaurants'>
        Restaurantes
      </Link>
      <Link className="menu-item" to='list/stores'>
        Tiendas
      </Link>

      <Link className="menu-item" >
        Información
      </Link>

      <Link className="menu-item" >
        Escaner
      </Link>
      <Link className="menu-item" to='user/profile'>
        Perfil
      </Link>
      <Link className="menu-item" onClick={handleLogout}>
        Cerrar sesión
      </Link>
    </Menu>
  );
};