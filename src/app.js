import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
//new
import cors from "cors";

const app = express();

// new
// app.use(cors({
//     origin: "http://localhost:5176",
//     credentials:true
// }));

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;