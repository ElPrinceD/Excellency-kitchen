import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  // List of routes where the header and footer should not be shown
  const noHeaderFooterRoutes = ["/login"]; // Add other routes as needed

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  // Scroll to the top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // This hook will run whenever the location changes (i.e., when navigating between routes)

  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      {shouldShowHeaderFooter && <Header />}
      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
