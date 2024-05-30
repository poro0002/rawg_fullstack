import { useState, useEffect } from "react"
import Container from '../../Container/container'
import './design.css'

function DesignPage(props){
   return(
      <div className="color-container">
      <h2 className="design__title">Design System</h2>
      <h2 className="color__title">Colors</h2>

      <h4 className="color__sub">Primary</h4>
      <p className="color-sub_info">Blue is used in Hextech magic to drive the players eye towards a primary focal point.</p>
      <div className="colors-cont color-primary__cont">
          <div className="color-box__cont">
              <div className="color-box primary primary-color"></div>
              <p className="color-box__tag">primary-color</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #5c6bc0</p>
               <p className="color-box__rgb">RGB: rgb(92, 107, 192)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box primary primary-color-light-2"></div>
              <p className="color-box__tag">primary-color-light-2</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #a4afe4</p>
               <p className="color-box__rgb">RGB: rgb(164, 175, 228)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box primary primary-color-dark-1"></div>
              <p className="color-box__tag">primary-color-dark-1</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #48569b</p>
               <p className="color-box__rgb">RGB: rgb(72, 86, 155)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box primary primary-color-dark-2"></div>
              <p className="color-box__tag">primary-color-dark-2</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #37447b</p>
               <p className="color-box__rgb">RGB: rgb(55, 68, 123)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box primary darkest-color"></div>
              <p className="color-box__tag">darkest-color</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #303F9F</p>
               <p className="color-box__rgb">RGB: rgb(48, 63, 159)</p>
              </div>
          </div>
      </div>

      <h4 className="color__sub">Secondary</h4>
      <p className="color-sub_info">Blue is used in Hextech magic to drive the players eye towards a primary focal point.</p>
      <div className="colors-cont color-secondary__cont">
          <div className="color-box__cont">
              <div className="color-box secondary secondary-color"></div>
              <p className="color-box__tag">secondary-color</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #9FA8DA</p>
               <p className="color-box__rgb">RGB: rgb(159, 168, 218)</p>
           </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box secondary secondary-light"></div>
              <p className="color-box__tag">secondary-light</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #C5CAE9</p>
               <p className="color-box__rgb">RGB: rgb(197, 202, 233)</p>
            </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box secondary secondary-dark"></div>
              <p className="color-box__tag">secondary-dark</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #7986cb</p>
               <p className="color-box__rgb">RGB: rgb(121, 134, 203)</p>
            </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box secondary secondary-accent-1"></div>
              <p className="color-box__tag">secondary-accent-1</p>
             <div className="color-box__info">
               <p className="color-box__hex">Hex: #b3bce8</p>
               <p className="color-box__rgb">RGB: rgb(179, 188, 232)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box secondary secondary-accent-2"></div>
              <p className="color-box__tag">secondary-accent-2</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #d1d5f0</p>
               <p className="color-box__rgb">RGB: rgb(209, 213, 240)</p>
             </div>
          </div>
      </div>

      <h4 className="color__sub">Shades</h4>
      <p className="color-sub_info">Blue is used in Hextech magic to drive the players eye towards a primary focal point.</p>
      <div className="colors-cont color-shades__cont">
          <div className="color-box__cont">
              <div className="color-box shade extra-grey"></div>
              <p className="color-box__tag">extra-grey</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #C6BEB8</p>
               <p className="color-box__rgb">RGB: rgb(198, 190, 184)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box shade shade-one"></div>
              <p className="color-box__tag">shade-one</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #0005</p>
               <p className="color-box__rgb">RGB: rgba(0, 0, 0, 0.03)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box shade shade-two"></div>
              <p className="color-box__tag">shade-two</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #5550</p>
               <p className="color-box__rgb">RGB: rgba(85, 85, 85, 0.03)</p>
             </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box shade shade-three"></div>
              <p className="color-box__tag">shade-three</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #101010</p>
               <p className="color-box__rgb">RGB: rgb(16, 16, 16)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box shade shade-four"></div>
              <p className="color-box__tag">shade-four</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #333333</p>
               <p className="color-box__rgb">RGB: rgb(51, 51, 51)</p>
              </div>
          </div>
          <div className="color-box__cont">
              <div className="color-box shade article-bkgd-color"></div>
              <p className="color-box__tag">article-bkgd-color</p>
              <div className="color-box__info">
               <p className="color-box__hex">Hex: #C2C2C2</p>
               <p className="color-box__rgb">RGB: rgb(194, 194, 194)</p>
            </div>
          </div>
      </div>
  </div>
   
   )
}

export default DesignPage