import React, { useState, useEffect, useContext } from "react";
import {
  StarFill,
  EmojiFrown,
  Trash3,
  Pencil,
  Save2,
} from "react-bootstrap-icons";

// config
import Messages from "../../config/messages.json";

// context
import { AuthContext } from "../../context/AuthContextProvider";

// utils
import { handleProductsAPI } from "../../utils/productAPI";

// custom hooks
import useGenerateEditableForm from "../../hooks/useGenerateEditableForm";

const noCustomerReviewsErr = Messages["server-result"]["no-reviews"];
const serverErr = Messages.server.generic;

const handleGenerateError = (statusCode) => {
  switch (statusCode) {
    case 404:
      return <p className="text-center text-danger">{noCustomerReviewsErr}</p>;
    case 500:
      return <p className="text-center text-danger">{serverErr}</p>;
    default:
      return;
  }
};

const handleIsPostEdited_CB = (isEdited) => {
  switch (isEdited) {
    case true:
      return "edited";
    case false:
      return "posted";
    default:
      return;
  }
};

const handleCalculateMonthDiff = (
  datePosted,
  isEdited,
  handleIsPostEdited_CB
) => {
  let isPostEdited = "posted";
  if (isEdited !== undefined) isPostEdited = handleIsPostEdited_CB(isEdited);

  const monthPosted = new Date(datePosted).getMonth() + 1;
  const currentMonth = new Date().getMonth() + 1;

  const monthDifference = currentMonth - monthPosted;

  if (monthDifference === 1) {
    return `${monthDifference} month ago ${isPostEdited}`;
  } else if (monthDifference > 1) {
    return `${monthDifference} months ago ${isPostEdited}`;
  } else {
    return `This month ${isPostEdited}`;
  }
};

// Product Reviews Component starts here
const ProductReviewsComponent = ({ productId, newComment }) => {
  console.log("Product Reviews Component re-renders");

  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const [fetchState, setFetchState] = useState({
    statusCode: undefined,
    isSuccess: false,
  });

  const [customerReviews, setCustomerReviews] = useState();

  const [enableEdit, setEnableEdit] = useState({
    postID: undefined,
    enable: false,
    subject: undefined,
    comment: undefined,
  });

  const { handleGenerateEditableForm, handleUpdateComment, serverError } =
    useGenerateEditableForm(
      productId,
      enableEdit.subject,
      enableEdit.comment,
      customerReviews,
      setCustomerReviews
    );

  const handleDeleteComment = async (productId, commentId) => {
    const serverRes = await handleProductsAPI(
      `/products/deleteReview?productid=${productId}&commentid=${commentId}`,
      "DELETE"
    );

    switch (serverRes.status) {
      case 201:
        const { reviews } = await serverRes.json().then((res) => res.result);

        setCustomerReviews(reviews);
        setFetchState({
          statusCode: serverRes.status,
          isSuccess: true,
        });
        break;
      case 500:
        setFetchState({
          statusCode: serverRes.status,
          isSuccess: false,
        });

        break;
      default:
        break;
    }
  };

  const handleGenerateReadOnlyReview = (subject, comment) => {
    return (
      <>
        <p className="fs-5 custom-font-family-jersey">{subject}</p>

        <p className="ps-1 fs-8">{comment}</p>
      </>
    );
  };

  useEffect(() => {
    async function getProductReviews() {
      const res = await handleProductsAPI(
        `/products/aboutProduct/reviews?productid=${productId}`,
        "GET"
      );

      switch (res.status) {
        case 201:
          const { reviews } = await res
            .json()
            .then((res) => res.productReviews);

          setCustomerReviews(reviews);

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

    getProductReviews();
  }, [newComment]);

  return (
    <div className="fs-7">
      {fetchState.statusCode !== 201 && !fetchState.isSuccess ? (
        handleGenerateError(fetchState.statusCode)
      ) : (
        <>
          <div className="border custom-background-color-lightgrey ps-2 pt-2 pb-2 fw-bold">
            {customerReviews !== undefined && customerReviews.length} Reviews
            about this Product so far
          </div>

          {serverError ? (
            <p className="text-danger text-center mt-1">{serverErr}</p>
          ) : (
            <></>
          )}

          {customerReviews !== undefined &&
            customerReviews
              .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
              .map((review) => {
                return (
                  <div className="row border ms-2 me-2 mt-3 rounded">
                    <div className="col-sm-3 pt-2 pb-2">
                      <div className="border-end">
                        <p className="mb-1">{review.name}</p>

                        <div className="d-flex ps-1 fs-8 align-items-center">
                          <p className="pe-2">
                            {review.rating > 0 ? (
                              review.rating.toFixed(1) + " rating"
                            ) : (
                              <div className="d-flex">
                                <p className="me-2">No rating</p>
                                <EmojiFrown size={18} color="#082c54" />
                              </div>
                            )}
                          </p>
                          <p>
                            {Array(review.rating).fill(
                              <StarFill
                                size={22}
                                color="#FFBF00"
                                className="pe-1"
                              />
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-9 pt-2 pb-2 position-relative">
                      <p className="fs-9 mb-0">
                        {handleCalculateMonthDiff(
                          review.datePosted,
                          review.isEdited,
                          handleIsPostEdited_CB
                        )}

                        {authState.isAuthorized &&
                          authState.name === review.name && (
                            <div className="position-absolute start-95 top-10">
                              <Trash3
                                size={14}
                                color="#3E0957"
                                className="me-2"
                                onClick={() =>
                                  handleDeleteComment(productId, review._id)
                                }
                              />

                              {!enableEdit.enable ? (
                                <Pencil
                                  size={14}
                                  color="#3E0957"
                                  className="me-1"
                                  onClick={() =>
                                    setEnableEdit({
                                      postID: review._id,
                                      enable: true,
                                      subject: review.subject,
                                      comment: review.comment,
                                    })
                                  }
                                />
                              ) : (
                                <Save2
                                  size={14}
                                  color="#3E0957"
                                  className="me-1"
                                  onClick={() => {
                                    setEnableEdit({
                                      postID: { ...enableEdit.postID },
                                      enable: false,
                                      subject: { ...enableEdit.subject },
                                      comment: { ...enableEdit.comment },
                                    });

                                    handleUpdateComment(enableEdit.postID);
                                  }}
                                />
                              )}
                            </div>
                          )}
                      </p>

                      {enableEdit.postID === review._id && enableEdit.enable
                        ? handleGenerateEditableForm()
                        : handleGenerateReadOnlyReview(
                            review.subject,
                            review.comment
                          )}
                    </div>
                  </div>
                );
              })}
        </>
      )}
    </div>
  );
};

export default React.memo(ProductReviewsComponent);
