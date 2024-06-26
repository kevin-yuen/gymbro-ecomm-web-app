import React, {useEffect} from "react";
import { Facebook, Instagram, Discord } from "react-bootstrap-icons";

// images
import visa from "../../assets/images/footer-visa.jpeg";
import mastercard from "../../assets/images/footer-mastercard.jpeg";
import americanExpress from "../../assets/images/ae-logo.png";

// components
import TrademarkComponent from "./TrademarkComponent";
import FooterLinksComponent from "../landing/FooterLinksComponent";

// custom hooks
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

export default function FooterComponent() {
  const {isUserLoggedIn, handleCurrentAuthStatus} = useHandleCurrentAuthStatus();

  useEffect(() => {
    handleCurrentAuthStatus();
  }, [])

  return (
    <footer className="container-fluid custom-background-color-antiquewhite mt-3">
      <div className="bottom-0 text-center">
      <div className="row">
        <div className="col-4">
          <h4 className="pt-3 pb-2 fs-6 fw-bolder">HELP</h4>
          <ul className="list-unstyled fs-7">
            <FooterLinksComponent destination={""} linkName={"FAQ"} />
            <FooterLinksComponent
              destination={""}
              linkName={"Delivery Information"}
            />
            <FooterLinksComponent
              destination={""}
              linkName={"Returns Policy"}
            />
          </ul>
        </div>
        <div className="col-4">
          <h4 className="pt-3 pb-2 fs-6 fw-bolder">MY ACCOUNT</h4>
          <ul className="list-unstyled fs-7">
            <FooterLinksComponent destination={"/auth/signin"} linkName={!isUserLoggedIn.isLoggedIn ? "Login" : "Log out"} />
            <FooterLinksComponent
              destination={"/auth/register"}
              linkName={"Register"}
            />
          </ul>
        </div>
        <div className="col-4">
          <h4 className="pt-3 pb-2 fs-6 fw-bolder">PAGES</h4>
          <ul className="list-unstyled fs-7">
            <FooterLinksComponent destination={""} linkName={"About GymBro"} />
          </ul>
        </div>
      </div>
      <div className="row d-flex align-items-center">
        <div className="col-6 d-flex justify-content-start ps-7">
          <img className="pe-3" src={visa} height={25} />
          <img className="pe-2" src={mastercard} height={25} />
          <img className="pe-3" src={americanExpress} height={25} />
        </div>
        <div className="col-6 d-flex justify-content-end pe-7">
          <Facebook className="pe-3" size={40} />
          <Instagram className="pe-3" size={40} />
          <Discord className="pe-3" size={40} />
        </div>
      </div>
      <TrademarkComponent />
      </div>
    </footer>
  );
}
