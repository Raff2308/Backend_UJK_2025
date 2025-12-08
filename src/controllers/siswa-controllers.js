import siswaService from "../services/siswa-service.js";
// import { ResponseError } from "../error/response-error.js";

const create = async (req, res, next) => {
    try {
        const result = await siswaService.create(req.body);
        res.status(201).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const result = await siswaService.getAll();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getById = async (req, res, next) => {
    try {
        const result = await siswaService.getbyId(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const request = {
            id: req.params.id, // Ambil id dari URL
            ...req.body // Ambil data dari body
        };
        
        const result = await siswaService.update(request);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await siswaService.remove(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

export default {
    create,
    getAll,
    getById,
    update,
    remove
}