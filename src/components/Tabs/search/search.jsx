import { useState, useEffect } from "react"
import SearchBar from '../../searchBar/searchBar'
import Section from '../../Section/section'
import Footer from '../../Footer/footer'
import "./search.css"

// look for games with trailers

// let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002';

//       // test fetch to find game trailers we want

//       const fetchTrailerTest = async () => {

   
 
//          try {
 
//              const response = await fetch(`https://api.rawg.io/api/games/${gameID}/movies?key=${apiKey2}`)
            
//              // if (!response.ok) {
//              //     throw new Error('Error with response');
//              // }
 
//              const data = await response.json();
             
//              console.log(data.results[0])
 
//              } catch (error) {
//                console.error('Error fetching trailer:', error);
//                return '';
//            }
                  
 
//        }
 
//        fetchTrailerTest();


const storedResults = JSON.parse(localStorage.getItem('searchResults')) || null;


function SearchPage({handleFav}){


   return(
        
         <div className="search-result-container">
            {storedResults &&  (
                <section className="search-result">
                    
                    <div className="search-result-card" style={{ backgroundImage: `url(${storedResults.background_image})` }}>
                        <header className='search-result__header'>
                            <h1 className='search-title'>{storedResults.name}</h1>
                            <p className='search-result__info'>{storedResults.released}</p>
                            <p className='search-result__rating'>Rating: {storedResults.rating}</p>
                            <button onClick={() => handleFav(storedResults)} className="search-result__btn" ><i className='material-icons'>favorite</i></button>
                        </header>
                    </div>
                    <div className="search-results__screenshots">
                        {storedResults.short_screenshots.map((img, index) => (
                            <img className="search-results-screenshots__img" key={index} src={img.image} alt={`screenshot-${index}`} />
                        ))}
                    </div>
                    
                </section>
               
            )}
            <Footer></Footer>
            
        </div>

   )
}

// localStorage.removeItem('searchResults');
export default SearchPage