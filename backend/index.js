const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// for hosting on Vercel
app.use(
  cors({
    origin: ["https://gymbro-ecomm-web-app-frontend.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);

// middleware
app.use(express.json());

// routes
app.use("/users", require("./src/routes/user"));
app.use("/products", require("./src/routes/product"));
app.use("/products", require("./src/routes/review"));
app.use("/shoppingbag", require("./src/routes/shoppingBag"));
app.use("/stripe", require("./src/routes/stripe"));

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log("Error in connecting to MongoDB:", error.message);
  });

// start the server
//const port = process.env.PORT || 4000;  // for development environment
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
