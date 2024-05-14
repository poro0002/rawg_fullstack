import { useState, useEffect } from "react"
import SearchBar from '../../searchBar/searchBar'
import Section from '../../Section/section'
import Footer from '../../Footer/footer'


const storedResults = JSON.parse(localStorage.getItem('searchResults')) || [];


function SearchPage({searchResults}){
   return(
  
         <>
            {storedResults.length > 0 && (
                   <Section >
                        <div className="search-result-card" style={{ backgroundImage: `url(${storedResults[0].background_image})` }}>
                            <header className='search-result__header'>
                                <h1 className='search-title'>{storedResults[0].name}</h1>
                                <p className='search-result__info'>{storedResults[0].released}</p>
                                <p className='search-result__rating'>Rating: {storedResults[0].rating}</p>
                            </header>
                        </div>
                        <div className="search-results__screenshots">
                            {storedResults[0].short_screenshots.map((img, index) => (
                                <img key={index} src={img.image} alt={img.id} />
                            ))}
                        </div>
                    </Section>
                ) }

            <Footer></Footer>
       </>   
   
   )
}

localStorage.removeItem('searchResults');
export default SearchPage