import { useState, useEffect } from "react";
import './section.css'




function Section({seeGame}){

    const [sections, setSections] = useState([]);

    let baseURL = 'http://localhost:3500/';
    let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002';

    const specificGameIDs = [10213, 21, 25, 28153];

    // ------------------------------< Main  Fetch >--------------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const sectionsWithData = await Promise.all(specificGameIDs.map(async (gameId) => {
                    try {
                        const trailerUrl = await fetchTrailer(gameId);
                        const gameDetails = await fetchGameDetails(gameId);
                        return { ...gameDetails, trailerUrl };
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        return { id: gameId, name: '', background_image: '', rating: '', trailerUrl: '' };
                    }
                }));
                setSections(sectionsWithData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Fetch game details
    const fetchGameDetails = async (gameId) => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey2}`);
            if (!response.ok) {
                throw new Error('Error with response');
            }
            const data = await response.json();
            return {
                id: gameId,
                name: data.name,
                background_image: data.background_image,
                rating: data.rating,
            };
        } catch (error) {
            console.error(`Error fetching game details for game ID ${gameId}:`, error);
            return { id: gameId, name: '', background_image: '', rating: '' };
        }
    };

    // Fetch trailer
    const fetchTrailer = async (gameId) => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey2}`);
            if (!response.ok) {
                throw new Error('Error with response');
            }
            const data = await response.json();
            return data.results.length > 0 ? data.results[0].data.max : '';
        } catch (error) {
            console.error(`Error fetching trailer for game ID ${gameId}:`, error);
            return '';
        }
    };




   return(
<> 
<section >
            {sections.map((section, index) => (
               
                    <div className="section__div" key={section.id}>
                        {section.trailerUrl ? (
                            <video
                                className='section__video'
                                src={section.trailerUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls={false}
                            />
                        ) : (
                            <img
                                className='section__img'
                                src={section.background_image}
                                alt={section.name}
                            />
                        )}
                        <div className={`section-info__cont ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            <h1 className='section__title'>{section.name}</h1>
                            <p className="section__rating">Rating: {section.rating}</p>
                            <button onClick={() => seeGame(section)} className="section__btn" >View</button>
                        </div>
                    </div>
               
            ))}
             </section>
        </>
    
   )
}



export default Section