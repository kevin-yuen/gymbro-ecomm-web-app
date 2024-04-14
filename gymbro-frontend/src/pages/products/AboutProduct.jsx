import React from "react";

// components
import ProductImageGroupComponent from "../../components/products/ProductImageGroupComponent";
import BuyComponent from "../../components/products/BuyComponent";
import ProductDetailsComponent from "../../components/products/ProductDetailsComponent";
import CustomerReviewsComponent from "../../components/products/CustomerReviewsComponent";
import FooterComponent from "../../components/common/FooterComponent";

// mock data
import ProductInformationData from "../../config/productInformationData.json";
import CustomerReviewsData from "../../config/customerReviewsData.json";

export default function AboutProduct() {
  return (
    <>
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <ProductImageGroupComponent />
          </div>

          <div className="col-lg-6">
            <BuyComponent />
          </div>
        </div>

        <div className="row mt-5">
          <h5 className="custom-font-family-teko fw-bolder fs-4">
            Product Information
          </h5>

          <div className="d-flex">
            <div className="col-6 me-1">
              <ProductDetailsComponent
                sectionName={"Technical Details"}
                {...ProductInformationData.product_information}
              />
            </div>

            <div className="col6">
              <ProductDetailsComponent
                sectionName={"Additional Information"}
                {...ProductInformationData.additional_information}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div>
            <h5 className="custom-font-family-teko fw-bolder fs-4">
              What our customer says
            </h5>
            <p className="mt-n2 fs-7">
              ({CustomerReviewsData.total_reviews} reviews)
            </p>
          </div>
          {CustomerReviewsData.reviews.map((element) => (
            <CustomerReviewsComponent
              authorAvatar={element.review_author_avatar}
              authorName={element.review_author}
              rating={element.review_star_rating}
              reviewTitle={element.review_title}
              reviewDate={element.review_date}
              verifiedPurchase={element.is_verified_purchase}
              reviewComment={element.review_comment}
            />
          ))}
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
