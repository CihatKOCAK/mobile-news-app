import React from 'react';
import logo from './logo.ico';
import './NavNews.css';
import HamburgerDrawner from './HamburgerDrawner';


const NavNews = ({setCategory}) => {
    return (
        <div className="nav">
            <div className="icon">
                <HamburgerDrawner setCategory={setCategory} />
            </div>
            <img
            style={{cursor:"pointer"}} 
            src={logo} 
            height='80%'
            alt="logo"

            />
        </div>
    )
}

export default NavNews
