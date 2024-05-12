import '../Footer/footer.css';
import { useState, useEffect } from 'react';
import Link from "../Link/link"




function Footer() {
    return (
        <footer>
            <a className="footer__logo" href="/">
                <img src="src/Content/League of Legends Logo - 1280x831.png" alt="signature logo" className="footer__icon" />
            </a>

            <nav className="footer__nav">
                <ul className="footer__list">
                    <Link></Link>
                    <Link></Link>
                    <Link></Link>
                </ul>
            </nav>

            <div className="footer-small-links">
                <small className="footer__copyright">
                    &copy; 2023 | Website Created By Kieran Poropat
                </small>
                <div className="footer__copyright2">
                    <small><a target="_blank" href="https://github.com/Kiirynn?tab=repositories"><img className="small-media-logo" src="src/Content/logos/github-white48.png" alt="github logo" /></a></small>
                    <small><a target="_blank" href="https://www.linkedin.com/in/kieran-poropat/"><img className="small-media-logo" src="src/Content/logos/In-White-48.png" alt="linkedin logo" /></a></small>
                    <small><a target="_blank" href="https://dribbble.com/Kiirynn"><img className="small-media-logo" src="src/Content/logos/dribbble-white-logo.png" alt="dribble logo" /></a></small>
                </div>
            </div>
        </footer>
    );
}


export default Footer 