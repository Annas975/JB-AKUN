import Home from "./Home";
import AddAkun from "./AddAkun";
import AkunList from "./AkunList";
import Copyright from "./Copyright";

/**
 * Komponen untuk layout utama aplikasi.
 * 
 * @returns {JSX.Element} Komponen layout utama yang menampilkan semua komponent secara urut.
 */
const MainLayout = () => {
   return (
      <>
         <Home />
         <div className="xl:mr-[200px] xl:ml-[200px] md:mr-[100px] md:ml-[100px] mr-[20px] ml-[20px]">
            <AddAkun />
         </div>
         <AkunList />
         <Copyright />
      </>
   )
}

export default MainLayout; 