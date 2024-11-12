import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import logo from "../../assets/images/Excellency-header-logo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import "../../styles/header.css";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Chefs",
    path: "/chefs",
  },
  {
    display: "Contact",
    path: "/contact",
  },
  {
    display: "Reservations",
    path: "/admin", // Admin's reservations page
  },

];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    menuRef.current.classList.toggle("show__menu");
  };

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Corrected usage
  }, []);


  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} alt="logo" />
          </div>

          {/* Navigation Menu (visible on larger screens) */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div
              className="menu d-flex align-items-center gap-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="header__closeButton">
                <span onClick={toggleMenu}>
                  <i className={menuOpen ? "ri-close-fill" : "ri-menu-line"}></i>
                </span>
              </div>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu nav__link-item" : "menu_item nav__link-item"
                  }
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle (only visible on smaller screens) */}
          <span className="mobile__menu" onClick={toggleMenu}>
            <i className={menuOpen ? "ri-close-fill" : "ri-menu-line"}></i>
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
