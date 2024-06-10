import React from "react";

const CommentInputComponent = React.forwardRef((props, ref) => {
  return (
    <textarea
      class="form-control fs-8"
      rows="3"
      placeholder="Share your thoughts about this product for others..."
      ref={ref}
    />
  );
});

export default CommentInputComponent;
