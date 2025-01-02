const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const http = require("http");
const net = require("net");

// Create a database connection
mongoose
  .connect(
    "mongodb+srv://2022cs66:221135@cluster0.b8r6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();

// app.use(
//   cors({
//     origin: "https://ethereal-wear-deploy-frontend-jmwweh4xe-bismafajar816s-projects.vercel.app/",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );

// const allowedOrigins = [
//   "http://localhost:5173", // Local frontend for testing
//   //"https://ethereal-wear-deploy-frontend-jmwweh4xe-bismafajar816s-projects.vercel.app", // Old deployed frontend
//   "https://my-mern-project-frontend.vercel.app", // New deployed frontend
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true, // Allow cookies and credentials
//   })
// );

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// 
//const frontendOrigin = "https://my-mern-project-frontend-qco45xed7-bismafajar816s-projects.vercel.app";
//const frontendOrigin = "https://my-mern-project-frontend-d42lxpwwb-bismafajar816s-projects.vercel.app"
const frontendOrigin = "https://my-mern-project-frontend.vercel.app"
app.use(
  cors({
    origin: frontendOrigin, // Add your exact frontend URL here
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// const corsOptions = { origin: 'https://my-mern-project-frontend-qco45xed7-bismafajar816s-projects.vercel.app', optionsSuccessStatus: 200 // For legacy browser support }; app.use(cors(corsOptions));
// app.use(
//    cors({
//      origin: corsOptions, // Add your exact frontend URL here
//      methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
//      credentials: true, // Allow credentials (cookies, authorization headers)
//    })
//  );
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);


module.exports=app;
