import React, { useState, useEffect } from "react";
import './navbar.css'
import Link from "../Link/link"

function NavBar({ handleLogout }) {
   
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

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <Link to='/home'>Home</Link>
                <Link to='/games'>Games</Link>
                <Link to='/search'>Search</Link>
                <Link to='/browse'>Browse</Link>
                {isLoggedIn ? (
                    <>
                        <li><a href="/login">{user.username}</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><a href="/login">Login</a></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
