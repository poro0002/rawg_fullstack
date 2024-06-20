import { useState, useEffect } from "react";
import './userProfile.css'
import Footer from '../Footer/footer'
// create some javascript functionality to loop through the users favorites and display them on this page with their data


function UserProfile({favorites, deleteFavorite, handleSearch, seeGame}){


     const user = JSON.parse(localStorage.getItem('user'));
     
     // const favoritesString = localStorage.getItem('favorites');
     // const favoritesArray = JSON.parse(favoritesString);

    //  console.log(favorites)

   return(

    <>
      <video autoPlay loop muted className="background-video">
              <source src="/Content/smoke1.mov" type="video/mp4" />
            
          </video>
      
      <div className="container">
          
                <h3 className="userName">{user.username}</h3>
                <h3 className="fullName">{user.fullName}</h3>
                <h3 className="email">{user.email}</h3>

              <div className="favorites-container ">
                  <h4 className="favorites-container__title" >Favorites</h4>
                  {favorites.map((favorite) =>{
                      return (
                        <a className="fav-card" onClick={async ()=>{ await handleSearch(favorite.name); seeGame(favorite)}} key={favorite.id} >
                            <img className="fav-card__img"  src={favorite.background_image} alt="" />
                            <div className="fav-card-info__cont">
                              <h3 className="fav-card__title">{favorite.name}</h3>
                              <p className="fav-card__info">{favorite.rating}</p>
                              <p className="fav-card__info">{favorite.updated}</p>
                              <button onClick={() => deleteFavorite(favorite)} className="fav-card-delete__btn"><i className="material-icons">delete</i></button>
                              
                          </div>

                          <div className="section-result-platform-cont">
                                        {favorite.parent_platforms?.map((plat, index,)  => {
                                            const pc = plat.platform.name === "PC";
                                            const ps = plat.platform.name === "PlayStation";
                                            const xbox = plat.platform.name === "Xbox";
                                            const nin = plat.platform.name === "Nintendo";
                                            const ios = plat.platform.name === "iOS";

                                            const formattedName = encodeURIComponent(favorite.name)
                                           
                                            return (
        
                                                   <>
                                                        {pc && (
                                                           <a href={`https://store.steampowered.com/search/?term=${formattedName}`} key={index} className="favs-plat__btn" target="_blank" rel="noopener noreferrer">
                                                              <img src="/Content/logos/steam.png" alt="PC" />
                                                          </a>
                                                        )}
                                                        {xbox && (
                                                            <a href={`https://www.xbox.com/en-ca/Search/Results?q=${formattedName}`} key={index} className="favs-plat__btn" target="_blank" rel="noopener noreferrer">
                                                            <img src="/Content/logos/xbox_logo_icon_206631.png" alt="Xbox" />
                                                            </a>
                                                        )}
                                                        {ps && (
                                                            <a href={`https://store.playstation.com/en-ca/search/${formattedName}`} key={index} className="favs-plat__btn" target="_blank" rel="noopener noreferrer">
                                                            <img src="/Content/logos/playstation-logo_icon-icons.com_57094.png" alt="PlayStation" />
                                                            </a>
                                                        )}
                                                         {nin && (
                                                            <a href={`https://www.nintendo.com/us/store/products/${favorite.name.toLowerCase()}-switch/`} key={index} className="favs-plat__btn" target="_blank" rel="noopener noreferrer">
                                                            <img src="/Content/logos/nintendo_logo_icon_145030.png" alt="nintendo" />
                                                            </a>
                                                        )}
                                                          {ios && (
                                                            <a href={`https://www.apple.com/ca/search/${formattedName}?src=globalnav`} key={index} className="favs-plat__btn" target="_blank" rel="noopener noreferrer">
                                                            <img src="/Content/logos/ios_white.png" alt="ios" />
                                                            </a>
                                                        )}
                                            
                                                </>
                                            );
                                         })}
                                   </div>
                        </a>
                        )
                  })}
              </div>

          
         
      </div>
      <Footer></Footer>
    </>

   )
}

export default UserProfile