import { useState, useEffect } from "react"
import "./searchBar.css"
import Section from '../Section/section'



function SearchBar({setResults, setSearchVal, searchVal, setIfSearched }){

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



function handleSubmit(e){
    e.preventDefault();
    // window.location.href = '/search';

    setIfSearched(true)
    localStorage.removeItem('searchResults');
  
       
        fetch(mainRequest)
         .then(res => {
             if (!res.ok) {
                 throw new Error('Error with response');
             }
             return res.json();
         })
         .then(data => {
             console.log(data.results)
             setResults(data.results)
             localStorage.setItem('searchResults', JSON.stringify(data.results));
             
         })
         .catch(err => {
             console.log({ message: err });
         });

        setTimeout(() => {
            window.location.href = '/search';
           
        }, 500);

        
        
    }


   return(
        <>
            <div className="searchResultsContainer">
                <form className='search-bar__form' onSubmit={handleSubmit}>
                    <label htmlFor="input">
                        <input className="searchInput" type="text" onChange={handleChange} />
                    </label>
                    <button type="submit">Search</button>
                </form>
        
            </div>
    </>
   )
}


export default SearchBar