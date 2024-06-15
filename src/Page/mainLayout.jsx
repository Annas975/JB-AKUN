import Home from "./Home";
import AddAkun from "./AddAkun";
import AkunList from "./AkunList";
import Copyright from "./Copyright";
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