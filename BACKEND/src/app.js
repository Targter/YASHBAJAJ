import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// set the limit of json data
app.use(express.json({ limit: "300kb" }));

//it parse incoming requeest with unlencode payloads and is based on bodys parser
app.use(express.urlencoded({ extended: true, limit: "300kb" }));

app.use(express.static("public"));

// allow cookies
app.use(cookieParser());

// import { Router } from "express";
import router from "./routes/user.router.js";
app.use("/", router);
export default app;
