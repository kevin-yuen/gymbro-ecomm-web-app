import React from "react";

// components
import SidebarFilterComponent from "../../components/common/SidebarFilterComponent";
import CardComponent from "../../components/common/CardComponent";
import PaginationComponent from "../../components/common/PaginationComponent";
import FooterComponent from "../../components/common/FooterComponent";

export default function AllProducts() {
  return (
    <>
      <div className="ps-8 pt-5 d-flex">
        <section>
          <SidebarFilterComponent />
        </section>

        <section className="content-container">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-md-5 col-6 ps-2 ms-2 me-2 d-flex">
              <CardComponent
                productTitle={"Adapt Safari Tight Shorts"}
                productRating={"4.1"}
                department={"Women"}
                manufacturer={"GymShark"}
                productPrice={"US$44"}
                productOrigPrice={"US$100"}
              />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-5 col-6 ps-2 ms-2 me-2 d-flex">
              <CardComponent
                productTitle={"Adapt Safari Tight Shorts"}
                productRating={"4.1"}
                department={"Women"}
                manufacturer={"GymShark"}
                productPrice={"US$44"}
                productOrigPrice={"US$100"}
              />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-5 col-6 ps-2 ms-2 me-2 d-flex">
              <CardComponent
                productTitle={"Adapt Safari Tight Shorts"}
                productRating={"4.1"}
                department={"Women"}
                manufacturer={"GymShark"}
                productPrice={"US$44"}
                productOrigPrice={"US$100"}
              />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-5 col-6 ps-2 ms-2 me-2 d-flex">
              <CardComponent
                productTitle={"Adapt Safari Tight Shorts"}
                productRating={"4.1"}
                department={"Women"}
                manufacturer={"GymShark"}
                productPrice={"US$44"}
                productOrigPrice={"US$100"}
              />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-5 col-6 ps-2 ms-2 me-2 d-flex">
              <CardComponent
                productTitle={"Adapt Safari Tight Shorts"}
                productRating={"4.1"}
                department={"Women"}
                manufacturer={"GymShark"}
                productPrice={"US$44"}
                productOrigPrice={"US$100"}
              />
            </div>
          </div>
          <div className="row text-center">
            <PaginationComponent />
          </div>
        </section>
      </div>

      <FooterComponent />
    </>
  );
}
