// this is for Customer Review form

import React, { useState, useRef } from "react";

// utils
import { handleProductsAPI } from "../utils/productAPI";

const useGenerateEditableForm = (productId, subject, comment, customerReviews, setCustomerReviews) => {
  const titleRef = useRef();
  const commentRef = useRef();

  const [serverError, setServerError] = useState(false);

  const handleUpdateComment = async (postId) => {
    let newPostContent = { newSubjectRequest: titleRef.current.value, newCommentRequest: commentRef.current.value };
    const postUpdateRes = await handleProductsAPI(
      `/products/updateReview/${productId}/${postId}`,
      "PATCH",
      JSON.stringify(newPostContent)
    );

    switch (postUpdateRes.status) {
      case 206:
        newPostContent = await postUpdateRes.json().then(res => {
            return res.result.reviews;
        });

        const newReviews = customerReviews.filter(customerReview => {
            customerReview.isEdited = false
            return customerReview._id !== newPostContent[0]._id
        }).concat(newPostContent);
        setCustomerReviews(newReviews);

        setServerError(false);
        break;
      case 500:
        setServerError(true);
        break;
      default:
        return;
    }
  };

  const handleGenerateEditableForm = () => {
    return (
      <form className="custom-width-95 mt-1">
        <input
          type="text"
          className="form-control fs-8 mb-2 pt-0 pb-0"
          placeholder={subject}
          ref={titleRef}
        />
        <textarea
          className="form-control fs-8 pt-0 pb-0"
          rows="3"
          placeholder={comment}
          ref={commentRef}
        />
      </form>
    );
  };

  return { handleGenerateEditableForm, handleUpdateComment, serverError };
};

export default useGenerateEditableForm;
