import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Pizzas from "../pages/Pizzas";
import PizzaDetails from "../pages/PizzaDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import EventForm from "../pages/EventForm";
import Subscription from "../pages/SubcriptionPage";
import Chefs from "../pages/Chefs";
import RegisterClientPage from "../pages/RegisterClient";
import SummaryPage from "../pages/Summary";
import AdminPage from "../pages/Admin";
import WelcomePage from "../pages/WelcomePage";
import IngredientCalculator from "../pages/IngredientsCalculator";
import KitchenManager from "../pages/KitchenManager";
import ReservationDetailsPage from "../pages/ReservationDetailsPage";
import SelectOptions from "../pages/SelectOptions";
import DishesNote from "../pages/DishesNote";
import ConfirmationPage from "../pages/Confirmation";
import AdminLogin from "../pages/AdminLogin";

const Routers = () => {
  return (

    <Routes>
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path='/calculator' element={<IngredientCalculator />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path='/subscription' element={<Subscription />} />
      <Route path='/welcome' element={<WelcomePage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/kitchen-manager" element={<KitchenManager />} />
      <Route path="/pizzas" element={<Pizzas />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<RegisterClientPage />} />
      <Route path="/options" element={<SelectOptions />} />
      <Route path="/notes" element={<DishesNote />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path='/summary' element={<SummaryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/book-event" element={<EventForm />} />
      <Route path="/pizzas/:id" element={<PizzaDetails />} />
      <Route path="/reservations/:id" element={<ReservationDetailsPage />} />
    </Routes>
  );
};

export default Routers;