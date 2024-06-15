
import Game from "./game";
import Section3 from "./section3"
import Section4 from "./section4";
import Section5 from "./section5"
const MainLayout = () => {
   return (
      <>
         <Game />
         <div className="xl:mr-[200px] xl:ml-[200px] md:mr-[100px] md:ml-[100px] mr-[20px] ml-[20px]">
            <Section3 />
         </div>
         <Section4 />
         <Section5 />
      </>
   )

}

export default MainLayout; 