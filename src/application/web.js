// import express from "express";
// import { errorMiddleware } from "../middleware/error-middleware.js";
// import { siswaRouter } from "../routes/api-siswa.js";

// export const web = express();
// web.use(express.json());

// // tambahkan base route
// web.use("/api/siswa", siswaRouter);

// web.use(errorMiddleware);

import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { siswaRouter } from "../routes/api-siswa.js";

export const web = express();

// Middleware
web.use(cors({
  origin: "*",
}));

web.use(express.json());

// Base route
web.use("/api/siswa", siswaRouter);

// Error middleware
web.use(errorMiddleware);
