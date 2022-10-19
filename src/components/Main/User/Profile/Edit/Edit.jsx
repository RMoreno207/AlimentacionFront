import { checkUserContext } from "../../../../../context/checkUserContext"
import { useForm } from 'react-hook-form';
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Arrow from '../../../../../assets/img/arrow.png'


const Edit = () => {
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();//Formulario
  const { userCheck } = useContext(checkUserContext);//Hook para obtener el email del usuario logado
  const { userData, setUserData } = useContext(checkUserContext)//Hook para guardar los datos del perfil de usuario
  const { userDetails } = useContext(checkUserContext);

  const [part1, setPart1] = useState(true);//Estado para mostrar o no la parte 1 del formulario
  const [part2, setPart2] = useState(false);//Estado para mostrar o no la parte 2 del formulario
  const [part3, setPart3] = useState(false);//Estado para mostrar o no la parte 3 del formulario



  useEffect(() => {
    console.log("usuario: ", userCheck);
    console.log("Datos user", userData);
    if (userData == null) {
      userDetails()
    }
    if (userCheck === null) {
      navigate("/home");
    }
  }, []);

  //Editar los datos del usuario
  // const editUser = async (data) => {
  //   try {
  //     const refactorData = {
  //       email: data.email,
  //     }
  //     const mergedData = { ...refactorData, ...checked };//unimos el objeto refactor data que contiene los datos de los inputs, con los datos de los checkbox
  //     console.log("USER EDITED", mergedData);
  //     // await axios.put('/api/updateUser', mergedData);
  //   } catch (error) {
  //     console.log(error, "No se ha podido editar el Usuario")
  //   }
  // }

  //Envio del formulario a la bbdd
  // BORRAR CUANDO SE HAGA EL DE EDITAR
  const onSubmit = async (form) => {
    try {
      console.log(form);
      alert("La bbdd no está conectada")
      // const res = await axios.post('http://localhost:5000/api/signup', form);
      // console.log(res.data);
      // navigate('/login')
    }
    catch (error) {
      console.log(error);
    }
  }

  // function handleChecked(checked){
  //   if(checked){
  //     setChecked(false)
  //   }
  //   else{
  //     setChecked(true)
  //   }
  // }


  //"Paginar el formulario"
  const handleChangePart = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === "next" && part2 === false) {
      console.log("Estas en la segunda pagina");
      setPart1(false)
      setPart2(true)
      setPart3(false)
    } else if (value === "next" && part2 === true) {
      console.log("Estas en la ultima pagina");
      setPart1(false)
      setPart2(false)
      setPart3(true)
    }

    else if (value === "back" && part2 === true) {
      console.log("Estas en la primera pagina");
      setPart1(true)
      setPart2(false)
      setPart3(false)
    } else if (value === "back" && part3 === true) {
      console.log("Estas en la segunda pagina");
      setPart1(false)
      setPart2(true)
      setPart3(false)
    }

  }

  return <>
    {/* Formulario con los campos del perfil a editar */}
    {/* Precarga de los datos del usuario */}
    {/* HACER PRECARGA DE TODAS LAS PREFERENCIAS CUANDO ESTE LA DB */}
    {/* {userData ? setValue("nombre", userData.name) : "..."} */}

    {/* Primera parte del formulario */}
    {/* <Logo /> */}
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <fieldset style={part1 ? {} : { display: "none" }} >
        <h2 className="titleLogin">Edita tu perfil</h2>
        {/* <div><p className="preferenceIntro">Ya no queda nada, completando la siguiente información formarás parte de la comunidad Kmon.</p></div> */}
        <div className="full-input">
          <label htmlFor="nombre">Nombre</label>
          <input type="text"
            name="nombre"
            id="nombre"
            {...register('nombre', {
              required: {
                value: true,
                message: "Por favor introduce un Nombre válido"
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "El formato no es correcto"
              },
              minLength: {
                value: 3,
                message: "Como minimo debe de tener 3 caracteres"
              }
            })
            } />

          {errors.nombre && <p>{errors.nombre.message}</p>}

        </div>
      </fieldset>


      {/* segunda parte del formulario */}

      <div className="fieldsetContainer" style={part2 ? {} : { display: "none" }}>
        <h2 className="titleLogin">Preferencias</h2>
        <div><p className="preferenceIntro">En una escala de 1-5 (Muy poco-Mucho)¿Qué importancia otorgarías a cada uno de estos conceptos a la hora de consumir alimentos?</p></div>
        <fieldset>
          <legend>Producto de temporada</legend>
          <label htmlFor="1">
            <input
              {...register("productosTemporada", { required: true })}
              type="radio"
              value="1"
              id="11"
              name="productosTemporada"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("productosTemporada", { required: true })}
              type="radio"
              value="2"
              id="12"
              name="productosTemporada"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("productosTemporada", { required: true })}
              type="radio"
              value="3"
              id="13"
              name="productosTemporada"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("productosTemporada", { required: true })}
              type="radio"
              value="4"
              id="14"
              name="productosTemporada"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("productosTemporada", { required: true })}
              type="radio"
              value="5"
              id="15"
              name="productosTemporada"
            />
            5
            {errors.productosTemporada && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>

        <fieldset>
          <legend>Productos frescos</legend>
          <label htmlFor="1">
            <input
              {...register("productosFrescos", { required: true })}
              type="radio"
              value="1"
              id="21"
              name="productosFrescos"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("productosFrescos", { required: true })}
              type="radio"
              value="2"
              id="22"
              name="productosFrescos"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("productosFrescos", { required: true })}
              type="radio"
              value="3"
              id="23"
              name="productosFrescos"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("productosFrescos", { required: true })}
              type="radio"
              value="4"
              id="24"
              name="productosFrescos"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("productosFrescos", { required: true })}
              type="radio"
              value="5"
              id="25"
              name="productosFrescos"
            />
            5
            {errors.productosFrescos && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>

        <fieldset>
          <legend>Orgánico</legend>
          <label htmlFor="1">
            <input
              {...register("organico", { required: true })}
              type="radio"
              value="1"
              id="31"
              name="organico"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("organico", { required: true })}
              type="radio"
              value="2"
              id="32"
              name="organico"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("organico", { required: true })}
              type="radio"
              value="3"
              id="33"
              name="organico"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("organico", { required: true })}
              type="radio"
              value="4"
              id="34"
              name="organico"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("organico", { required: true })}
              type="radio"
              value="5"
              id="35"
              name="organico"
            />
            5
            {errors.organico && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>

        <fieldset>
          <legend>Saludable</legend>
          <label htmlFor="1">
            <input
              {...register("saludable", { required: true })}
              type="radio"
              value="1"
              id="41"
              name="saludable"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("saludable", { required: true })}
              type="radio"
              value="2"
              id="42"
              name="saludable"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("saludable", { required: true })}
              type="radio"
              value="3"
              id="43"
              name="saludable"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("saludable", { required: true })}
              type="radio"
              value="4"
              id="44"
              name="saludable"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("saludable", { required: true })}
              type="radio"
              value="5"
              id="45"
              name="saludable"
            />
            5
            {errors.saludable && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>
      </div>


      {/* tercera parte del formulario */}

      <div className="fieldsetContainer" style={part3 ? {} : { display: "none" }}>
        <h2 className="titleLogin">Preferencias</h2>
        <fieldset>
          <legend>Sostenible</legend>
          <label htmlFor="1">
            <input
              {...register("sostenible", { required: true })}
              type="radio"
              value="1"
              id="51"
              name="sostenible"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("sostenible", { required: true })}
              type="radio"
              value="2"
              id="52"
              name="sostenible"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("sostenible", { required: true })}
              type="radio"
              value="3"
              id="53"
              name="sostenible"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("sostenible", { required: true })}
              type="radio"
              value="4"
              id="54"
              name="sostenible"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("sostenible", { required: true })}
              type="radio"
              value="5"
              id="55"
              name="sostenible"
            />
            5
            {errors.sostenible && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>
        <fieldset>
          <legend>Basura 0</legend>
          <label htmlFor="1">
            <input
              {...register("basura0", { required: true })}
              type="radio"
              value="1"
              id="61"
              name="basura0"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("basura0", { required: true })}
              type="radio"
              value="2"
              id="62"
              name="basura0"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("basura0", { required: true })}
              type="radio"
              value="3"
              id="63"
              name="basura0"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("basura0", { required: true })}
              type="radio"
              value="4"
              id="64"
              name="basura0"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("basura0", { required: true })}
              type="radio"
              value="5"
              id="65"
              name="basura0"
            />
            5
            {errors.basura0 && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>
        <fieldset>
          <legend>Km 0</legend>
          <label htmlFor="1">
            <input
              {...register("km0", { required: true })}
              type="radio"
              value="1"
              id="71"
              name="km0"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("km0", { required: true })}
              type="radio"
              value="2"
              id="72"
              name="km0"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("km0", { required: true })}
              type="radio"
              value="3"
              id="73"
              name="km0"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("km0", { required: true })}
              type="radio"
              value="4"
              id="74"
              name="km0"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("km0", { required: true })}
              type="radio"
              value="5"
              id="75"
              name="km0"
            />
            5
            {errors.km0 && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>
        <fieldset>
          <legend>Vegano</legend>
          <label htmlFor="1">
            <input
              {...register("vegano", { required: true })}
              type="radio"
              value="1"
              id="81"
              name="vegano"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("vegano", { required: true })}
              type="radio"
              value="2"
              id="82"
              name="vegano"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("vegano", { required: true })}
              type="radio"
              value="3"
              id="83"
              name="vegano"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("vegano", { required: true })}
              type="radio"
              value="4"
              id="84"
              name="vegano"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("vegano", { required: true })}
              type="radio"
              value="5"
              id="85"
              name="vegano"
            />
            5
            {errors.vegano && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>
        <fieldset>
          <legend>Vegetariano</legend>
          <label htmlFor="1">
            <input
              {...register("vegetariano", { required: true })}
              type="radio"
              value="1"
              id="91"
              name="vegetariano"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("vegetariano", { required: true })}
              type="radio"
              value="2"
              id="92"
              name="vegetariano"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("vegetariano", { required: true })}
              type="radio"
              value="3"
              id="93"
              name="vegetariano"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("vegetariano", { required: true })}
              type="radio"
              value="4"
              id="94"
              name="vegetariano"
            />
            4

          </label>
          <label htmlFor="5">
            <input
              {...register("vegetariano", { required: true })}
              type="radio"
              value="5"
              id="95"
              name="vegetariano"
            />
            5
            {errors.vegetariano && <p>Por favor, marca algún valor</p>}
          </label>
        </fieldset>
        <fieldset>
          <legend>Artesanal</legend>
          <label htmlFor="1">
            <input
              {...register("artesanal", { required: true })}
              type="radio"
              value="1"
              id="101"
              name="artesanal"
            />
            1
          </label>
          <label htmlFor="2">
            <input
              {...register("artesanal", { required: true })}
              type="radio"
              value="2"
              id="102"
              name="artesanal"
            />
            2
          </label>
          <label htmlFor="3">
            <input
              {...register("artesanal", { required: true })}
              type="radio"
              value="3"
              id="103"
              name="artesanal"
            />
            3
          </label>
          <label htmlFor="4">
            <input
              {...register("artesanal", { required: true })}
              type="radio"
              value="4"
              id="104"
              name="artesanal"
            />
            4
          </label>
          <label htmlFor="5">
            <input
              {...register("artesanal", { required: true })}
              type="radio"
              value="5"
              id="105"
              name="artesanal"
            />
            5
            {errors.artesanal && <p>Por favor, marca algún valor</p>}

          </label>
        </fieldset>

      </div>

      {/* errores */}
      <div>
        {errors.nombre && <p>Error en el nombre</p>}
        {/* 
        {errors.productosTemporada && <p>Por favor, marca algún valor en productos de temporada</p>}
        {errors.productosFrescos && <p>Por favor, marca algún valor en productos frescos</p>}
        {errors.organico && <p>Por favor, marca algún valor en organico</p>}
        {errors.saludable && <p>Por favor, marca algún valor en saludable</p>}
        {errors.sostenible && <p>Por favor, marca algún valor en sostenible</p>}
        {errors.basura0 && <p>Por favor, marca algún valor en basura0</p>}
        {errors.km0 && <p>Por favor, marca algún valor en km0</p>}
        {errors.vegano && <p>Por favor, marca algún valor en vegano</p>}
        {errors.vegetariano && <p>Por favor, marca algún valor en vegetariano</p>}
        {errors.artesanal && <p>Por favor, marca algún valor en artesanal</p>} */}
      </div>

      {/* botones */}
      {part3 ?
        <input type="submit" value="Editar" />
        : null}
    </form>
    <div className="moveBtns">
      {
        part2 || part3 ?
          <button className="backArrow" onClick={handleChangePart} value="back"><img src={Arrow} alt="" />Atrás</button>
          : null
      }
      {
        part1 || part2 ?
          <button className="nextArrow" onClick={handleChangePart} value="next">Siguiente<img src={Arrow} alt="" /></button>
          : null
      }
    </div>
  </>;
};

export default Edit;
