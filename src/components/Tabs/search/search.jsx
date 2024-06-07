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
const wikiDataLocal = JSON.parse(localStorage.getItem('wikiData')) || {};
const youtubeTrailerInfo = JSON.parse(localStorage.getItem('youtubeTrailer')) || {};
const pages = wikiDataLocal.query ? wikiDataLocal.query.pages : {};

const firstPage = Object.values(pages)[0] || {}; 


//this approach works because Wikipedia extracts often contain newline characters (\n) to separate paragraphs or sections of text. These newline characters act as natural delimiters, allowing us to split the text into distinct paragraphs.
const paragraphs = firstPage.extract ? firstPage.extract.split('\n') : [];


function SearchPage({handleFav, favorites, deleteFavorite}){
    const [showFullText, setShowFullText] = useState(false);

    console.log(wikiDataLocal)

    const isFavorite = (resultId) => {
        return favorites.some(favorite => favorite.id === resultId);
       };

// if the showFullText var (initially set to false) runs true in the conditional render

    const toggleShowFullText = () => {
        setShowFullText(!showFullText); // inverts the current value of showFullText
    };


   return(
       
         <div className="search-result-container">
            {storedResult &&  (
                <section className="search-result">
                    
                    <div className="search-result-card" style={{ backgroundImage: `url(${storedResult.background_image})` }}>
                   
            
                    </div>
                    <header className='search-result__header'>
                            <h1 className='search-title'>{storedResult.name}</h1>
                            <p>Released: <span className='search-result__info'>{storedResult.released}</span></p>
                            <p>Rating: <span className='search-result__rating'>{storedResult.rating}</span></p>
                            
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
                       
                        <div className="search-result-trailer__cont">
                            <iframe 
                                className="search-result__trailer"
                                src={`https://www.youtube.com/embed/${youtubeTrailerInfo.videoIds[1]}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        
                    {paragraphs.length > 0 && (
                            <div className="search-result__desc container--text">
                                <h3 className="search-result-desc__title">-{storedResult.name}-</h3>
                                <h4 className="search-result-desc__header">Game Info</h4>
                                {/* Uses the slice method to determine how many paragraphs to display. */}
                                {paragraphs.slice(0, showFullText ? paragraphs.length : 1).map((para, index) => (
                                    // Iterates over the sliced paragraphs array.
                                    // For each paragraph (para), creates a <p> element.
                                    para.length > 100 ? 
                                        <p className="search-result-desc__para" key={index}>{para}</p> : 
                                        <h3 className="search-result-desc__subheader" key={index}>{para}</h3>
                                    
                                    
                                ))}
                                {paragraphs.length > 1 && (
                                    <button onClick={toggleShowFullText} className="search-result-des__btn">
                                        {showFullText ? "Read Less" : "Read More"}
                                    </button>
                                )}
                            </div>
                        )}
                     
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