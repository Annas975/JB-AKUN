import { useState, useEffect } from 'react';
import { useJB } from './context';
import { faEye, faEyeSlash, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const dataGambarGame = [
    { name: "Genshin Impact", image: "src/assets/genshin.png" },
    { name: "Mobile Legends", image: "src/assets/mobileLegends.png" },
    { name: "PUBG Mobile", image: "src/assets/PubgMobile.png" },
    { name: "Free Fire", image: "src/assets/ff.png" },
];

const loginOptions = ["Game", "Facebook", "Google", "iOS", "Tweeter", "VK", "Tiktok"];

/**
 * Komponent untuk menampilkan daftar akun
 * 
 * @returns {JSX.Element} Komponen Daftar Akun Akun
 */
const AkunList = () => {
    const { dataAkun, handleEditFormContex, handleDeleteContext } = useJB();

    const [currentId, setCurrentId] = useState(null); // ID akun yang sedang aktif
    const [searchAkun, setSearchAkun] = useState(''); // state pencarian untuk filter daftar akun
    const [currentPage, setCurrentPage] = useState(1); // Halamam saat ini yang sedang ditampilkan
    const [itemsPerPage] = useState(20); // Jumlah item per halaman
    const [showEditForm, setShowEditForm] = useState(false); // Status menampilkan form edit akun
    const [editedAkun, setEditedAkun] = useState(null); // akun yang sedang di edit
    const [nickname, setNickname] = useState(''); // State untuk nickname akun yang sedang diedit 
    const [email, setEmail] = useState(''); // State untuk email akun yang sedang diedit
    const [password, setPassword] = useState(''); // State untuk harga akun yang sedang diedit 
    const [harga, setHarga] = useState(''); // State untuk jenis game akun yang sedang diedit 
    const [jenisGame, setJenisGame] = useState(''); // State untuk email akun yang sedang diedit
    const [loginVia, setLoginVia] = useState(''); // State untuk metode login akun game yang sedang diedit
    const [dropdownJenisGameOpen, setDropdownJenisGameOpen] = useState(false); // status dropdown jenis game terbuka/tertutup
    const [viaLoginDropdownOpen, setViaLoginDropdownOpen] = useState(false); // Status dropdown metode login terbuka/tertutup

    const [filteredAkun, setFilteredAkun] = useState([]); //  Array Data akun yang sudah difilter berdasarkan pencarian
    const [showPassword, setShowPassword] = useState(false); // Status tampilan password terlihat atau tidak(******)
    const handleTogglePassword = (e) => {
        e.stopPropagation();
        setShowPassword(!showPassword);
    };

    /**
     * useEffect untuk mengatur data akun yang difilter ketika dataAkun berubah
     */
    useEffect(() => {
        setFilteredAkun(dataAkun); // Mengatur state awal dengan data akun yang diterima
    }, [dataAkun]); // Efek ini berjalan setiap kali dataAkun berubah

    /**
     * useEffect untuk memfilter data akun berdasarkan pencarian state searchAkun.
     * useEffect ini menjalankan filter setiap kali searchAkun atau dataAkun berubah:
     */
    useEffect(() => {
        // membuat object filterData
        // dan membuat data.Akun.filter() untuk memfilter data akun berdasarkan kondisi tertentu.
        const filteredData = dataAkun.filter(n => {
            return (
                // toLowerCase(): Mengubah teks menjadi huruf kecil.
                // includes(searchAkun): Mengecek apakah teks includes dalam string yang dicari.
                // jika includes maka akan difilter berdasarkan yang diinputkan 
                n.nickname.toLowerCase().includes(searchAkun) ||
                n.email.toLowerCase().includes(searchAkun) ||
                n.password.toLowerCase().includes(searchAkun) ||
                n.harga.toString().includes(searchAkun) ||
                n.jenisGame.toLowerCase().includes(searchAkun) ||
                n.loginVia.some(via => via.toLowerCase().includes(searchAkun))
            );
        });
        // setFilteredAkun(filteredData): Menetapkan data yang telah difilter ke dalam state filteredAkun.
        setFilteredAkun(filteredData);
    }, [searchAkun, dataAkun]); // menjalankan ulang useEffect setiap kali searchAkun atau dataAkun berubah

    /**
     * Handler untuk mengubah urutan data berdasarkan harga.
     * 
     * @param {event} event Event dari select untuk pengurutan
     */
    const handleSortChange = (event) => {
        const sortOption = event.target.value;  // Mengambil value dari pilihan option  yang dipilih
        let sortedData;
        if (sortOption === 'highest') {
            // jika sortOption value-nya adalah highest
            sortedData = [...filteredAkun].sort((a, b) => b.harga - a.harga); // Akan mengurutkan berdasarkan harga tertinggi 
        } else if (sortOption === 'lowest') {
            // jika sortOption value-nya adalah lowest
            sortedData = [...filteredAkun].sort((a, b) => a.harga - b.harga); // Akan Mengurutkan berdasarkan harga terendah
        }
        setFilteredAkun(sortedData); // Mengatur ulang state dengan data yang telah diurutkan
    };

    /**
     * Handler untuk memperbarui nilai pencarian state searchAkun
     * 
     * @param {event} event event dari input pencarian 
     */
    const handleSearch = (event) => {
        // event.target.value mengambil value dari input
        // toLowerCase(): Mengubah nilai input menjadi huruf kecil untuk memudahkan pencarian tanpa memperhatikan huruf besar/kecil.
        const searchDataAkun = event.target.value.toLowerCase();
        // Mengubah state searchAkun dengan value input yang telah diubah menjadi huruf kecil.
        setSearchAkun(searchDataAkun);
    };

    /**
     * Handler untuk mengubah metode via login pada akun yang sedang diedit.
     * 
     * @param {string} login Metode login yang dipilih
     */
    const handleLoginChange = (login) => {
        if (loginVia.includes(login)) {
            setLoginVia(loginVia.filter(item => item !== login));
        } else {
            setLoginVia([...loginVia, login]);
        }
    };

    /**
     * Handler untuk mengatur ID akun saat ini yang sedang aktif.
     * 
     * @param {number} id ID akun yang sedang di-klik
     */
    const handleClick = (id) => {
        setCurrentId(id);
    };

    /**
     * Handler untuk menyimpan perubahan pada form edit akun. 
     */
    const handleEditForm = async () => {
        if (!nickname || !email || !password || !harga) {
            return alert('semua field harus diisi')
        } else if (!jenisGame || loginVia.length === 0) {
            alert("pilih option pada dropdown!")
            return
        }

        const updatedAkun = {
            ...editedAkun,
            nickname,
            email,
            password,
            harga,
            jenisGame,
            loginVia
        };

        handleEditFormContex(updatedAkun); // Memperbarui data di context
        setShowEditForm(false); // Menutup form edit
    };

    /**
    * Handler untuk memulai proses edit pada akun berdasarkan ID.
    * Function handleEdit digunakan untuk mengisi state dengan data akun yang akan diedit dan menampilkan form edit.
    * 
    * @param {number} id ID akun yang akan diedit.
    */
    const handleEdit = (id) => {
        const akunToEdit = dataAkun.find(akun => akun.id === id);
        setEditedAkun(akunToEdit); // Menyimpan akun yang akan diedit dalam state
        setNickname(akunToEdit.nickname); // Menyimpan nickname dalam state
        setEmail(akunToEdit.email); // Menyimpan email dalam state
        setPassword(akunToEdit.password); // Menyimpan password dalam state
        setHarga(akunToEdit.harga); // Menyimpan harga dalam state
        setJenisGame(akunToEdit.jenisGame); // Menyimpan jenisGame dalam state
        setLoginVia(akunToEdit.loginVia); // Menyimpan loginVia dalam state
        setShowEditForm(true); // Menampilkan form edit
    };

    /**
     * Handler untuk menutup form edit akun.
     */
    const handleClose = () => {
        setShowEditForm(false);
    };

    /**
     * Handler untuk menghapus akun berdasarkan ID.
     * 
     * @param {number} id ID akun yang akan di hapus. 
     */
    const handleDelete = (id) => {
        // Menampilkan alert konfirmasi sebelum menghapus
        if (window.confirm("Apakah Anda yakin ingin menghapus akun ini?")) {
            // memanggil fungsi handleDeleteContext untuk menghapus akun
            handleDeleteContext(id);
        }
    }

    /**
     * Menghitung indeks item terakhir yang ditampilkan dihalaman saat ini.
     */
    const indexOfLastItem = currentPage * itemsPerPage;

    /**
     * Menghitung indeks item pertama yang ditampilkan dihalaman saat ini.
     */
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    /**
     * Mengambil data akun yang akan ditampilkan dihalaman saat ini.
     */
    const currentItems = filteredAkun.slice(indexOfFirstItem, indexOfLastItem);

    /**
     * Membuat array halaman berdasarkan jumlah data akun.
     */
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredAkun.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    /**
     * Mendapatkan elemen halaman angka berdasarkan pageNumbers.
     */
    const renderPageNumbers = pageNumbers.map(number => (
        <li
            key={number}
            className={`px-3 py-1 ${currentPage === number ?
                'bg-gray-300'
                :
                'bg-white'} border border-gray-300 cursor-pointer`}
            onClick={() => setCurrentPage(number)}
        >
            {number}
        </li>
    ));

    return (
        <div className='bg-[#99A1B7] w-full p-5'>
            <div className='flex flex-col mr-[50px] w-full gap-5 mt-[50px]'>
                <div className='bg-[#ffffff] w-full p-4 border-gray-300 rounded shadow-lg z-10'>
                    <div className='flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4'>
                        {/* Form edit ditampilkan dengan nilai yang sudah diisi sebelumnya.Pengguna dapat mengubah nilai dan menyimpan perubahan. */}
                        {showEditForm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-[#0000009f] z-50">
                                <div className="bg-white p-6 rounded shadow-lg">
                                    <button
                                        className=""
                                        onClick={handleClose}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <h1 className="text-center text-2xl font-bold text-[#2D92CF] mb-4">Edit Akun</h1>
                                    <div className="flex flex-col gap-4">
                                        <div className='flex flex-col'>
                                            <label htmlFor="">Nickname</label>
                                            <input
                                                type="text"
                                                placeholder="Nickname"
                                                className="border border-gray-300 rounded px-4 py-2"
                                                value={nickname}
                                                onChange={(e) => setNickname(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border border-gray-300 rounded px-4 py-2"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div >

                                            <div className="flex flex-col relative">
                                                <label htmlFor="">Password</label>
                                                <input className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px]"
                                                    placeholder="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <button
                                                    type="button"
                                                    className="absolute top-[70%] right-[10px] transform -translate-y-1/2 flex items-center px-3 text-[#2D92CF] focus:outline-none placeholder:Masukkan password"
                                                    onClick={handleTogglePassword}
                                                >
                                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="">Harga</label>
                                            <input
                                                type="number"
                                                placeholder="Harga"
                                                className="border border-gray-300 rounded px-4 py-2"
                                                value={harga}
                                                onChange={(e) => setHarga(Number(e.target.value))}
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="">Jenis Game</label>
                                            <div className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px] bg-white placeholder-gray-500 cursor-pointer flex items-center justify-between"
                                                //onClick untuk membuka dan menutup dropDown
                                                onClick={() => setDropdownJenisGameOpen(!dropdownJenisGameOpen)}>
                                                {/* jika true
                                                menampilkan gambar, dan nama dari object array dataGambarGame.
                                                menyamakan nama dari array dataGambarGame dengan nama dari option dropdown
                                                jika sama maka image dan nama akan tampil
                                                jika tidak dama maka akan undifined tetapi tidak menampilkan error */}
                                                {jenisGame ? (
                                                    <>
                                                        <img className="h-[24px] w-auto rounded-sm mr-2" src={dataGambarGame.find(game => game.name === jenisGame)?.image} alt={jenisGame} />
                                                        {/* menampilkan nama game yang dipilih dari option dropdown */}
                                                        {jenisGame}
                                                    </>
                                                ) : (
                                                    //jika false akan menampikan text Game
                                                    "Game"
                                                )}

                                                <span className="ml-2">{dropdownJenisGameOpen ?
                                                    //jika false akan menampikan ▲
                                                    '▲' :
                                                    //jika false akan menampikan ▼
                                                    '▼'}</span>
                                            </div>

                                            
                                            {/* jika dropdown true maka kode ini akan terbuka dan sebaliknya */}
                                            {dropdownJenisGameOpen && (
                                                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                                                    {/* option dari dropdown. jika diklik akan mengambil option name sesuai yang dipilih */}
                                                    {dataGambarGame.map((game, index) => (
                                                        <div key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                                            //menampilkan gambar game dan nama game dari object array dataGambarGame
                                                            onClick={() => { setJenisGame(game.name); setDropdownJenisGameOpen(false); }}>
                                                            <img className="h-[24px] w-auto rounded-sm mr-2" src={game.image} alt={game.name} />
                                                            {/* menangkap value nama */}
                                                            {game.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="">Via Login</label>
                                            <div className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px] bg-white placeholder-gray-500 cursor-pointer flex items-center justify-between"
                                                //onClick untuk membuka dan menutup dropDown
                                                onClick={() => setViaLoginDropdownOpen(!viaLoginDropdownOpen)}>
                                                {/* mengesting jumlah array lebih dari 0 maka akan dilakukan penambahan koma */}
                                                {loginVia.length > 0 ?
                                                    // penambahan koma pada setiap elemen yang digabungkan.
                                                    loginVia.join(', ')
                                                    :
                                                    // jika lenght nya tidak lebih dari 0
                                                    //maka akan muncul text login
                                                    "Login"}
                                                <span className="ml-2">{viaLoginDropdownOpen ?
                                                    //jika false akan menampikan ▲
                                                    '▲' :
                                                    //jika false akan menampikan ▼
                                                    '▼'}</span>
                                            </div>
                                            {viaLoginDropdownOpen && (
                                                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10 ">
                                                    {/* memanggil Array LoginOptions lalu dimap dan mengambil value Option dan index */}
                                                    {loginOptions.map((option, index) => (
                                                        <div key={index} className={`flex items-center p-2 cursor-pointer max-h-7 
                                                            ${loginVia.includes(option) ? //memastikan nilai option ada di state loginVia
                                                                'bg-[#2D92CF] text-white'  // jika ada(includes) maka bg-nya berwarna biru, dan text white
                                                                :
                                                                ''}`} // jika option tidak ada di state login Option maka akan mengemnalikan data kosomg
                                                            // onClick untuk mengirim value option ke handleLoginChange
                                                            onClick={() => handleLoginChange(option)} >
                                                            {/* menangkap value option  */}
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleEditForm}
                                            className="bg-[#2D92CF] hover:bg-[#2D92CF] text-white px-4 py-2 rounded"
                                        >
                                            Simpan Perubahan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            type="search" //type search
                            value={searchAkun} // menangkap value dan dimasukkan ke state searchAkun
                            onChange={handleSearch} // menangani perubahan dengan memanggil function handleSearch
                            placeholder="Search"
                            className='w-full p-2 rounded border border-gray-300'
                        />

                        <select
                            onChange={handleSortChange} // Mengaitkan function handleSortChange yang akan dipanggil setiap kali option dipilih dan mengambil value highest/lowest.
                            defaultValue="" // Menentukan nilai default kosong untuk elemen select.
                            className='w-full md:w-auto p-2 rounded border border-gray-300'
                        >
                            {/* Option default yang dinonaktifkan(desabled) dan digunakan sebagai placeholder. */}
                            <option value="" disabled>Sort by Harga</option>
                            {/* Option untuk menyortir berdasarkan harga tertinggi.dengan mengambil value "highest" */}
                            <option value="highest">Harga tertinggi</option>
                            {/* Option untuk menyortir berdasarkan harga tertinggi.dengan mengambil value "lowest" */}
                            <option value="lowest">Harga Terendah</option>
                        </select>
                    </div>
                </div>

                <div className='overflow-x-auto bg-[#ffffff] p-[20px] border-gray-300 rounded shadow-lg z-60'>
                    <table className='min-w-full bg-white'>
                        <thead className='bg-[#2D92CF] text-white'>
                            <tr>
                                <th className='py-2 px-4'>Nickname</th>
                                <th className='py-2 px-4'>Email</th>
                                <th className='py-2 px-4'>Password</th>
                                <th className='py-2 px-4'>Harga</th>
                                <th className='py-2 px-4'>Jenis Game</th>
                                <th className='py-2 px-4'>Login via</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((akun) => (
                                <tr
                                    key={akun.id}
                                    className={`border-b ${currentId === akun.id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-300`}
                                    onClick={() => handleClick(akun.id)}
                                >
                                    <td className='py-2 px-4'>{akun.nickname}</td>
                                    <td className='py-2 px-4'>{akun.email}</td>
                                    <td className='py-2 px-4'>{akun.password}</td>
                                    <td className='py-2 px-4'>{akun.harga.toLocaleString()}</td>
                                    <td className='py-2 px-4 mx-[30px]'>
                                        <div className='flex items-center mx-[30px]'>
                                            <img
                                                src={dataGambarGame.find(game => game.name === akun.jenisGame)?.image || '/src/assets/default.png'}
                                                alt={akun.jenisGame}
                                                className='w-12 h-12 mr-2'
                                            />
                                            <span>{akun.jenisGame}</span>
                                        </div>
                                    </td>
                                    <td className='py-2 px-4 mx-[30px]'>{(akun.loginVia) ?
                                        akun.loginVia.join(', ')
                                        :
                                        akun.loginVia}</td>
                                    <td className='py-2 flex gap-2 items-center justify-center'>
                                        <button onClick={() => handleEdit(akun.id)} className='bg-[#2D92CF] text-white px-2 py-1 rounded mx-1'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        <button onClick={() => handleDelete(akun.id)} className='bg-[#2D92CF] text-white px-2 py-1 rounded mx-1'><FontAwesomeIcon icon={faTrashCan} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <ul className="flex justify-center mt-4">
                    {renderPageNumbers}
                </ul>
            </div>
        </div>
    );
};

export default AkunList;
