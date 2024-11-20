import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { getDate } from "../utils/auth";
import chefsBackground from "../assets/images/WAQA5677.JPG"; // Replace with your actual image path
import "../styles/chefs.css";

const Chefs = () => {
  const event_date = getDate();


  console.log("Date: ", event_date)


  return (
    <Helmet title="Our Chefs">
      {/* Hero Section */}
      <div
        className="chefs-hero"
        style={{
          backgroundImage: `url(${chefsBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div className="chefs-hero-overlay">
          <Container>
            <div className="text-center">
              <h1 className="chefs-hero-title">Meet Our Chefs</h1>

            </div>
          </Container>
        </div>
      </div>

      {/* Text Content Section */}
      <section className="chefs-details py-5">
        <Container>
          <p className="chefs-hero-text">
            At Excellency Catering, we take immense pride in ensuring that
            all our food is 100% halal, crafted with the utmost care and
            respect for tradition. Our commitment to excellence begins here,
            allowing us to cater to a wide array of clients while
            maintaining the highest standards of quality and authenticity.
          </p>
          <p>
            Our culinary mastery is driven by our team of 25 world-class chefs,
            sourced from the finest hotels and venues around the globe.
            Representing a diverse blend of cultures and cuisines—including
            Indian, Pakistani, Bangladeshi, Lebanese, Persian, Arabic, and
            more—our chefs are true artisans. They combine time-honored
            traditions with modern techniques to create dishes that are both
            exquisite and unforgettable.
          </p>
          <p>
            To ensure that your wedding catering perfectly aligns with your
            vision, we are delighted to offer personalized food tasting
            sessions. This exclusive experience allows you to sample a curated
            selection of our dishes, ensuring every flavor and detail exceeds
            your expectations. From delicate starters to lavish banquets and
            show-stopping desserts, you can be confident that each dish is a
            masterpiece.
          </p>
          <p>
            At Excellency Catering, we understand that your wedding day is a
            once-in-a-lifetime celebration. That’s why we strive for perfection
            in every element, delivering a bespoke fine dining experience that
            reflects our passion for quality, creativity, and attention to
            detail. Let us help you create memories that will be cherished
            forever.
          </p>
        </Container>
      </section>
    </Helmet>
  );
};

export default Chefs;
