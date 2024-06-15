/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { FetchData } from './data';

// Initial state for member data
const initialJBState = {
    dataAkun: [],
    handleAddAkun: () => { },
    fetchDataAkun: () => { },
    handleEditFormContex: () => { },
    handleDeleteContext: () => { },
};

// Create context for cooperative members data
const JBContext = createContext(initialJBState);

// Custom hook to use cooperative members data context
const useJB = () => useContext(JBContext);

// Provider component to provide cooperative members data
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

    const handleEditFormContex = (updatedMember) => {
        console.log("Updated Member:", updatedMember); // Debugging log
        setDataAkun(prevDataAkun => {
            const updatedData = prevDataAkun.map(member => {
                if (member.id === updatedMember.id) {
                    return {
                        ...member,
                        nickname: updatedMember.nickname,
                        email: updatedMember.email,
                        password: updatedMember.password,
                        harga: Number(updatedMember.harga), // Pastikan harga adalah angka
                        jenisGame: updatedMember.jenisGame,
                        loginVia: updatedMember.loginVia // Pastikan loginVia juga diupdate
                    };
                }
                return member;
            });
            localStorage.setItem('dataAkun', JSON.stringify(updatedData));
            return updatedData;
        });
    };

    const handleDeleteContext = (id) => {
        setDataAkun(prevDataAkun => {
            const updatedData = prevDataAkun.filter(member => member.id !== id);
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