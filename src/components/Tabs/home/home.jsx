import { useState, useEffect, Children } from "react"
import Banner from "../../Banner/banner"
import Section from "../../Section/section"
import NavBar from "../../Navbar/navbar"
import ButtonSec from "../../ButtonSec/buttonSec"
import VideoHead from "../../Header/videoHead/videoHead"
import Footer from '../../Footer/footer'



const topMeasurements = {
   mobile1: "21%",
   pc1: "45%",
   mobile2: "49.5%",
   pc2: "134%",
   mobile3: "84.5%",
   pc3: "235%",
   mobile4: "113.2%",
   pc4: "324%",
}

 const videos = {
     url1: "https://www.youtube.com/embed/ZHhqwBwmRkI?autoplay=1&controls=0&showinfo=0&loop=1&playlist=ZHhqwBwmRkI&modestbranding=1&mute=1&vq=hd1080",

 }

 // sections use a container which will cause centering and padding in which we don't want in the background photos
 // find a way to use the properties on a different plane so the photos sit correctly as the backdrop




 const bannerProps = [
   {
      header: 'STILL HERE | SEASON 2024',
      para: 'With a brand new map, new monsters and a massive item overhaul there is a lot to learn and a week before the LEC starts the team was still getting to grips with the biggest changes.',
      btn1Text: 'Pre Purchase Today',
      btn2Text: 'Learn More',
      bkgd: "src/Content/bkgd1.jpg",
   },
   {
      header: 'Discover New Season',
      para: 'See patches, updates, strats and more! See patches, updates, strats and more!See patches, updates, strats and more!',
      btn1Text: 'Battle Pass',
      btn2Text: 'Learn More',
      bkgd: "src/Content/bkgd6.jpg",
   },
   {
      header: 'Check Out Our Champions',
      para: 'Illaoi Skins have been revitalized Illaoi Skins have been revitalized Illaoi Skins have been revitalized Illaoi Skins have been revitalized',
      btn1Text: 'Show Skins',
      btn2Text: 'Learn More',
      bkgd: "src/Content/bkgd4.jpg",
   },
   {
      header: 'Are You Fit To Compete?',
      para: 'Start Your Own Team And Find Like-minded Players Here Start Your Own Team And Find Like-minded Players Here Start Your Own Team And Find Like-minded Players Here',
      btn1Text: 'Sign Up',
      btn2Text: 'Learn More',
      bkgd: "src/Content/bkgd6.jpeg",
   }
];

function HomePage(){

   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         window.innerWidth >= 600 ? setIsMobile(true) : setIsMobile(false);
         console.log(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }),[]; 

   return(
      <>
           
   <VideoHead videoUrl={videos.url1}></VideoHead>
      <main>
         {bannerProps.map((props, index) => (
            <Section key={index}>
               <Banner alignItems={index % 2 === 0 ? "flex-start" : "flex-end"} header={props.header} para={props.para}>
                  <ButtonSec>{props.btn1Text}</ButtonSec>
                  <ButtonSec>{props.btn2Text}</ButtonSec>
                 
               </Banner>
               <VideoHead imgUrl={props.bkgd} topPosition={isMobile ? topMeasurements[`mobile${index + 1}`] : topMeasurements[`pc${index + 1}`]} />
              
               
            </Section>
         ))}
         </main>
         <Footer></Footer>  
      </>
   )
}

export default HomePage