// Router
import NavBar from '../Navbar/navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";

//Page Tabs
import BrowsePage from '../Tabs/browse/browse'
import GamesPage from '../Tabs/games/games'
import HomePage from '../Tabs/home/home'
import SearchPage from '../Tabs/search/search'



function AppRouter() {
    return (

<Router>
    <Routes>
        <Route path='/home' Component={HomePage}  exact/>
        <Route path='/games'Component={GamesPage}/>
        <Route path='/search'Component={SearchPage}/>
        <Route path='/browse'Component={BrowsePage}/>
    </Routes>
</Router>  

    ) ;  
}

export default AppRouter;