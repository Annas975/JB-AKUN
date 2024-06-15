const Home = () => {
    return (
        <>
            <div className='rounded-lg text-center flex flex-col  items-center justify-center w-screen sm:mt-[0px] mt-[100px] top-[100px]'>
                <div className=' banner flex flex-col items-center w-screen bg-[#ffffff] rounded-b-lg sm:mt-[50px] mt-[0px] '>
                    <div className="bg-[#00000052] w-full h-[200px] absolute inset-0 flex flex-col items-center justify-center sm:top-[50px] top-[100px]">
                        <div className="w-full h-[200px] absolute inset-0 flex flex-col items-center justify-center top-[-20px] ">
                            <h1 className="text-[50px] text-[#FFCB05] custom-text-shadow">JB AKUN</h1>
                            <h3 className="text-[#ffffff]">AKUN GAME SAAT INI</h3>
                        </div>
                    </div>
                    <div className='flex flex-col items-center p-[50px] h-[30%]  mt-[100px]'>
                        <div className='flex absolute flex-wrap text-center items-center gap-3 justify-center sm:h-[100px] h-[20%] sm:w-[77%] w-[100%] p-[0px] bg-[#2D92CF] '>
                            <img className='h-[70px] w-auto rounded-sm' src="/src/assets/genshin.png" alt="" />
                            <img className='h-[70px] w-auto rounded-sm' src="/src/assets/mobileLegends.png" alt="" />
                            <img className='h-[70px] w-auto rounded-sm' src="/src/assets/PubgMobile.png" alt="" />
                            <img className='h-[70px] w-auto rounded-sm' src="/src/assets/ff.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home