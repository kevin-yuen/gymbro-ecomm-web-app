import React from "react";
import { NavLink, Link } from "react-router-dom";

// images
import carouselWomenActiveWear from "../assets/carousel-women-activewear.jpeg";
import carouselMenActiveWear from "../assets/carousel-men-activewear.jpeg";
import carouselSupplements from "../assets/carousel-supplements.jpeg";
import landingContent from "../assets/landing-content.jpeg";
import womenSales from "../assets/landing-women-sales.jpeg";
import menSales from "../assets/landing-men-sales.jpeg";

// components
import PromotionComponent from "../components/landing/PromotionComponent";
import FooterComponent from "../components/common/FooterComponent";

export default function Landing() {
  return (
    <>
      <section
        id="landing-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={carouselWomenActiveWear}
              className="d-block w-100"
              alt="Shop Women"
            />
            <div className="carousel-img-label position-absolute">
              <p className="fw-bolder custom-color-darkpurple">
                Inclusive fitness.
                <br />
                <span className="ms-5">Exclusive quality.</span>
              </p>
              <Link className="carousel-navlink custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-semibold text-decoration-none rounded-5 ps-5 pe-5 pt-2 pb-2">
                SHOP WOMEN
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={carouselMenActiveWear}
              className="d-block w-100"
              alt="Shop Men"
            />
            <div className="carousel-img-label position-absolute">
              <p className="fw-bolder custom-color-antiquewhite">
                Sassy look and
                <br />
                <span className="ms-5">Sassy styled gym wear.</span>
              </p>
              <Link className="carousel-navlink custom-background-color-antiquewhite custom-color-darkpurple custom-font-family-teko fw-semibold text-decoration-none rounded-5 ps-5 pe-5 pt-2 pb-2">
                SHOP MEN
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={carouselSupplements}
              className="d-block w-100"
              alt="Shop Supplements"
            />
            <div className="carousel-img-label position-absolute">
              <p className="fw-bolder custom-color-antiquewhite">
                Gym to
                <br />
                <span className="ms-5">perfection.</span>
              </p>
              <Link className="carousel-navlink custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-semibold text-decoration-none rounded-5 ps-5 pe-5 pt-2 pb-2">
                SHOP SUPPLEMENTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container border rounded-2 border-light border-2 shadow-lg mt-3">
        <PromotionComponent promotionHeading={"ITEMS ON DISCOUNT"} />
        <div className="mt-5">
          <img src={landingContent} className="w-100" />
          <div className="landing-img-label position-absolute mt-n22 ms-5">
            <p className="fw-bolder custom-color-antiquewhite position-sticky">
              SEAMLESS-SO-SOFT,
              <br />
              <span className="ms-5">YOU'LL NEVER WANT TO TAKE IT OFF</span>
            </p>
          </div>
        </div>

        <div className="mt-5">
          <PromotionComponent promotionHeading={"TOP-RATING ITEMS"} />
        </div>

        <div className="row mt-5 pt-3 text-center">
          <div className="col-6 ps-0 pe-0">
            <img src={womenSales} className="w-100" />
            <div className="sales-label position-absolute">
              <p className="fw-bolder custom-color-antiquewhite position-sticky">
                COTTON SEAMLESS
              </p>
              <Link className="sales-navlink carousel-navlink position-absolute custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-semibold text-decoration-none rounded-5 pt-2 pb-2">
                WOMEN ON SALES
              </Link>
            </div>
          </div>
          <div className="col-6 ps-0 pe-0">
            <img src={menSales} className="w-100" />
            <div className="sales-label position-absolute">
              <p className="fw-bolder custom-color-antiquewhite position-sticky">
                WORKOUT IN STYLE
              </p>
              <Link className="sales-navlink carousel-navlink position-absolute custom-background-color-antiquewhite custom-color-darkpurple custom-font-family-teko fw-semibold text-decoration-none rounded-5 pt-2 pb-2">
                MEN ON SALES
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <PromotionComponent
            promotionHeading={"THIS WEEK'S NEWLY LISTED ITEMS"}
          />
        </div>
      </section>

      <FooterComponent />
    </>
  );
}
