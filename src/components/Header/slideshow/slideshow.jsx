import '../slideshow/slideshow.css'
import { useState, useEffect } from 'react';


   let apiKey = "29c74353cb064147baadabe161a31ef5"
   let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002'
   let count = 3;
//    let searchVal = "Valorant"
   
    // const myHeaders = new Headers({'Content-Type': 'image/jpeg'});
    // const mainRequest = new Request(`https://api.rawg.io/api/games?key=${apiKey}&&page_size=50`, {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: myHeaders,
    //   });

     
      

    function SlideshowHeader({handleFav}){
        // console.log('handleFav prop:', handleFav);
        
        const [cards, setCards] = useState([]);
        const [favorites, setFavorites] = useState([]);
    
        let baseURL = 'http://localhost:3500';

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
            
            const trailerHeaders = new Headers({'Content-Type': 'application/json'})

            let baseUrl = 'http://localhost:3500/';
            let apiUrl = baseUrl + '/api/games';

            const trailerRequest = new Request(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey2}`, {
              method: 'GET',
              mode: 'cors',
              headers: trailerHeaders,
            })

        
              
           
               const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey2}`);
               if (!response.ok) {
                   throw new Error('Error with response');
               }
               const data = await response.json();
               // Assuming that the first movie in the list is the trailer
               return data.results.length > 0 ? data.results[0].data.max : ''; // Assuming 'preview' contains the trailer URL
            } 
            
    
        return (
           //  we then, map through the objects that are in that cards variable after the promises are done and build a template with the data for each one then export 
            <>
                    <header className='slide-header'>
                        {cards.map(card => (
                            <div className="card" key={card.id}>
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
                                        <button onClick={() => handleFav(card)} className="card__btn" ><i className='material-icons'>favorite</i></button>

                                </div>
                            </div>
                        ))}
                    </header>
            </>
        );
    }
    
    export default SlideshowHeader;