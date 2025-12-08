import joi from "joi";

// Rules
const siswaName = joi.string()
    .min(3)
    .max(100)
    .trim()
    .required()
    .messages({
        "string.min": "Nama siswa minimal 3 karakter",
        "string.max": "Nama siswa maksimal 100 karakter",   
        "string.empty": "Nama siswa harus diisi",
        "any.required": "Nama siswa harus diisi"
    });

const siswaAlamat = joi.string()
    .min(5)
    .max(250)
    .trim()
    .required()
    .messages({
        "string.min": "Alamat minimal 5 karakter",
        "string.max": "Alamat maksimal 250 karakter",
        "string.empty": "Alamat harus diisi",
        "any.required": "Alamat harus diisi"
    });

// const siswaTglLahir = joi.date()
//     .less('now') // tidak bisa dari masa depan
//     .required()
//     .messages({
//         "date.base": "Tanggal lahir harus berupa tanggal yang valid",
//         "date.less": "Tanggal lahir tidak bisa dari masa depan",
//         "any.required": "Tanggal lahir harus diisi"
//     });

const siswaJurusan = joi.string()
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
        "string.min": "Jurusan minimal 3 karakter",
        "string.max": "Jurusan maksimal 50 karakter",
        "string.empty": "Jurusan harus diisi",
        "any.required": "Jurusan harus diisi"
    });

// Create
export const createSiswaValidation = joi.object({
    nama : siswaName,
    alamat : siswaAlamat,
    // tgl_lahir : siswaTglLahir,
    jurusan : siswaJurusan
});

// GetById
export const getSiswaByIdValidation = joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
        "number.base": "Id harus berupa angka",
        "number.min": "Id minimal 1",
        "any.required": "Id harus diisi"
    });

// Update
export const updateSiswaValidation = joi.object({
    nama : siswaName.optional(),
    alamat : siswaAlamat.optional(),
    // tgl_lahir : siswaTglLahir.optional(),
    jurusan : siswaJurusan.optional()
});

