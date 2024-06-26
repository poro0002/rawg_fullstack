import { useState, useEffect } from "react";
import './section.css'


// handle these fetches on the backend ? 

// see game brings you to the search page for that specific game so you can fav it
// see photo opens a new browser window with the img.url src

function Section({seeGame, handleSearch}){

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
            console.log(data)

            const screenshots = await fetchScreenshots(gameId);

            // console.log(data)
            return {
                id: gameId,
                name: data.name,
                background_image: data.background_image,
                rating: data.rating,
                released: data.released,
                metacritic: data.metacritic,
                short_screenshots: screenshots,
                parent_platforms: data.parent_platforms

            };
        } catch (error) {
            console.error(`Error fetching game details for game ID ${gameId}:`, error);
            return { id: gameId, name: '', background_image: '', rating: '', released: '', metacritic: '', short_screenshots: [] };
        }
    };

       // Fetch screenshots {short_screenshots property was not present in data fetched up top}
       // so i had to do a separate fetch to a different endpoint
       const fetchScreenshots = async (gameId) => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey2}`);
            if (!response.ok) {
                throw new Error('Error with response');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error(`Error fetching screenshots for game ID ${gameId}:`, error);
            return [];
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

// console.log(sections)


const seePhoto = (src) => {
    window.open(src, '_blank');
    console.log(src);
};


const sectionDescriptions = [
  
    {
        title: 'Multiplayer Online Battle Arena (MOBA)',
        description: 'Dota 2 has a large esports scene, with teams from around the world playing in various professional leagues and tournaments. Valve organizes the Dota Pro Circuit, which are a series of tournaments that award qualification points for earning direct invitations to The International, the games premier tournament held annually. Internationals feature a crowdfunded prize money system that has seen amounts in upwards of US$40 million, making Dota 2 the most lucrative esport. Media coverage of most tournaments is done by a selection of on-site staff who provide commentary and analysis for the ongoing matches similar to traditional sporting events. In addition to playing live to audiences in arenas and stadiums, broadcasts of them are also streamed over the internet and sometimes simulcast on television, with several million in viewership numbers.',
        subtext: '-Valve-',
        href: 'https://www.dota2.com/home',
        logo: '/Content/logos/hd-dota-2-logo_full.png',
        name: "dota 2"
      },
   
    
    {
        title: 'Action Role-Playing Third-Person Shooter Multiplayer',
        description: 'The concept for Warframe originated in 2000, when Digital Extremes began work on a new game titled Dark Sector. At the time, the company had been successful in supporting other developers and publishers and wanted to develop its game in-house. Dark Sector suffered several delays and was eventually released in 2008, having used some of the initial framework but far different from the original plan. By 2012, in the wake of the success of free-to-play games, the developers took their earlier Dark Sector ideas and art assets and incorporated them into a new project, their self-published Warframe.',
        subtext: '-Digital Extremes-',
        href: 'https://www.warframe.com/landing',
        logo: '/Content/logos/warframe_full.png',
        name: "warframe"
        }
   ,

    {
        title: 'Action-Adventure Video Game',
        description: 'Announced in March 2017, the game was released worldwide for PlayStation 4, Windows, and Xbox One on October 10, 2017. Shadow of War had a generally favorable reception from critics, albeit more mixed than its predecessor. Reviewers praised the gameplay and improved nemesis system, while criticizing the games microtransactions (which was removed in a post-game update in July 2018) and story, including changes to characters seen in Tolkiens books. Many critics noted that the games increased scope caused it to feel bloated. The game was the best-selling video game in the United States in its month of release. Monolith supported the game post-launch with free updates and two story expansions.',
        subtext: '-Monolith Productions-',
        href: 'https://www.shadowofwar.com/about/',
        logo: '/Content/logos/shadow_of_war_white_full.png',
        name: "shadow of war"
      
     },

   {
        title: 'Action Role-Playing Video Game',
        description: 'The games development began following the release of Assassins Creed IV: Black Flag in 2013. Ubisoft Montreal led its four-year development with help from a team of nearly 700 people from other Ubisoft studios around the world. The team consulted Egyptologists and historians extensively to ensure the setting was authentically represented in the game. In response to the common criticism that the gameplay of the series was getting stale and overly familiar, Ubisoft decided to reinvent the Assassins Creed formula with Origins. Whereas previous entries were mainly stealth-action games, Origins introduces many elements found in role-playing games and an overhauled hitbox-based combat system. ',
        subtext: '-Ubisoft Montreal-',
        href: 'https://www.ubisoft.com/en-ca/game/assassins-creed/shadows?ucid=SCH-ID_189303&maltcode=brand_C2W_SCH_googlesearch___RED____&addinfo=&gad_source=1&gclid=Cj0KCQjw3tCyBhDBARIsAEY0XNnR6iUfrWP6kxijQ8jQV965aisB-Ugsai8lu0mdWhiuxNfUrnml58oaAifyEALw_wcB',
        logo: '/Content/logos/asc_full.png',
        name: "assasins creed origins",
        
        },  
      
];

   return(
<> 
        <video autoPlay loop muted className="background-video">
            <source src="/Content/smoke1.mov" type="video/mp4" />
          
         </video>
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
                <div className="section-info-screenshot__cont">
                      
                    <div className={`section-div__title ${index % 2 === 0 ? 'even' : 'odd'}`}>

                            <div className={`section-title-info__cont ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                <p className="section__rating">Rating: <span className="section-info__value">{section.rating}</span></p>
                                <p className="section__released">Released:  <span className="section-info__value">{section.released}</span></p>
                                <p className="section__metacritic">Metacritic: <span className="section-info__value">{section.metacritic}</span> </p>
                                <button onClick={ async() => { await handleSearch(section.name); seeGame(section);} } className="section__btn" >VIEW</button>
                                <a className="section__href" href={sectionDescriptions[index].href}>WEBSITE</a>
                            </div>

                             <div className="section-title-logo__cont">
                                <img className='section-title__logo' src={sectionDescriptions[index].logo} alt="" />
                            </div>

                     </div>

                
                        <div className={`section-info-screenshot__description ${index % 2 === 0 ? 'even' : 'odd'}`} >
                               
                                <h4 className="section-info-screenshot-description__subText">{sectionDescriptions[index].subtext}</h4>
                                <h3 className="section-info-screenshot-description__title">{sectionDescriptions[index].title}</h3>
                                <p className="section-info-screenshot-description__desc">{sectionDescriptions[index].description}</p>
                         </div>

                            <a className="section-info-screenshot__title" href="#">view all</a>
                            
                            <div className="section-info-cont">
                                <div className="section-info-screenshot__imgs">
                                        {section.short_screenshots?.map((img, index) => (
                                            <img onClick={() => seePhoto(img.image)} className="section-info-screenshot__img" key={index} src={img.image} alt={img.id} />
                                        ))}
                                </div>


                                <div className="section-result-platform-cont">
                                        {section.parent_platforms?.map((plat, index)  => {
                                            const pc = plat.platform.name === "PC";
                                            const ps = plat.platform.name === "PlayStation";
                                            const xbox = plat.platform.name === "Xbox";
                                            const nin = plat.platform.name === "Nintendo";
                                            const ios = plat.platform.name === "iOS";

                                            const formattedName = encodeURIComponent(section.name)
                                           
                                            return (
        
                                                   <>
                                                        {pc && (
                                                           <a href={`https://store.steampowered.com/search/?term=${formattedName}`} key={index} className="section-store__btn" target="_blank" rel="noopener noreferrer">
                                                              <span className="text">Buy Now</span><img src="/Content/logos/steam.png" alt="PC" />
                                                          </a>
                                                        )}
                                                        {xbox && (
                                                            <a href={`https://www.xbox.com/en-ca/Search/Results?q=${formattedName}`} key={index} className="section-store__btn" target="_blank" rel="noopener noreferrer">
                                                            <span className="text">Buy Now</span><img src="/Content/logos/xbox_logo_icon_206631.png" alt="Xbox" />
                                                            </a>
                                                        )}
                                                        {ps && (
                                                            <a href={`https://store.playstation.com/en-ca/search/${formattedName}`} key={index} className="section-store__btn" target="_blank" rel="noopener noreferrer">
                                                            <span className="text">Buy Now</span><img src="/Content/logos/playstation-logo_icon-icons.com_57094.png" alt="PlayStation" />
                                                            </a>
                                                        )}
                                                         {nin && (
                                                            <a href={`https://www.nintendo.com/us/store/products/${section.name.toLowerCase()}-switch/`} key={index} className="section-store__btn" target="_blank" rel="noopener noreferrer">
                                                            <span className="text">Buy Now</span><img src="/Content/logos/nintendo_logo_icon_145030.png" alt="nintendo" />
                                                            </a>
                                                        )}
                                                          {ios && (
                                                            <a href={`https://www.apple.com/ca/search/${formattedName}?src=globalnav`} key={index} className="section-store__btn" target="_blank" rel="noopener noreferrer">
                                                            <span className="text">Buy Now</span><img src="/Content/logos/ios_white.png" alt="ios" />
                                                            </a>
                                                        )}
                                            
                                                </>
                                            );
                                         })}


                                    </div>
                              </div> 
                    </div>

         
     
                </div>
               
            </div>
                
            ))}
             <a className="section-totop__btn" href="#"><i className="material-icons">keyboard_arrow_up</i>To Top</a>
    </section>
    </>
    
   )
 
}



export default Section