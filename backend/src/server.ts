import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

// helmet, cors, rate-limit, json, errorHandler

import { env } from "./config/env.js";
const PORT = env.PORT;

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";


app.use(helmet());
app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
    })
);
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        message: {
            success: false,
            message: "Too many requests. Please try again later."
        }
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES HERE


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server start listening to PORT ${PORT}`);
});