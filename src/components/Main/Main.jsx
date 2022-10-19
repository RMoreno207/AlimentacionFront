import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Restaurants from './Restaurants/Restaurants'
import List from "./List/List";
import Profile from './User/Profile'
import Edit from './User/Profile/Edit/Edit';
import Details from "./Details/Details"
import RestaurantDetails from './Restaurants/Details/Details';

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<Home />} path={"/home"} />
        <Route element={<Restaurants />} path={"/restaurants"} />
        <Route element={<List />} path={"/list/:re"} />
        <Route element={<Profile />} path={"/user/profile"} />
        <Route element={<Edit />} path={"/user/profile/edit"} />
        <Route element={<Details />} path={"/stores/details/:id/:re"} />
        <Route element={<RestaurantDetails />} path={'/restaurants/details/:id'} />
      </Routes>
    </main>
  )
}

export default Main