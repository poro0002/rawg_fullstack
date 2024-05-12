// import {useState, useEffect} from "react"


function Input({type, name, value, label, onChange}){
    return(
       <>
        <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
    </>
    )
}




export default Input