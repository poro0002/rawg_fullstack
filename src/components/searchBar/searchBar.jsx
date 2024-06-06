import { useState, useEffect } from "react"
import "./searchBar.css"
import Section from '../Section/section'



function SearchBar({setResults, setSearchVal, searchVal, handleSearch, wikiData}){

    const isSearchPage = window.location.pathname === '/search';



  
let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002'

let baseUrl = 'http://localhost:3500/';
let apiUrl = baseUrl + '/api/games';


const queryParams = new URLSearchParams();
queryParams.append('type', 'searchBar');
const queryString = queryParams.toString();


    let apiKey = "29c74353cb064147baadabe161a31ef5"
    
    const myHeaders = new Headers({'Content-Type': 'image/jpeg'});
    const mainRequest = new Request(`${baseUrl}api/games?key=${apiKey2}&search=${encodeURIComponent(searchVal)}&page_size=1&${queryString}`, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
    });
     

    function handleChange(e){

        setSearchVal(e.target.value);
      
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      };

   


    async function handleSubmit(e) {
        e.preventDefault();
  
        try {
            const response = await fetch(mainRequest);
            if (!response.ok) {
                throw new Error('Error with response');
            }
            
            const data = await response.json();
            console.log(data.results);

            setResults(data.results);
            localStorage.setItem('searchResults', JSON.stringify(data.results[0]));

            const wikiRes = await handleSearch(e.target.value);
            localStorage.setItem('wikiData', JSON.stringify(Object.values(wikiRes)[0])); 

            window.location.href = '/search';
        } catch (err) {
            console.log({ message: err });
        }
    }
    


   return(
        <>
    
                    <label htmlFor="input">
                        <input className="searchInput" type="text" onKeyDown={handleKeyDown}  onChange={handleChange} />
                    </label>
    
    </>
   )
}


export default SearchBar