import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoCircle from '../../../assets/img/logoCircle.png'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { checkUserContext } from '../../../context/checkUserContext';
import Logo from '../../common/Logo';


const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { userCheck, setUserCheck } = useContext(checkUserContext);
  const { userDetails } = useContext(checkUserContext);
  const { checkUser } = useContext(checkUserContext);
  const [time, setTime] = useState(false);
  const { showNav, setShowNav } = useContext(checkUserContext);

  useEffect(() => {
    if (userCheck === null) {
      setTime(false)
    }
    else {
      setTime(true);
    }
    setShowNav(false);

    if (time === false) {
      const timeout = setTimeout(() => {
        setTime(true)
      }, 2000);
      return () => clearTimeout(timeout)
    }


  }, [])


  const onSubmit = async (form) => {
    try {
      // console.log(form);
      const res = await fetch('https://alimentacionback-production.up.railway.app/api/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      console.log("res ", res);
      if (res.ok === true) {
        checkUser();
        if (userCheck === null) {
          setUserCheck(form.email);
        }
        navigate("/home");
      } else { alert("Oops! algo ha fallado") }



    }
    catch (error) {
      console.log(error);
    }
  }


  // statusText :  "Bad Request"


  return (
    <>

      {time === false ? <Logo /> : <div>

        <div>
          <Logo value={"noLink"} />
          {userCheck == null ? <h2 className="titleLogin">Bienvenido</h2> : <h3>Has iniciado sesión como: </h3>}
          {userCheck == null ? <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="full-input">
              <label htmlFor="email">Email:</label>
              <input name="email" type="text"{
                ...register('email', {
                  required: true,
                  minLength: 3
                })
              } />{errors.email?.type === 'required' && <p>El campo 'Email' es requerido</p>}
            </div>
            <div className="full-input">
              <label htmlFor="password">Contraseña:</label>
              <input name="password" type="password"{
                ...register('password', {
                  required: true,
                  minLength: 3
                })
              } />{errors.email?.type === 'required' && <p>El campo 'Contraseña' es requerido</p>}
            </div>
            <input type="submit" value="Login" />
          </form> : userCheck}
        </div>
        <div>
          <Link className="goRegister" to="/signup"><span>
            Registro
          </span></Link>
          <Link to=""><span>
            ¿Has olvidado tu contraseña?
          </span></Link>
        </div>

      </div>}
    </>
  )
}

export default Login
