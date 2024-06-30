import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDoubleRight } from "react-bootstrap-icons";

// images
import carouselWomenActiveWear from "../assets/images/carousel-women-activewear.jpeg";
import carouselMenActiveWear from "../assets/images/carousel-men-activewear.jpg";
import carouselSupplements from "../assets/images/carousel-supplements.jpg";
import landingContent from "../assets/images/landing-content.jpeg";
import womenSales from "../assets/images/landing-women-sales.jpeg";
import menSales from "../assets/images/landing-men-sales.jpeg";

// custom hooks
import useGetEligibleItems from "../hooks/useGetEligibleItems";

// config
import Labels from "../config/labels.json";
import Messages from "../config/messages.json";

// utils
import { apiResultLoader } from "../utils/apiResultLoader";

const discountHeader = Labels["promo-discounts"].header;
const moreDiscounts = Labels["promo-discounts"]["more-discounts"];
const topRatingHeader = Labels["promo-topRatings"].header;
const moreTopRatings = Labels["promo-topRatings"]["more-topRatings"];
const clearanceHeader = Labels["promo-clearance"].header;
const moreClearance = Labels["promo-clearance"]["more-clearance"];

const noDiscountsErr = Messages["server-result"]["no-discount"];
const noTopRatingsErr = Messages["server-result"]["no-topRating"];
const noClearanceErr = Messages["server-result"]["no-clearnace"];

const limitRequest = 4;
const ratingRequest = 4.5;

const discountEndpoint = "/discounts/";
const topRatingEndpoint = "/topRatings/";
const clearanceEndpoint = "/clearance/";

export default function Landing() {
  const {
    getEligibleItems: getDiscounts,
    eligibleItems: discountItems,
    isFetchSuccess: isDiscountFetchSuccess,
  } = useGetEligibleItems(discountEndpoint, limitRequest);

  const {
    getEligibleItems: getTopRatings,
    eligibleItems: topRatingItems,
    isFetchSuccess: isTopRatingFetchSuccess,
  } = useGetEligibleItems(topRatingEndpoint, limitRequest, ratingRequest);

  const {
    getEligibleItems: getClearance,
    eligibleItems: clearanceItems,
    isFetchSuccess: isClearanceFetchSuccess,
  } = useGetEligibleItems(clearanceEndpoint, limitRequest);

  useEffect(() => {
    getDiscounts();
    getTopRatings();
    getClearance();
  }, []);

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
              <p className="fw-bolder custom-color-darkpurple custom-font-family-jersey">
                INCLUSIVE FITNESS.
                <br />
                <span className="ms-5">EXCLUSIVE QUALITY.</span>
              </p>
              <Link className="carousel-navlink custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-semibold text-decoration-none rounded-5 ps-5 pe-5 pt-2 pb-2" to="/womenActivewear">
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
              <p className="fw-bolder custom-color-antiquewhite custom-font-family-jersey">
                SASSY LOOK AND
                <br />
                <span className="ms-5">SASSY STYLED GYM WEAR.</span>
              </p>
              <Link className="carousel-navlink custom-background-color-antiquewhite custom-color-darkpurple custom-font-family-teko fw-semibold text-decoration-none rounded-5 ps-5 pe-5 pt-2 pb-2" to="/menActivewear">
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
              <p className="fw-bolder custom-color-antiquewhite custom-font-family-jersey">
                GYM TO
                <br />
                <span className="ms-5">PERFECTION.</span>
              </p>
              <Link className="carousel-navlink custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-semibold text-decoration-none rounded-5 ps-5 pe-5 pt-2 pb-2" to="/supplements">
                SHOP SUPPLEMENTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container border rounded-2 border-light border-2 shadow-lg mt-3">
        {/* discount items */}
        <div className="row pt-3">
          <h1 className="ps-4 fw-bolder pb-2 fs-3 custom-font-family-teko custom-color-darkpurple d-flex align-items-center">
            {discountHeader}

            {isDiscountFetchSuccess && discountItems.length > 0 ? (
              <Link className="ms-3 text-decoration-none custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata rounded-2 fs-7 border ps-3 pe-3 pt-1 pb-1">
                {moreDiscounts}
                <ChevronDoubleRight
                  size={15}
                  color="#f8faf9"
                  className="ms-2"
                />
              </Link>
            ) : (
              <></>
            )}
          </h1>
        </div>

        {isDiscountFetchSuccess !== undefined &&
          apiResultLoader(
            isDiscountFetchSuccess,
            discountItems,
            noDiscountsErr
          )}

        <div className="mt-5">
          <img src={landingContent} className="w-100" />
          <div className="landing-img-label position-absolute mt-n22 ms-5">
            <p className="fw-bolder custom-color-antiquewhite custom-font-family-jersey position-sticky">
              SEAMLESS-SO-SOFT,
              <br />
              <span className="ms-5">YOU'LL NEVER WANT TO TAKE IT OFF</span>
            </p>
          </div>
        </div>

        {/* top-rating items */}
        <div className="row pt-3">
          <h1 className="ps-4 fw-bolder pb-2 fs-3 custom-font-family-teko custom-color-darkpurple d-flex align-items-center">
            {topRatingHeader}

            {isTopRatingFetchSuccess && topRatingItems.length > 0 ? (
              <Link className="ms-3 text-decoration-none custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata rounded-2 fs-7 border ps-3 pe-3 pt-1 pb-1">
                {moreTopRatings}
                <ChevronDoubleRight
                  size={15}
                  color="#f8faf9"
                  className="ms-2"
                />
              </Link>
            ) : (
              <></>
            )}
          </h1>
        </div>

        {isTopRatingFetchSuccess !== undefined &&
          apiResultLoader(
            isTopRatingFetchSuccess,
            topRatingItems,
            noTopRatingsErr
          )}

        <div className="row mt-5 pt-3 text-center">
          <div className="col-6 ps-0 pe-0">
            <img src={womenSales} className="w-100" />

            <div className="sales-label position-absolute">
              <p className="fw-bolder custom-color-antiquewhite custom-font-family-jersey position-sticky">
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
              <p className="fw-bolder custom-color-antiquewhite custom-font-family-jersey position-sticky">
                WORKOUT IN STYLE
              </p>

              <Link className="sales-navlink carousel-navlink position-absolute custom-background-color-antiquewhite custom-color-darkpurple custom-font-family-teko fw-semibold text-decoration-none rounded-5 pt-2 pb-2">
                MEN ON SALES
              </Link>
            </div>
          </div>
        </div>

        {/* clearance items */}
        <div className="row pt-3">
          <h1 className="ps-4 fw-bolder pb-2 fs-3 custom-font-family-teko custom-color-darkpurple d-flex align-items-center">
            {clearanceHeader}

            {isClearanceFetchSuccess && clearanceItems.length > 0 ? (
              <Link className="ms-3 text-decoration-none custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata rounded-2 fs-7 border ps-3 pe-3 pt-1 pb-1">
                {moreClearance}
                <ChevronDoubleRight
                  size={15}
                  color="#f8faf9"
                  className="ms-2"
                />
              </Link>
            ) : (
              <></>
            )}
          </h1>
        </div>

        {isClearanceFetchSuccess !== undefined &&
          apiResultLoader(
            isClearanceFetchSuccess,
            clearanceItems,
            noClearanceErr
          )}
      </section>
    </>
  );
}
