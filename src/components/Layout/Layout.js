import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import ProgressTracker from '../../components/UI/progress/ProgressTracker.jsx';

const Layout = () => {
  const location = useLocation();
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  // List of routes where the header and footer should not be shown
  const noHeaderFooterRoutes = ["/login"];
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  const getCurrentStep = (pathname) => {
    if (pathname.includes("/subscription")) return 1;
    if (pathname.includes("/options")) return 2;
    if (pathname.includes("/pizzas")) return 3;
    if (pathname.includes("/summary")) return 4;
    return 0;
  };

  // Fixed step names for all pages
  const stepNames = [
    "Welcome",
    "Meal Package",   // Step 1: Subscription
    "Cuisine",
    "Spice level",
    "Chutney",
    "Salads",
    "Starters",
    "Rice Dishes",
    "Curries",
    "Desserts",   // Step 3: Pizzas
    "Extra Note",
    "Summary"         // Step 4: Summary
  ];

  const currentStep = getCurrentStep(location.pathname);
  const totalSteps = 12;

  // Scroll to the top whenever the route changes
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
          stepNames={stepNames} // Pass the fixed step names here
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


