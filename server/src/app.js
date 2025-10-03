import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import healthRouter from './routes/healthRouter.routes.js'
import userRouter from './routes/userRouter.routes.js'
import bookmarkRouter from './routes/bookmarkRouter.routes.js'

//route declaration
app.use("/api/v1/health", healthRouter)
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/bookmarks", bookmarkRouter)

export { app }