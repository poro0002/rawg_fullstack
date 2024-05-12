import { useState, useEffect } from "react"
import "./searchBar.css"
import Section from '../Section/section'



function SearchBar(props){

let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002'

const [searchVal, setSearchVal] = useState('')
const [searchResults, setResults] = useState([]);

    let apiKey = "29c74353cb064147baadabe161a31ef5"
    const myHeaders = new Headers({'Content-Type': 'image/jpeg'});
    const mainRequest = new Request(`https://api.rawg.io/api/games?key=${apiKey2}&search=${encodeURIComponent(searchVal)}&page_size=1`, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      });
     

    function handleChange(e){
        setSearchVal(e.target.value)
    }



function handleSubmit(e){
    e.preventDefault();

        fetch(mainRequest)
         .then(res => {
             if (!res.ok) {
                 throw new Error('Error with response');
             }
             return res.json();
         })
         .then(data => {
             console.log(data.results)
             setResults(data.results);
         })
         .catch(err => {
             console.log({ message: err });
         });
         
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
        
                {searchResults.length > 0 ? (
                   <Section >
                        <div className="search-result-card" style={{ backgroundImage: `url(${searchResults[0].background_image})` }}>
                            <header className='search-result__header'>
                                <h1 className='search-title'>{searchResults[0].name}</h1>
                                <p className='search-result__info'>{searchResults[0].released}</p>
                                <p className='search-result__rating'>Rating: {searchResults[0].rating}</p>
                            </header>
                        </div>
                        <div className="search-results__screenshots">
                            {searchResults[0].short_screenshots.map((img, index) => (
                                <img key={index} src={img.image} alt={img.id} />
                            ))}
                        </div>
                    </Section>
                ) : (
                    <h1>No search results found</h1>
                )}
            </div>
    </>
   )
}

export default SearchBar