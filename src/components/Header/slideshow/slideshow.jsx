import './slideshow.css'
import { useState, useEffect } from 'react';
import Footer from '../../Footer/footer'


   let apiKey = "29c74353cb064147baadabe161a31ef5"
   let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002'
   let count = 3;


    function SlideshowHeader({handleFav, deleteFavorite, seeGame, favorites, handleSearch}){
        // console.log('handleFav prop:', handleFav);

        const [selectedPlatform, setSelectedPlatform] = useState('');
        const [selectedRating, setSelectedRating] = useState('');
        
        
        const [cards, setCards] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(100);

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
                            console.log(preData)
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

   // Pagination calcs
            const indexOfLastItem = currentPage * itemsPerPage; // multiplying the current page number by the number of items per page.
            const indexOfFirstItem = indexOfLastItem - itemsPerPage; // opposite to indexofLastItem
            const currentItems = cards.slice(indexOfFirstItem, indexOfLastItem); // just gives you the items on the current page

    // Change page
       const paginate = (pageNumber) => setCurrentPage(pageNumber); // sets what page you're on

       const totalPages = Math.ceil(cards.length / itemsPerPage); // dividing the total number of items (cards.length) by the number of items per page


       const handlePlatformChange = (e) => {
        setSelectedPlatform(e.target.value);
    };

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
    };

    const filteredCards = cards.filter(card => {
        const matchesPlatform = selectedPlatform ? card.parent_platforms.some(plat => plat.platform.name.toLowerCase() === selectedPlatform.toLowerCase()) : true;
        const matchesRating = selectedRating ? card.rating >= selectedRating : true;
        return matchesPlatform && matchesRating;
    });
            
        return (
           //  we then, map through the objects that are in that cards variable after the promises are done and build a template with the data for each one then export 
            <>
              <video autoPlay loop muted className="background-video">
               <source src="/Content/smoke1.mov" type="video/mp4" />
          
            </video>
                      
            <div className="game-filter">
                <div className="filter-item">
                    <select name="platform" id="platform" value={selectedPlatform} onChange={handlePlatformChange}>
                        <option value="">All Platforms</option>
                        <option value="pc">PC</option>
                        <option value="playstation">PlayStation</option>
                        <option value="xbox">Xbox</option>
                        <option value="nintendo">Nintendo</option>
                        <option value="iOS">iOS</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select name="rating" id="rating" value={selectedRating} onChange={handleRatingChange}>
                        <option value="">All Ratings</option>
                        <option value="4">4+</option>
                        <option value="3">3+</option>
                        <option value="2">2+</option>
                        <option value="1">1+</option>
                    </select>
                </div>
            </div>
        
                    <header className='slide-header'>
                        {filteredCards.map(card => (
                           <a className="card" onClick={async () => {
                            await handleSearch(card.name); // Wait for handleSearch to finish before redirecting
                            seeGame(card);
                               }} key={card.id}>
                                {card.trailerUrl ? (
                                    <video
                                    className='card__video'
                                    src={card.trailerUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls={false} 
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

                                <div className="cards-info-platform-cont">
                                        {card.parent_platforms.map((plat, index) => {
                                            const pc = plat.platform.name === "PC";
                                            const ps = plat.platform.name === "PlayStation";
                                            const xbox = plat.platform.name === "Xbox";
                                            const nin = plat.platform.name === "Nintendo";
                                            const ios = plat.platform.name === "iOS";

                                            return (
                                                <div className="cards-info-platform-cont__logos" key={index}>
                                                 {pc && <img src="/Content/logos/steam.png" alt="PC" />}
                                                    {ps && <img src="/Content/logos/playstation-logo_icon-icons.com_57094.png" alt="PlayStation" />}
                                                 {xbox && <img src="/Content/logos/xbox_logo_icon_206631.png" alt="Xbox" />}
                                                    {nin && <img src="/Content/logos/nintendo_logo_icon_145030.png" alt="Nintendo" />}
                                                 {ios && <img src="/Content/logos/ios_white.png" alt="ios" />}
                                               </div>
                                            );
                                         })}
                                     </div>

                                </div>
                            </a>
                            
                           
                        ))}
                    </header>

                      {/* Pagination stuff */}
                          <div className="pagination">
                               {/* creates an array from the total pages variable and maps through it, also, (_) parameter means the parameter is not used*/}
                                {[...Array(totalPages)].map((_, index) => (
                                 <button
                                     key={index + 1}
                                     onClick={() => paginate(index + 1)} // Change to the page number when the button is clicked
                                     className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                        {index + 1}    {/* display the page number starting at 1 */}
                                    </button>
                                ))}
                         </div>

                    <a className="section-totop__btn" href="#"><i className="material-icons">keyboard_arrow_up</i>To Top</a>
                <Footer></Footer>
            </>
        );
    }
    
    export default SlideshowHeader;

