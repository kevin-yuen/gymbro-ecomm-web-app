import React, { useState, useContext, useRef } from "react";
import { StarFill, PencilFill } from "react-bootstrap-icons";

// context
import { AuthContext } from "../../context/AuthContextProvider";

// components
import ProductReviewsComponent from "./ProductReviewsComponent";

// utils
import { handleProductsAPI } from "../../utils/productAPI";

// config
import Messages from "../../config/messages.json";

const serverErr = Messages.server.generic;
const postErr = Messages.comment.post;

const AboutProductCommentComponent = ({ productId }) => {
  console.log("About Product Comment Component re-renders");

  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const commentTitle = useRef();
  const comment = useRef();

  const [isCommentErr, setIsCommentErr] = useState();
  const [statusCode, setStatusCode] = useState();

  const [selectedRating, setSelectedRating] = useState(0);

  const [newComment, setNewComment] = useState();

  const handleError = () => {
    if (isCommentErr) {
      if (statusCode === 500) {
        return <p className="fs-8 text-danger">{serverErr}</p>
      }

      return <p className="fs-8 text-danger">{postErr}</p>
    }
  }

  const handleSendPostRequest = async () => {
    if (comment.current.value !== "") {
      const customerComment = {
        name: authState.name,
        subject: commentTitle.current.value,
        comment: comment.current.value,
        rating: selectedRating,
      };

      const commentServerRes = await handleProductsAPI(
        `/products/createReview?productid=${productId}`,
        "POST",
        JSON.stringify(customerComment)
      );

      switch (commentServerRes.status) {
        case 201:
          setNewComment(customerComment);
          setIsCommentErr(false);
          break;
        case 500:
          setIsCommentErr(true);
          setStatusCode(commentServerRes.status);
          break;
        default:
          break;
      }

      // reset all form values to default
      commentTitle.current.value = "";
      comment.current.value = "";
      setSelectedRating(0);
    } else {
      setIsCommentErr(true);
    }
  };

  return (
    <div className="mt-6 border-top">
      <h1 className="pt-3 fw-bolder fs-3 custom-font-family-teko custom-color-darkpurple">
        Customer Reviews
      </h1>

      {authState.isAuthorized ? (
        <form
          className="row mt-3 ms-2 me-2"
          onSubmit={(e) => {
            e.preventDefault();

            handleSendPostRequest();
          }}
        >
          <input
            type="text"
            className="form-control fs-8 mb-2"
            placeholder="Title"
            ref={commentTitle}
          />

          <textarea
            className="form-control fs-8"
            rows="3"
            placeholder="Share your thoughts about this product for others..."
            ref={comment}
          />

          {handleError()}

          <div className="d-flex justify-content-between mt-3 mb-5">
            <button
              type="submit"
              className="rounded ps-3 pe-3 pt-1 pb-1 custom-background-color-darkpurple custom-color-antiquewhite fw-bold fs-7 border-0"
            >
              <PencilFill size={15} color="#f8faf9" className="me-3" />
              Post my Comment
            </button>

            <p>
              {Array(5)
                .fill(true)
                .map((_, i) => (
                  <StarFill
                    size={25}
                    color={i < selectedRating ? "#FFBF00" : "#DCDCDC"}
                    className="pe-1"
                    key={i}
                    onClick={() => setSelectedRating(i + 1)}
                  />
                ))}
            </p>
          </div>
        </form>
      ) : (
        <></>
      )}

      <ProductReviewsComponent productId={productId} newComment={newComment}/>
    </div>
  );
};

export default AboutProductCommentComponent;
