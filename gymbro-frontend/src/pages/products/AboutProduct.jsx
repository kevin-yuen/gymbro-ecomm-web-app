import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// utils
import { handleProductsAPI } from "../../utils/productAPI";

// config
import Message from "../../config/messages.json";

// components
import ProductImageGroupComponent from "../../components/products/ProductImageGroupComponent";
import BuyComponent from "../../components/products/AboutProductDetailsComponent";
import ProductDetailsComponent from "../../components/products/ProductDetailsComponent";
import CustomerReviewsComponent from "../../components/products/ProductReviewsComponent";

import AboutProductContentWrapperComponent from "../../components/products/AboutProductContentWrapperComponent";
import ProductImageComponent from "../../components/common/ProductImageComponent";
import ThumbnailsComponent from "../../components/products/ThumbnailsComponent";
import AboutProductDetailsComponent from "../../components/products/AboutProductDetailsComponent";
import ColorPickerComponent from "../../components/common/ColorPickerComponent";
import SizePickerComponent from "../../components/common/SizePickerComponent";
import ProductDescComponent from "../../components/products/ProductDescComponent";
import ProductReviewsComponent from "../../components/products/ProductReviewsComponent";
import AboutProductCommentComponent from "../../components/products/AboutProductCommentComponent";

// mock data
import ProductInformationData from "../../config/productInformationData.json";
import CustomerReviewsData from "../../config/customerReviewsData.json";

const productNotFoundErr = Message["server-result"]["product-not-found"];
const serverErr = Message.server.generic;

const handleConstructProductDetails = (state, serverRes) => {
  const { brand } = state;

  const {
    _id,
    name,
    fitType,
    description,
    fitAndCare,
    spec,
    numOfReviews,
    options,
    originalPrice,
    discountPrice,
    clearancePercent,
  } = serverRes;

  return {
    _id,
    brand,
    name,
    fitType,
    description,
    fitAndCare,
    spec,
    numOfReviews,
    options,
    originalPrice,
    discountPrice,
    clearancePercent,
    color: options[0].color,
    size: options[0].unit[0].size,
  };
};

// About Product component starts here...
export default function AboutProduct() {
  console.log("About Product Component re-renders");

  const { pathname, state } = useLocation();

  const [productDetails, setProductDetails] = useState();

  const [fetchState, setFetchState] = useState({
    statusCode: undefined,
    isSuccess: false,
  });

  const [selectedOption, setSelectedOption] = useState();
  const [img, setImg] = useState();
  const [selColor, setSelColor] = useState();

  useEffect(() => {
    if (productDetails !== undefined) {
      setProductDetails((prevProdDetails) => ({
        ...prevProdDetails,
        selectedOption,
        color: selColor,
      }));
    }
  }, [selColor, selectedOption]);

  const handleGenerateErrorContent = (loadingStatus) => {
    if (loadingStatus.statusCode === 404 && loadingStatus.isSuccess === false) {
      return (
        <div className="position-relative mt-10">
          <div className="mt-n6 position-absolute start-45 text-danger fs-7">
            {productNotFoundErr}
          </div>
        </div>
      );
    } else if (
      loadingStatus.statusCode === 500 &&
      loadingStatus.isSuccess === false
    ) {
      return (
        <div className="position-relative mt-10">
          <div className="mt-n6 position-absolute start-45 text-danger fs-7">
            {serverErr}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    async function getProductDetailsRes() {
      const res = await handleProductsAPI(
        `/products/aboutProduct/product?productid=${state.productID}`,
        "GET"
      );

      switch (res.status) {
        case 201:
          const { productDetails: serverRes } = await res
            .json()
            .then((res) => res);

          // construct product details to display
          const productDetails = handleConstructProductDetails(
            state,
            serverRes
          );

          setProductDetails(productDetails);
          setSelectedOption(productDetails.options[0]);
          setImg(productDetails.options[0].imgSrc[0]);
          setSelColor(productDetails.color);

          setFetchState({
            statusCode: res.status,
            isSuccess: true,
          });

          break;
        case 404:
        case 500:
          setFetchState({
            statusCode: res.status,
            isSuccess: false,
          });

          break;
        default:
          break;
      }
    }

    getProductDetailsRes();
  }, []);

  return (
    <>
      {fetchState.statusCode !== 201 && !fetchState.isSuccess ? (
        handleGenerateErrorContent(fetchState)
      ) : (
        <AboutProductContentWrapperComponent
          productImageComponent={
            <ProductImageComponent
              src={img}
              height={"743.48"}
              // location={pathname}
            />
          }
          aboutProductDetailsComponent={
            <AboutProductDetailsComponent productDetails={productDetails} />
          }
          colorPickerComponent={
            <ColorPickerComponent
              productDetails={productDetails}
              pathname={pathname}
              setSelectedOption={setSelectedOption}
              setImg={setImg}
              setSelColor={setSelColor}
            />
          }
          sizePickerComponent={
            <SizePickerComponent
              productDetails={productDetails}
              pathname={pathname}
              selColor={selColor}
              selOption={selectedOption}
            />
          }
          productDescComponent={
            <ProductDescComponent
              prodDesc={productDetails.description}
              prodSpec={productDetails.spec}
              prodFitAndCare={productDetails.fitAndCare}
            />
          }
          productReviewsComponent={<AboutProductCommentComponent productId={productDetails._id} />}
        >
          <ThumbnailsComponent
            selectedOption={selectedOption}
            setImg={setImg}
          />
        </AboutProductContentWrapperComponent>
      )}
    </>
  );
}
