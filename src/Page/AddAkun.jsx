import { useState } from "react";
import { useJB } from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AddAkun = () => {
    const { handleAddAkun } = useJB();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [harga, setHarga] = useState('');
    const [jenisGame, setJenisGame] = useState('');
    const [nickname, setNickname] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginVia, setLoginVia] = useState('');
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState();

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = (e) => {
        e.stopPropagation(); 
        setShowPassword(!showPassword);
    };

    const predefinedGames = [
        { name: "Genshin Impact", image: "./src/assets/genshin.png" },
        { name: "Mobile Legends", image: "./src/assets/mobileLegends.png" },
        { name: "PUBG Mobile", image: "./src/assets/PubgMobile.png" },
        { name: "Free Fire", image: "./src/assets/ff.png" },
    ];

    const loginOptions = ["Game", "Facebook", "Google", "iOS", "Tweeter", "VK", "Tiktok"];

    const handleGameChange = (game) => {
        setJenisGame(game);
        setDropdownOpen(false);
    };

    const handleLoginChange = (login) => {
        if (loginVia.includes(login)) {
            setLoginVia(loginVia.filter(item => item !== login));
        } else {
            setLoginVia([...loginVia, login]);
        }
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password || !harga || !nickname) {
            alert("Semua inputan harus diisi!");
            return;
        } else if (!jenisGame || loginVia.length === 0) {
            alert("Pilih option terlebih dahulu");
            return;
        }

        const newAkun = {
            nickname,
            email,
            password,
            harga: parseFloat(harga),
            jenisGame,
            loginVia,
            id: Math.random().toString(36).substring(2, 9), 
        };

        try {
            await handleAddAkun(newAkun);
            setNickname('');
            setEmail('');
            setPassword('');
            setHarga('');
            setJenisGame('');
            setLoginVia([]);
        } catch (error) {
            console.error('Error while adding new akun:', error);
        }
    };

    return (
        <div className="flex flex-col justify-between w-[100%] h-[50%] mb-[50px] pr-[30px] sm:mt-[80px] mt-[250px] ">
            <form className="flex flex-col gap-4 w-full p-[20px] bg-[#ffffff] m-[20px]  border-gray-300 rounded shadow-lg z-10" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <div className="p-4 flex  justify-center">
                        <h1>Tambah Akun</h1>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 w-[50%]">
                        <div className="flex flex-col">
                        <label className="flex" htmlFor=""><p className="text-[#f00]">*</p>Email</label>
                            <input className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px]" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col relative">
                        <label className="flex" htmlFor=""><p className="text-[#f00]">*</p>Password</label>
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
                        <div className="relative flex flex-col">
                        <label className="flex" htmlFor=""><p className="text-[#f00]">*</p>Via Login</label>
                            <div className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px] bg-white placeholder-gray-500 cursor-pointer flex items-center justify-between" onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}>
                                {loginVia.length > 0 ? loginVia.join(', ') : "Login"}
                                <span className="ml-2">{isDropdownOpen ? '▲' : '▼'}</span>
                            </div>
                            {loginDropdownOpen && (
                                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                                    {loginOptions.map((option, index) => (
                                        <div key={index} className={`flex items-center p-2 cursor-pointer max-h-7 hover:bg-[#8CD2FD] ${loginVia.includes(option) ? 'bg-[#2D92CF] text-white' : ''}`} onClick={() => handleLoginChange(option)} >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex flex-col w-[50%]">
                    <label className="flex" htmlFor=""><p className="text-[#f00]">*</p>Nickname</label>
                    <div className="flex flex-col gap-4 w-[100%]">
                   
                        <div>
                            <input className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px]" placeholder="Nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                        <label className="flex" htmlFor=""><p className="text-[#f00]">*</p>Harga</label>
                            <input className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px]" placeholder="Harga" type="number" value={harga} onChange={(e) => setHarga(e.target.value)} />
                        </div>
                        <div className="relative flex flex-col">
                        <label className="flex" htmlFor=""><p className="text-[#f00]">*</p>Jenis Game</label>
                            <div className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px] bg-white placeholder-gray-500 cursor-pointer flex items-center justify-between" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {jenisGame ? (
                                    <>
                                        <img className="h-[24px] w-auto rounded-sm mr-2" src={predefinedGames.find(game => game.name === jenisGame)?.image} alt={jenisGame} />
                                        {jenisGame}
                                    </>
                                ) : (
                                    "Game"
                                )}
                                <span className="ml-2">{dropdownOpen ? '▲' : '▼'}</span>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                                    {predefinedGames.map((game, index) => (
                                        <div key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleGameChange(game.name)}>
                                            <img className="h-[24px] w-auto rounded-sm mr-2" src={game.image} alt={game.name} />
                                            {game.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
                <button className="bg-gradient-to-r from-[#2DAAE1] to-[#2D92CF] p-[10px] w-full h-[40px] overflow-hidden text-[#ffffff] rounded-md" type="submit">Kirim</button>
            </form>
        </div>
    );
};

export default AddAkun;
