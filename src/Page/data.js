/**
 * Sebuah array kosong yang akan digunakan untuk menyimpan data.
 * @type {Array}
 */
const data = [];

/**
 * Fungsi asinkron untuk mengambil data.
 * @async  
 * @function Fungsi ini mengembalikan sebuah objek yang berisi properti `data`,
 * @returns {Promise<Object>} Sebuah (Promise) yang akan menghasilkan objek dengan properti `data`.
 */

export const FetchData = async () => {
    return {
        data: data,
    };
};