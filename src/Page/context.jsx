/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Status awal untuk context JB.
 * @type {Object}
 * @property {Array} dataAkun - Array yang berisi data akun.
 * @property {Function} handleAddAkun - Fungsi untuk menambahkan akun.
 * @property {Function} fetchDataAkun - Fungsi untuk mengambil data akun.
 * @property {Function} handleEditFormContex - Fungsi untuk mengedit akun.
 * @property {Function} handleDeleteContext - Fungsi untuk menghapus akun.
 */
const initialJBState = {
    dataAkun: [],
    handleAddAkun: () => { },
    fetchDataAkun: () => { },
    handleEditFormContex: () => { },
    handleDeleteContext: () => { },
};

/**
 * Membuat context JB.
 */
const JBContext = createContext(initialJBState);

/**
 * Hook untuk menggunakan context JB.
 * @returns {Object} - Mengembalikan nilai dari context JB.
 */
const useJB = () => useContext(JBContext);

/**
 * Penyedia context JB.
 * 
 * @param {Object} props - Properti komponen.
 * @param {React.ReactNode} props.children - Komponen anak.
 * @returns {React.Element} - Mengembalikan penyedia context JB.
 */
const JBProvider = ({ children }) => {
    const [dataAkun, setDataAkun] = useState([]);

    /**
      * Mengambil data akun dari localStorage.
      * Jika data akun tersimpan di localStorage, maka mengambil data tersebut.
      * Data yang berhasil diambil baik dari localStorage akan disimpan kembali ke state dataAkun
      */
    const fetchDataAkun = async () => {
        // Mengambil data dari localStorage dengan kunci 'dataAkun'
        const storedData = localStorage.getItem('dataAkun');

        // Jika data ada di localStorage
        if (storedData) {
            // mengubah JSON dari localStorage menjadi objek JavaScript
            const parsedData = JSON.parse(storedData);
            // memasukan data yang telah dirubah menjadi javascript kedalam state dataAkun
            setDataAkun(parsedData);
        }
    };

    /**
     * Menambahkan akun baru.
     * 
     * @param {Object} newAkun - Data akun baru.
     */
    const handleAddAkun = (newAkun) => {
        //memperbaharui state dataAkun
        //dengan mengambil data akun sebelumnya dan menambahkannya dengan data baru NewAkun
        setDataAkun(oldDataAkun => [...oldDataAkun, newAkun]);

        // menyimpan data ke localStorage
        // dengan merubah terlebih dahulu dari javascript biasa ke JSON
        localStorage.setItem('dataAkun', JSON.stringify([...dataAkun, newAkun]));
    };

    /**
     * Fungsi untuk mengedit data akun yang sudah ada.
     *
     * @param {Object} updatedAkun - Objek yang berisi data akun yang sudah diperbarui.
     * @param {number} updatedAkun.id - ID unik dari akun.
     * @param {string} updatedAkun.nickname - Nama panggilan dari akun.
     * @param {string} updatedAkun.email - Email dari akun.
     * @param {string} updatedAkun.password - Kata sandi dari akun.
     * @param {string|number} updatedAkun.harga - Harga dari akun.
     * @param {string} updatedAkun.jenisGame - Jenis game dari akun.
     * @param {string} updatedAkun.loginVia - Metode login dari akun.
     */
    const handleEditFormContex = (updatedAkun) => {
        // Memperbarui state dataAkun
        setDataAkun(oldDataAkun => {
            // Menggunakan map untuk membuat array baru
            // map akan mengembalikan nilai ke array baru
            const updatedData = oldDataAkun.map(akun => {

                //Jika akun.id cocok dengan updatedAkun.id, 
                // Maka akun yang lama akan diperbarui dengan data dari updatedAkun
                if (akun.id === updatedAkun.id) {

                    return {
                        ...akun, // Menyalin semua properti akun yang lama
                        nickname: updatedAkun.nickname, // Memperbarui nickname
                        email: updatedAkun.email, // Memperbarui email
                        password: updatedAkun.password, // Memperbarui password
                        harga: Number(updatedAkun.harga), // Memperbarui harga dan mengonversi ke tipe Number
                        jenisGame: updatedAkun.jenisGame, // Memperbarui jenisGame
                        loginVia: updatedAkun.loginVia // Memperbarui loginVia
                    };
                }
                //Jika akun.id tidak cocok dengan updatedAkun.id, 
                // Maka mengembalikan akun yang lama tanpa perubahan
                return akun;
            });

            // Menyimpan data yang diperbarui ke localStorage
            // Mengonversi array updatedData menjadi string JSON sebelum disimpan
            localStorage.setItem('dataAkun', JSON.stringify(updatedData));

            // Mengembalikan data yang diperbarui sebagai state baru
            return updatedData;
        });
    };

    /**
     * Menghapus akun dari state dataAkun berdasarkan ID.
     * 
     * @param {number} id - ID unik dari akun yang akan dihapus.
     * @returns {Array} - Mengembalikan array baru yang sudah di-update setelah menghapus akun.
     */
    const handleDeleteContext = (id) => {
        // Memperbarui state dataAkun dengan menggunakan functional update
        setDataAkun(oldDataAkun => {
            // Menggunakan metode filter untuk membuat array baru 
            // dengan memfilter data.id yang tidak sama dengan ID pada parameter.
            // dan menghilangkan data.id yang sesuai dengan id
            const hapusData = oldDataAkun.filter(akun => akun.id !== id);

            // Menyimpan array baru ke localStorage
            localStorage.setItem('dataAkun', JSON.stringify(hapusData));

            // Mengembalikan array baru tersebut untuk memperbarui state dataAkun
            return hapusData;
        });
    };


    /**
    * Mengambil data akun saat komponen pertama kali dirender.
    * 
    * `useEffect` akan menjalankan `fetchDataAkun` hanya sekali ketika komponen `JBProvider` pertama kali dimuat.
    */
    useEffect(() => {
        fetchDataAkun();
    }, []);

    /**
    * Mengembalikan komponen penyedia context `JBContext` dengan nilai-nilai yang diberikan.
    * 
    * `JBProvider` menyediakkan context kepada komponen anak yang berada di dalamnya, sehingga mereka dapat
    * mengakses dan memanipulasi data akun menggunakan fungsi yang disediakan.
    * 
    * @returns {React.Element} - Komponen penyedia context `JBContext`.
     */
    return (
        <JBContext.Provider value={{ fetchDataAkun, handleAddAkun, handleEditFormContex, handleDeleteContext, dataAkun }}>
            {children}
        </JBContext.Provider>
    );
};

export { JBProvider, useJB };
