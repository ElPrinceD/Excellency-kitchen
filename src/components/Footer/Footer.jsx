import React from "react";
import { ListGroup } from "reactstrap";

import logo from "../../assets/images/Excellency-header-logo.png";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>Excellency Midlands</h5>
        <p>Events at Excellency are not just any wedding. 
         </p>
      </div>
      <div>
        <h5 className="footer__title mb-3">Contact Us</h5>
        <ListGroup>
          <div className="delivery__time-item border-0 ps-0">
            <span>Call</span>
            <p>0121 3060231</p>
          </div>
          <div className="delivery__time-item border-0 ps-0">
            <span>Email</span>
            <p>info@excellencymidlands.co.uk</p>
          </div>
        </ListGroup>
      </div>
    </footer>
  );
};

export default Footer;
