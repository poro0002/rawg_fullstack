import React, { useState, useEffect } from "react";
import './navbar.css'
import Link from "../Link/link"

import SearchBar from '../searchBar/searchBar'

function NavBar({ handleLogout, setResults, setSearchVal, searchVal, handleSearch}) {

// -------------< Active Nav Link States > -------------------------

  const [isNavOpen, setIsNavOpen] = useState(false);

    // update the activeNavLink state
    const [activeLink, setActiveLink] = useState(() => {
        return localStorage.getItem("activeNavLink") || '/home'; // base case Default to home if no value in local storage
    });

    // Function to handle setting active link and updating local storage
    const setActiveLinkAndUpdateStorage = (path) => {
        setActiveLink(path);
        localStorage.setItem("activeNavLink", path);
        setIsNavOpen(false); 
    };

    // whenever the current path changes update the link
    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveLinkAndUpdateStorage(currentPath);
    }, []);


// -------------< LoggedIn State >---------------------------------
    
    // set isLoggedIn state from local storage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

// -------------< Get User Info >---------------------------------

    // set user object from local storage
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || {};
    });

// --------< Update Local Storage >------

    // Update the isLoggedIn state if local storage changes
    useEffect(() => { 
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
            setUser(JSON.parse(localStorage.getItem('user')) || {});
        };
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

  
// -------------< Mobile Nav Toggle State >---------------------------------

    const handleToggleNav = () => {
        setIsNavOpen(!isNavOpen);
      };

    return (
        <nav className="navbar">
           
            <div className="nav-header">
                <button className="nav-toggle" onClick={handleToggleNav}>
                    <i className="material-icons">{isNavOpen ? 'close' : 'menu'}</i>
                </button>
                    <Link to='/home'><img className="nav-logo" src="src/Content/rawg.png" alt="" /></Link>
            </div>

            <ul className={`nav-list ${isNavOpen ? 'open' : ''}`}>   
                <li className="nav-item">
                    <Link to='/home'><img className="nav-logo" src="src/Content/rawg.png" alt="" /></Link>
                </li>
                <li className={`nav-item ${activeLink === '/home' ? 'active' : '' }`}>
                    <Link to='/home' onClick={() => handleClick('home')} >HOME</Link>
                </li>
                <li className={`nav-item ${activeLink === '/design' ? 'active' : '' }`}>
                    <Link to='/design' onClick={() => handleClick('design')} >DESIGN</Link>
                </li>
                <li className={`nav-item ${activeLink === '/browse' ? 'active' : '' }`}>
                    <Link to='/browse' onClick={() => handleClick('browse')} >BROWSE</Link>
                </li>
                <i className="material-icons search-icon">search</i><SearchBar className='searchBar' setSearchVal={setSearchVal} searchVal={searchVal}  setResults={setResults} handleSearch={handleSearch} />
                {isLoggedIn ? (
                    <>
                        <li><a href="/login">{user.username}</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><a href="/login">LOGIN</a></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
