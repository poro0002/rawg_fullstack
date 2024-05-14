import React, { useState, useEffect } from "react";
import './navbar.css'
import Link from "../Link/link"

import SearchBar from '../searchBar/searchBar'

function NavBar({ handleLogout, setResults, setSearchVal, setIfSearched, searchVal, }) {
   
    // Initialize isLoggedIn state from local storage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    // Initialize user object from local storage
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || {};
    });

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

    // do a conditional render for the searchbar or page that is in the navbar

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to='/home'><img className="nav-logo" src="src/Content/rawg.png" alt="" /></Link>
                </li>
                <li className="nav-item"><Link to='/home'>HOME</Link></li>
                <li className="nav-item"><Link to='/design'>DESIGN</Link></li>
                <li className="nav-item"><Link to='/browse'>BROWSE</Link></li>
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
