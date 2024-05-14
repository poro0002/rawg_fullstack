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

{/* <Route path='/search'Component={SearchPage}/> */}

function AppRouter({searchResults}) {
    return (

<Router>
    <Routes>
        <Route path='/home' Component={HomePage}  exact/>
        <Route path='/design'Component={DesignPage}/>
        <Route path='/browse'Component={BrowsePage}/>
        <Route path="/search" element={ <SearchPage searchResults={searchResults} /> } />
      
    </Routes>
</Router>  

    ) ;  
}

export default AppRouter;