import { useState, useEffect } from "react";
import './section.css'



function Section({children}){
   return(
    <section>
        <div className="container">
             {children}
         </div>
    </section>
   )
}



export default Section