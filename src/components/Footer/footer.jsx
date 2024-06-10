import '../Footer/footer.css';
import { useState, useEffect } from 'react';
import Link from "../Link/link"




function Footer() {
    return (
        <footer>
             <nav className="footer__nav">
            <a className="footer__logo" href="/home">
                <img src="public/Content/rawg.png" alt="signature logo" className="footer__icon" />
            </a>

            </nav>

            <div className="footer-small-links">
              
                <div className="footer-ratings">
                    <img src="public/Content/ESRB_Privacy_Certified.png" alt="" className="footer-ratings__img" />
                    <img src="public/Content/k_A.png" alt="" className="footer-ratings__img footer-ratings__img2" />
                    <div className="footer-ratings__details">
                        <ul>
                            <li>Suggestive Themes</li>
                            <li>Sexual Content</li>
                            <li>Blood & Gore</li>
                            <li>Violence</li>
                            <li>Mild Language</li>
                            <li>Use Of Alcohol</li>
                        </ul>
                    </div>
                </div>

                <small className="footer__copyright">
                    &copy; 2024 | Fullstack Website Created By Kieran Poropat
                    <p>All trademarks referenced herein are the properties of their respective owners.</p>
                </small>

                <div className="footer__copyright2">
                
                    <div className="footer__list">
                        <small><a target="_blank" href="https://github.com/Kiirynn?tab=repositories"><img className="small-media-logo" src="public/Content/logos/github-white48.png" alt="github logo" /></a></small>
                        <small><a target="_blank" href="https://github.com/poro0002?tab=repositories"><img className="small-media-logo" src="public/Content/logos/github-white48.png" alt="github logo" /></a></small>
                        <small><a target="_blank" href="https://www.linkedin.com/in/kieran-poropat/"><img className="small-media-logo" src="public/Content/logos/In-White-48.png" alt="linkedin logo" /></a></small>
                        <small><a target="_blank" href="https://dribbble.com/Kiirynn"><img className="small-media-logo" src="public/Content/logos/dribbble-white-logo.png" alt="dribble logo" /></a></small>
                    </div>

                    <ul className="footer__list">
                            <li><a className="footer__link" href="https://rawg.io/">RAWG</a></li>
                            <li><a className="footer__link" href="https://rawg.io/apidocs">API</a></li>
                            <li><a className="footer__link" href="https://poro0002.github.io/mad9013-project-portfolio/">My Portfolio</a></li>
                    </ul>

                </div>

            </div>
        </footer>
    );
}


export default Footer 