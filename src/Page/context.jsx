/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { FetchData } from './data';

const initialJBState = {
    dataAkun: [],
    handleAddAkun: () => { },
    fetchDataAkun: () => { },
    handleEditFormContex: () => { },
    handleDeleteContext: () => { },
};

const JBContext = createContext(initialJBState);

const useJB = () => useContext(JBContext);

const JBProvider = ({ children }) => {
    const [dataAkun, setDataAkun] = useState([]);

    const fetchDataAkun = async () => {
        const storedData = localStorage.getItem('dataAkun');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setDataAkun(parsedData);
        } else {
            const apiCall = await FetchData();
            const { data } = apiCall;
            setDataAkun(data);
            localStorage.setItem('dataAkun', JSON.stringify(data));
        }
    };

    const handleAddAkun = (newAkun) => {
        setDataAkun(prevDataAkun => [...prevDataAkun, newAkun]);
        localStorage.setItem('dataAkun', JSON.stringify([...dataAkun, newAkun]));
    };

    const handleEditFormContex = (updatedAkun) => {
        setDataAkun(prevDataAkun => {
            const updatedData = prevDataAkun.map(akun => {
                if (akun.id === updatedAkun.id) {
                    return {
                        ...akun,
                        nickname: updatedAkun.nickname,
                        email: updatedAkun.email,
                        password: updatedAkun.password,
                        harga: Number(updatedAkun.harga), 
                        jenisGame: updatedAkun.jenisGame,
                        loginVia: updatedAkun.loginVia 
                    };
                }
                return akun;
            });
            localStorage.setItem('dataAkun', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    const handleDeleteContext = (id) => {
        setDataAkun(prevDataAkun => {
            const updatedData = prevDataAkun.filter(akun => akun.id !== id);
            localStorage.setItem('dataAkun', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    useEffect(() => {
        fetchDataAkun();
    }, []);

    return (
        <JBContext.Provider value={{ fetchDataAkun, handleAddAkun, handleEditFormContex, handleDeleteContext, dataAkun }}>
            {children}
        </JBContext.Provider>
    );
};

export { JBProvider, useJB };