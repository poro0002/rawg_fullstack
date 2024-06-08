import { useState, useEffect } from "react";
import './userProfile.css'
import Footer from '../Footer/footer'
// create some javascript functionality to loop through the users favorites and display them on this page with their data


function UserProfile({favorites, deleteFavorite}){


     const user = JSON.parse(localStorage.getItem('user'));
     
     // const favoritesString = localStorage.getItem('favorites');
     // const favoritesArray = JSON.parse(favoritesString);

    //  console.log(favorites)

   return(

    <>
      <video autoPlay loop muted className="background-video">
              <source src="src/Content/smoke1.mov" type="video/mp4" />
            
          </video>
      
      <div className="container">
          
                <h3 className="userName">{user.username}</h3>
                <h3 className="fullName">{user.fullName}</h3>
                <h3 className="email">{user.email}</h3>

              <div className="favorites-container ">
                  <h4 className="favorites-container__title" >Favorites</h4>
                  {favorites.map((favorite) =>{
                      return (
                        <div className="fav-card" key={favorite.id} >
                            <img className="fav-card__img"  src={favorite.background_image} alt="" />
                            <div className="fav-card-info__cont">
                              <h3 className="fav-card__title">{favorite.name}</h3>
                              <p className="fav-card__info">{favorite.rating}</p>
                              <p className="fav-card__info">{favorite.updated}</p>
                              <button onClick={() => deleteFavorite(favorite)} className="fav-card-delete__btn"><i className="material-icons">delete</i></button>
                          </div>
                        </div>
                        )
                  })}
              </div>

          
         
      </div>
      <Footer></Footer>
    </>

   )
}

export default UserProfile