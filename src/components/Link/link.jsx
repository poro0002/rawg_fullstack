import { useState, useEffect } from "react";
import './link.css'



function Link({ to, children }){


   return(
  
      <a href={to}>{children}</a>
   
   
   )
}


export default Link