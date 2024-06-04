import { useState, useEffect } from 'react'
import '../../index.css'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from '../Navbar/navbar'
import AppRouter from "../AppRouter/appRouter"
import RegisterLogForm from '../Form/register/register'
import UserProfile from '../UserProfile/userProfile'
import SlideshowHeader from '../Header/slideshow/slideshow'
import SearchPage from '../Tabs/search/search'
import HomePage from '../Tabs/home/home'
import Section from '../Section/section'




function App() {
  const [count, setCount] = useState(0)

  const isHomePage = location.pathname === '/home';
  const isBrowsePage = location.pathname === '/browse'
  const isAccountPage = location.pathname === '/register' || location.pathname === '/login'  ;
  const isSearchPage = location.pathname === '/search';

   // Manage login state in the parent component
   // if isLoggedIn is true it stores it in local storage
   const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

   const [username, setUsername] = useState("");
   const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
  //  const [buttonState, setButtonState] = useState(false); // <-------- browse card btn state ?



   // also set favorites so you can see all of them on your user profile page
   // this favorites state needs to be passed to the browse page where the favorite button will be located 
   const [favorites, setFavorites] = useState(() => {
    // Retrieve favorites from localStorage if available, or initialize an empty array
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });


// ----------------------------< Handle Login >-------------------------------------- 

   // Function to handle successful login and when is ran during login 
   // & has access to the returned user data

const handleLogin = async (userData) => {

   alert('login successful')
   setIsLoggedIn(true);
   localStorage.setItem('isLoggedIn', 'true');


  //---------< Check User DB for Existing Favorites >--------
   
  try {
    // Define request URL and request body
    const reqURL = 'http://localhost:3500/updateFavorites';
    const requestBody = {
      type: 'login',
      userID: localStorage.getItem('userID'),
    };

    // Fetch request options
    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(reqURL, fetchOptions);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user favorites');
    }

    const responseData = await response.json();

    const favorites = responseData.data || [];

    console.log(favorites)

    if (favorites.length > 0) {
      // If favorites found, save them in local storage

      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      alert('No favorites found for the user');
    }
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    alert('An error occurred while fetching user favorites');
  }

      // saves the userData from the parameter into the localStorage
   const user = {
       username: userData.username,
       fullName: userData.fullName,
       email: userData.email
   };

   localStorage.setItem('user', JSON.stringify(user));
  //  localStorage.setItem('favorites', JSON.stringify([]))
   window.location.reload();
};

// ----------------------------< Handle Logout >--------------------------------------
   
const handleLogout = () => {
  
  setIsLoggedIn(false);
  localStorage.clear();
  window.location.reload();
  console.log('logout clicked');
  
};


// ----------------------------< Handle Favorites >----------------------------------- 

// React says "this is not a function" 
// gameData is Card data
const handleFav = async (gameData) => {

  // console.log(buttonState)

   // Endpoint URL
   const reqURL = 'http://localhost:3500/updateFavorites';


    // Check if the game is already in favorites
    const isFavorite = favorites.some(fav => fav.id === gameData.id);


    // console.log(isFavorite)

    try {
        // If already a favorite, let the client know and do nothing
        if (isFavorite) {
            alert("Already in favorites!");
            return;
        }

        // Construct the request body including userID
        const requestBody = {
            type: 'favorites',
            userID: localStorage.getItem('userID'),
            gameData: gameData // card data
        };

      if(localStorage.getItem('isLoggedIn') === 'true') {

     

        // Fetch request options
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        };

        // console.log(requestBody)

        // Make the fetch request
        const response = await fetch(reqURL, fetchOptions);

        // if (!response.ok) {
        //     throw new Error('Something went wrong with the fetch');
        // }

        const data = await response.json();
        
        console.log(data) // we need the data back from the 'type === favorites' if else in the server

        // alert(data.message) // did it store it correctly or not 

        // Assuming you want to update the local state after successfully updating favorites on the server
        // Update favorites state


      const newFavorites = [...favorites, gameData];
      setFavorites(newFavorites);
      
  
      // set newFavorites in localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      
    } else{
      alert('you need to be logged in the save favorites')
    }

      } catch (error) {
          console.error('Error updating favorites:', error);
      }

};

