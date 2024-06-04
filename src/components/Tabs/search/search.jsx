import { useState, useEffect } from "react"
import SearchBar from '../../searchBar/searchBar'
import Section from '../../Section/section'
import Footer from '../../Footer/footer'
import Container from '../../Container/container'
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




const storedResult = JSON.parse(localStorage.getItem('searchResults')) || null;


function SearchPage({handleFav, favorites, wikiData, deleteFavorite}){

    console.log(wikiData)

    const isFavorite = (resultId) => {
        return favorites.some(favorite => favorite.id === resultId);
       };


   return(
       
         <div className="search-result-container">
            {storedResult &&  (
                <section className="search-result">
                    
                    <div className="search-result-card" style={{ backgroundImage: `url(${storedResult.background_image})` }}>
                        <header className='search-result__header'>
                            <h1 className='search-title'>{storedResult.name}</h1>
                            <p className='search-result__info'>{storedResult.released}</p>
                            <p className='search-result__rating'>Rating: {storedResult.rating}</p>
                            {isFavorite(storedResult.id) ? (
                                    <button onClick={(event) => { event.stopPropagation(); deleteFavorite(storedResult);  }} className="card-btn__close">
                                      <i className='material-icons'>delete</i>
                                    </button>
                                    ) : (
                                     <button onClick={(event) => { event.stopPropagation(); handleFav(storedResult); }} className="card-btn__like">
                                        <i className='material-icons'>favorite</i>
                                   </button>
                                 )}
                        </header>
                    </div>
                    <div className="search-results__screenshots">
                        {storedResult.short_screenshots.map((img, index) => (
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