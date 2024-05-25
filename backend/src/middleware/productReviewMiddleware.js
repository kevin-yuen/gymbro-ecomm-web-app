const productReviewMiddleware = async (req, _, next) => {
    // record current date
  req.body.datePosted = new Date();

  next();
};

module.exports = { productReviewMiddleware };
