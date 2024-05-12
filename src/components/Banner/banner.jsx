import { useState, useEffect } from "react";
import "./banner.css"

function Banner({ header, para, children, alignItems }){

 
  
   return( 
      <div className="banner" >
        <header className="banner__content" style={{alignItems: alignItems}} >
            <h1 className="banner__header">{header}</h1>
            <p className="banner__para">{para}</p>
             {children} 
         </header> 
      </div>
   )
}

export default Banner;

