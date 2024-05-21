import { useState, useEffect } from "react";
import './section.css'




function Section({seeGame}){

    const [sections, setSections] = useState([]);

    let baseURL = 'http://localhost:3500/';
    let apiKey2 = 'e8cc02aadccc4a1ebbbf7e8aa5df1002';

    const specificGameIDs = [10213, 766, 25, 28153];

    // ------------------------------< Main  Fetch >--------------------------------

    // use effect code runs after the initial render of the jsx component 
    // wil this work offline ?
    useEffect(() => {
        const fetchData = async () => {
            try {                                         // loop through each ID and apply it
                const sectionsWithData = await Promise.all(specificGameIDs.map(async (gameId) => {
                    try {
                        const trailerUrl = await fetchTrailer(gameId); // fetch with that current indexed ID
                        const gameDetails = await fetchGameDetails(gameId); // do the same with the details
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
                released: data.released,
                metacritic: data.metacritic,
                short_screenshots: data.short_screenshots
            };
        } catch (error) {
            console.error(`Error fetching game details for game ID ${gameId}:`, error);
            return { id: gameId, name: '', background_image: '', rating: '', released: '', metacritic: '', short_screenshots: [] };
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

console.log(sections)


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
                            <p className="section__rating">Rating: <span className="section-info__value">{section.rating}</span></p>
                            <p className="section__released">Released:  <span className="section-info__value">{section.released}</span></p>
                            <p className="section__metacritic">Metacritic: <span className="section-info__value">{section.metacritic}</span> </p>
                            <button onClick={() => seeGame(section)} className="section__btn" >View</button>
                        </div>

                        <div className="section-info-screenshot__cont">
                            {section.short_screenshots?.map((img, index) => (
                                    <img key={index} src={img.image} alt={img.id} />
                                ))}
                        </div>
                    </div>
               
            ))}
             </section>
        </>
    
   )
}



export default Section