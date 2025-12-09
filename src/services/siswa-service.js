import {validate} from "../validation/validation.js";
import {prisma} from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

import {
    createSiswaValidation,
    getSiswaByIdValidation,
    updateSiswaValidation
} from "../validation/siswa-validation.js";

// Create Siswa
const create = async (request) => {
    const dataSiswa = validate(createSiswaValidation, {
        nama: request.nama,
        alamat: request.alamat,
        jurusan: request.jurusan
    });

    const tglLahir = new Date(request.tgl_lahir);

    return await prisma.siswa.create({
        data: {
            ...dataSiswa,
            tgl_lahir: tglLahir
        },
        select: {
            kode: true,
            nama: true,
            alamat: true,
            tgl_lahir: true,
            jurusan: true
        }
    });
};

// Get All Siswa
const getAll = async () => {
    return prisma.siswa.findMany({
        select: {
            kode: true,
            nama: true,
            alamat: true,
            tgl_lahir: true,
            jurusan: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

// Get Siswa By Id
const getbyId = async (id) => {
id = validate(getSiswaByIdValidation, id);

    const siswa = await prisma.siswa.findUnique({
        where: {kode : id},
        select: {
            kode: true,
            nama: true,
            alamat: true,
            tgl_lahir: true,
            jurusan: true
        }
    });

    if (!siswa) {
        throw new ResponseError(404, "Siswa tidak ditemukan");
    }

    return siswa;
};

// Update Siswa
const update = async (request) => {
    // Validasi Text
    const dataSiswa = validate(updateSiswaValidation, {
        nama: request.nama,
        alamat: request.alamat,
        jurusan: request.jurusan
    });

    // Validasi Id
    const siswaId = validate(getSiswaByIdValidation, request.id);

    // Cek Siswa apakah ada?
    const existingsiswa = await prisma.siswa.findUnique({
        where: {kode : siswaId}
    });

    if (!existingsiswa) {
        throw new ResponseError(404, "Siswa tidak ditemukan");
    }

    // Siapkan data update
    const data = {};

    if (dataSiswa.nama !== undefined) {
        data.nama = dataSiswa.nama;
    }

    if (dataSiswa.alamat !== undefined) {
        data.alamat = dataSiswa.alamat;
    }

    if (dataSiswa.jurusan !== undefined) {
        data.jurusan = dataSiswa.jurusan;
    }

     // Update tgl_lahir jika ada di request
    if (request.tgl_lahir) {
        data.tgl_lahir = new Date(request.tgl_lahir); // konversi string ke Date
    }

    return prisma.siswa.update({
        where: {kode: siswaId},
        data, 
        select: {
            kode: true,
            nama: true,
            alamat: true,
            tgl_lahir: true,
            jurusan: true
        }
    });
};

const remove = async (id) => {
    id = validate(getSiswaByIdValidation, id);

    // Cek data lama
    const siswa = await prisma.siswa.findUnique({ 
        where: {kode : id}
    });

    if (!siswa) {
        throw new ResponseError(404, "Siswa tidak ditemukan");
    }

    await prisma.siswa.delete({
        where: {kode : id}
    });

    return {
        message: "Siswa berhasil dihapus",
        nama: siswa.nama
    }
};

export default {
    create,
    getAll,
    getbyId,
    update,
    remove
}