// ----------------------------< Delete Favorite >--------------------------------------

// write functionality to delete the favorite from the database & local storage

  const deleteFavorite = async (favorite) => {

    // console.log(buttonState)

    const reqURL = 'http://localhost:3500/updateFavorites';
    
    //update the favorites state by creating a new array out of favorites
    // then update the favorites state variable with the new array
   
    const isFavorite = favorites.some(fav => fav.id === favorite.id);

    if (!isFavorite) {
      console.log('Favorite not found in favorites list');
      return;
    }

   // next we need to fetch from the server side/mongodb updateFavorites endpoint

   try {

      // Construct the request body including userID
      const requestBody = {
          type: 'deleteFavorite',
          userID: localStorage.getItem('userID'),
          gameData: favorite // favorite data
      };

    if(localStorage.getItem('isLoggedIn') === 'true') {

      // Fetch request options
      const fetchOptions = {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
      };

      // console.log(requestBody)

      // Make the fetch request
      const response = await fetch(reqURL, fetchOptions);

      // if (!response.ok) {
      //     throw new Error('Something went wrong with the fetch');
      // }

      const data = await response.json();
      console.log(data) // we need the data back from the 'type === favorites' if else in the server

      // acquire the message from the server that shows it was a success
        if (data.message === 'Successfully deleted favorite') {
          const updatedFavorites = favorites.filter(fav => fav.id !== favorite.id);
          setFavorites(updatedFavorites);
          // setButtonState(isFavorite(favorite.id));  // <-------- browse card btn state ?

          // Update local storage
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
          console.log('unsuccessful');
        }
      } else {
        alert('You need to be logged in to delete favorites');
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }

  };


  // ----------------------------< See Game Section Function >---------------------------- 

const seeGame = (section) => {
   // write functionality to redirect page to the search page for the clicked game
   localStorage.setItem('searchResults', JSON.stringify(section));
   window.location.href = '/search'; 

}


// ----------------------------< Handle Search >---------------------------- 

const [searchVal, setSearchVal] = useState(''); 
const [searchResults, setResults] = useState([]);
// const [ifSearched, setIfSearched] = useState(false);
const [wikiData, setWikiData] = useState([])





const handleSearch = async (searchValue) => {

  // ----< WIKI API >-----

  const reqURL = 'http://localhost:3500/wiki';

      // Fetch request options
      const fetchOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
          searchVal: searchValue
        },
       
    };

    try{
      const response = await fetch(reqURL, fetchOptions)
         
      if (!response.ok) {
          throw new Error('Something went wrong with the fetch');
      }
  
      const data = await response.json();
      console.log(data)
     
      if (data.query) {
           setWikiData(data.query.pages)
            
          } else {
            setWikiData([])
          }

          
        }catch(error){
          console.error('Error deleting favorite:', error);
        }
}

  return (
    <>
      <NavBar handleSearch={handleSearch} searchVal={searchVal} setSearchVal={setSearchVal} setResults={setResults}  isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />
     
      <AppRouter deleteFavorite={deleteFavorite} wikiData={wikiData} favorites={favorites}  searchResults={searchResults} handleFav={handleFav}  seeGame={seeGame}/>

      {isBrowsePage && <SlideshowHeader handleFav={handleFav} seeGame={seeGame} deleteFavorite={deleteFavorite} favorites={favorites} setFavorites={setFavorites} />}
      
      {isLoggedIn && isAccountPage ? (
          <UserProfile handleLogin={handleLogin} deleteFavorite={deleteFavorite} favorites={favorites.filter(favorite => favorite.id)} username={username} fullName={fullName} email={email}/>
        ) : (
          !isLoggedIn && isAccountPage && <RegisterLogForm handleLogin={handleLogin} />
        )}

  
    </>
  )
}

export default App
