import './slideshow.css'
import { useState, useEffect } from 'react';
import Footer from '../../Footer/footer'


   let apiKey = "29c74353cb064147baadabe161a31ef5"
   let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002'
   let count = 3;


    function SlideshowHeader({handleFav, deleteFavorite, seeGame, favorites, setFavorites}){
        // console.log('handleFav prop:', handleFav);
        
        
        const [cards, setCards] = useState([]);

         // Determine base URL based on environment
         const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3500';

        const queryParams = new URLSearchParams();
        queryParams.append('type', 'slideshowHeader');
        const queryString = queryParams.toString();
    
        useEffect(() => {
            const fetchData = () => {
                if (navigator.onLine) {
                    // If online, fetch data from the server
                    fetch(`${baseURL}/api/games?${queryString}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error with response');
                            }
                            
                            return response.json();
                        })
                        .then(preData => {
                            // Process the JSON data and update state
                            const cardsWithData = Promise.all(preData.results.map(async (card) => {
                                try {
                                    const trailerUrl = await fetchTrailer(card.id);
                                    // console.log(trailerUrl)
                                    return { ...card, trailerUrl };
                                } catch (error) {
                                    console.error('Error fetching trailer:', error);
                                    
                                    // Handle the error, e.g., return a default value or skip this card
                                    return { ...card, trailerUrl: '' }; // Assuming empty string as default trailer URL
                                }
                            }));
                            return cardsWithData;
                        })
                        .then(cardsWithData => {
                            setCards(cardsWithData);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                } else {
                    // If offline, fetch data from the cache
                    caches.open('dynamic').then(cache => {
                        // make sure to include baseurl here, not just endpoint
                        // make sure to turn on update on reload 
                        cache.match(baseURL + '/api/games').then(response => {
                            if (response) {
                                return response.json().then(preData => {
                                    // Process the JSON data and update state
                                    const cardsWithData = Promise.all(preData.results.map(async (card) => {
                                        try {
                                            const trailerUrl = await fetchTrailer(card.id);
                                            
                                            return { ...card, trailerUrl };
                                           
                                        } catch (error) {
                                            console.error('Error fetching trailer:', error);
                                            // Handle the error, e.g., return a default value or skip this card
                                            return { ...card, trailerUrl: '' }; // Assuming empty string as default trailer URL
                                        }
                                    }));
                                    return cardsWithData;
                                }).then(cardsWithData => {
                                    setCards(cardsWithData);
                                });
                            } else {
                                throw new Error('Data not found in cache');
                            }
                        }).catch(error => {
                            console.error('Error fetching data from cache:', error);
                        });
                    });
                }
            };
    
            fetchData();
    
        }, []);
        
    
        const fetchTrailer = async (gameId) => {
        

            let baseUrl = 'http://localhost:3500/';
            let apiUrl = baseUrl + '/api/games';

               const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey2}`);
               if (!response.ok) {
                   throw new Error('Error with response');
               }
               const data = await response.json();
               // Assuming that the first movie in the list is the trailer
               return data.results.length > 0 ? data.results[0].data.max : ''; // Assuming 'preview' contains the trailer URL
            } 

         
            
         const isFavorite = (cardId) => {
             return favorites.some(favorite => favorite.id === cardId);
            };
            
        return (
           //  we then, map through the objects that are in that cards variable after the promises are done and build a template with the data for each one then export 
            <>
              <video autoPlay loop muted className="background-video">
               <source src="/Content/smoke1.mov" type="video/mp4" />
          
            </video>
        
                    <header className='slide-header'>
                        {cards.map(card => (
                            <a className="card" onClick={() => seeGame(card)} key={card.id}>
                                {card.trailerUrl ? (
                                    <video
                                    className='card__video'
                                    src={card.trailerUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls={false} // Hiding the controls
                                />
                                ) : (
                                    <img
                                        className='card__img'
                                        src={card.background_image}
                                        alt={card.name}
                                    />
                                )}
                                <div className="card-info__cont">
                                        <h1 className='card__title'>{card.name}</h1>
                                        <p className="card__rating">Rating: {card.rating}</p>
                                        <p className="card__updated">Version: {card.version}</p> 
                                        {isFavorite(card.id) ? (
                                            <button onClick={(event) => { event.stopPropagation(); deleteFavorite(card);  }} className="card-btn__close">
                                            <i className='material-icons'>delete</i>
                                            </button>
                                         ) : (
                                            <button onClick={(event) => { event.stopPropagation(); handleFav(card); }} className="card-btn__like">
                                             <i className='material-icons'>favorite</i>
                                         </button>
                                         )}

                                </div>
                            </a>
                            
                           
                        ))}
                    </header>
                    <a className="section-totop__btn" href="#"><i className="material-icons">keyboard_arrow_up</i>To Top</a>
                <Footer></Footer>
            </>
        );
    }
    
    export default SlideshowHeader;

