import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import requestIp from "request-ip";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import session from "express-session";
import passport from "passport";
import { morganMiddleware } from "./config/index.js";
import { ApiError } from "./api/common/utils/ApiError.js";

const app = express();

const corsOptions = {
  origin:
    process.env.CORS_ORIGIN === "*" ? "*" : process.env.CORS_ORIGIN.split(","),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.clientIp;
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `Too many requests. Only ${options.max} requests per ${options.windowMs / 60000} minutes are allowed`
    );
  },
});

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(requestIp.mw());
app.use("/api/", limiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morganMiddleware);

//routes import
import healthRouter from "./routes/healthRouter.routes.js";
import userRouter from "./routes/userRouter.routes.js";
import bookmarkRouter from "./routes/bookmarkRouter.routes.js";

//route declaration
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);

export { app };
