import { useState, useEffect, Children } from "react"
import './home.css'
import Banner from "../../Banner/banner"
import Section from "../../Section/section"
import NavBar from "../../Navbar/navbar"
import ButtonSec from "../../ButtonSec/buttonSec"
import VideoHead from "../../Header/videoHead/videoHead"
import Footer from '../../Footer/footer'




function HomePage({seeGame, handleSearch}){


   return(
     <>
      <div className="container">
         <Section seeGame={seeGame} handleSearch={handleSearch} ></Section>

      </div>

      <Footer></Footer>
     </>
   )
}

export default HomePage