// Router
import NavBar from '../Navbar/navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";

//Page Tabs
import BrowsePage from '../Tabs/browse/browse'
import DesignPage from '../Tabs/design/design'
import HomePage from '../Tabs/home/home'
import SearchPage from '../Tabs/search/search'
import AboutPage from '../Tabs/about/about'

{/* <Route path='/search'Component={SearchPage}/> */}

function AppRouter({ seeGame, handleFav, favorites, wikiData, deleteFavorite, youtubeData, handleSearch }) {
    return (

<Router>
    <Routes>
        <Route path='/home' element={ <HomePage seeGame={seeGame} handleSearch={handleSearch} /> }  exact/>
        <Route path='/design'Component={DesignPage}/>
        <Route path='/about'Component={AboutPage}/>
        <Route path='/browse'Component={BrowsePage}/>
        <Route path="/search" element={ <SearchPage youtubeData={youtubeData} wikiData={wikiData} favorites={favorites} handleFav={handleFav} deleteFavorite={deleteFavorite} /> } />
      
    </Routes>
</Router>  

    ) ;  
}

export default AppRouter;