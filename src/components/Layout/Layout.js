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

  const noHeaderFooterRoutes = ["/login"];
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  const stepNames = [
    "Welcome",
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
      {currentStep > 0 && (
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
