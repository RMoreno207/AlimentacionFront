import { checkUserContext } from '../../../../context/checkUserContext';
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Recommendations from '../Recommendations/Recommendations';
import Favorites from "../favorites/favorites"
import Discounts from "../../../common/Discounts/Discounts";
import Card from '../../List/Card/Card';
import Settings from '../../../../assets/img/settings.png'

const Profile = () => {
  const navigate = useNavigate();
  const { userCheck } = useContext(checkUserContext);//Hook para obtener el email del usuario logado
  const { userData } = useContext(checkUserContext)//Hook para guardar los datos del perfil de usuario
  const { userDetails } = useContext(checkUserContext);
  const { checkUser } = useContext(checkUserContext);
  const [preferences, setPreferences] = useState(null);

  console.log(userCheck);

  useEffect(() => {

    if (userData === null) {
      userDetails()

    }
    if (userCheck === null) {
      navigate("/home");
    }

    console.log("test", userDetails.organico);
  }, []);

  useEffect(() => {
    //Objeto con las preferencias del usuario
    if (userData != null) {
      const objeto = {
        "preferencias": [
          parseInt(userData.artesanal),
          parseInt(userData.basura0),
          parseInt(userData.km0),
          parseInt(userData.organico),
          parseInt(userData.productosfrescos),
          parseInt(userData.productostemporada),
          parseInt(userData.saludable),
          parseInt(userData.sostenible),
          parseInt(userData.vegano),
          parseInt(userData.vegetariano)
        ]
      }
      console.log(objeto);
      setPreferences(objeto)
    }
  }, [userData]);

  return <div className='showcase'>
    <div className='profileTop'>
      <div className='profileImg'>
        <img className='profile' style={{ width: "100px" }} src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'></img>

      </div>
      <div className='editUser'>
        <Link to="/user/profile/edit"><img src={Settings} alt="" /></Link>
        <h1>{userData ? userCheck : "Usuario"}</h1>

      </div>
    </div>

    {preferences &&
      <Recommendations type={"profile"} preferences={preferences} />
    }
    <Discounts />

    <Favorites />


  </div >;
};

export default Profile;