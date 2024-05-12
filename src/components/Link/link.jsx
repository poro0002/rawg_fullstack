import { useState, useEffect } from "react";
import './link.css'



function Link({ to, children }){


   return(
   <li>
      <a href={to}>{children}</a>
   </li>
   
   )
}


export default Link