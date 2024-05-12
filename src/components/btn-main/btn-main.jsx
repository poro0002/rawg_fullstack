import './btn-main.css';
import { useState, useEffect } from 'react'


function BtnMain(){

    const [displayedKey, setDisplayedKey] = useState('');

    function displayJWT(e) {
        let array = []
            for(let i = 0; i <= 20; i++){
                let random = (Math.random() * 36 | 0).toString(36);
                array.push(random)
            }
            let key = array.join('');
        
        setDisplayedKey(key);
    }

    return (<>
        <button onClick={displayJWT} className='btn-main'>display key</button>
        {displayedKey && <p className='displayKey'>{displayedKey}</p>}
    </>)
}


export default BtnMain