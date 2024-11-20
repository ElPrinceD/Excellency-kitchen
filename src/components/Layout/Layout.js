import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import ProgressTracker from '../../components/UI/progress/ProgressTracker.jsx';
import { useProgress } from '../../context/ProgressContext.js';

const Layout = () => {
  const location = useLocation();
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const { currentStep } = useProgress();

  // Define the routes where the header and progress bar should be hidden
  const noProgressBarRoutes = ["/login", "/welcome", "/confirmation", '/admin-login', '/admin', "/reservations/:id", "/register"];
  const shouldShowHeaderFooter = location.pathname !== "/login"; // Header should be shown on all except login

  // Don't show progress bar on login and welcome routes
  const shouldShowProgressBar = !noProgressBarRoutes.includes(location.pathname);

  const stepNames = [
    "Meal Package",
    "Cuisine",
    "Spice level",
    "Chutney",
    "Salads",
    "Starters",
    "Rice Dishes",
    "Curries",
    "Desserts",
    "Extra Note",
    "Summary"
  ];
  const totalSteps = stepNames.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      {shouldShowHeaderFooter && <Header />}
      {shouldShowProgressBar && currentStep > 0 && (
        <ProgressTracker
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepNames={stepNames}
        />
      )}
      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
