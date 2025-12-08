import express from "express";
import siswaController from "../controllers/siswa-controllers.js";

const siswaRouter = express.Router();

siswaRouter.get("/", siswaController.getAll);
siswaRouter.get("/:id", siswaController.getById);
siswaRouter.post("/add", siswaController.create);
siswaRouter.put("/:id", siswaController.update);
siswaRouter.delete("/:id", siswaController.remove);

export {
    siswaRouter
} 