import React, { useState, useEffect } from "react";
import './navbar.css'
import Link from "../Link/link"

import SearchBar from '../searchBar/searchBar'

function NavBar({ handleLogout, setResults, setSearchVal, setIfSearched, searchVal, }) {

// -------------< Active Nav Link States > -------------------------

    // update the activeNavLink state
    const [activeLink, setActiveLink] = useState(() => {
        return localStorage.getItem("activeNavLink") || '/home'; // base case Default to home if no value in local storage
    });

    // Function to handle setting active link and updating local storage
    const setActiveLinkAndUpdateStorage = (path) => {
        setActiveLink(path);
        localStorage.setItem("activeNavLink", path);
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

    // do a conditional render for the searchBar or page that is in the navbar

    return (
        <nav className="navbar">
            <ul className="nav-list">
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
                <i className="material-icons search-icon">search</i><SearchBar className='searchBar' setSearchVal={setSearchVal} setIfSearched={setIfSearched} searchVal={searchVal}  setResults={setResults} />
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
