import { useState, useEffect } from "react"
import Container from '../../Container/container'
import './design.css'
import Footer from '../../Footer/footer'

function DesignPage(props){
   return(
      <>
      
         <video autoPlay loop muted className="background-video">
            <source src="/Content/smoke1.mov" type="video/mp4" />
          
         </video>
        

<div className="color-container">

      <h2 className="design__title">- Design System -</h2>

            
   {/* ---------------------------------< Primary >---------------------------------------- */}
     
            
      <div className="colors-cont color-primary__cont">
            <h3 className="color__title">-Colors-</h3>
            <h4 className="color__sub">Primary</h4>
             <p className="color-sub_info">Dark blue is often associated with professionalism, trust, and reliability. Many financial institutions, corporations, and tech companies use dark blue in their branding to convey a sense of stability and dependability.</p>
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


{/* ---------------------------------< SECONDARY >---------------------------------------- */}
    
           
       <div className="colors-cont color-secondary__cont">
            <h3 className="color__title">-Colors-</h3>
            <h4 className="color__sub">Secondary</h4>
              <p className="color-sub_info">Light blue is associated with tranquility and serenity. It can evoke a sense of calmness and relaxation, making it ideal for spaces where you want to create a peaceful atmosphere, such as bedrooms or meditation rooms.</p>
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


   {/* ---------------------------------< SHADES >---------------------------------------- */}

            
      <div className="colors-cont color-shades__cont">
            <h3 className="color__title">-Colors-</h3>
            <h4 className="color__sub">Shades</h4>
             <p className="color-sub_info">Using shades of a color adds depth and dimension to a design. By incorporating lighter and darker variations of the base color, you create visual interest and make the design more dynamic.</p>
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

   {/* ---------------------------------< GRADIENTS >---------------------------------------- */}
      
            
   <div className="colors-cont color-gradient__cont">
       <h3 className="color__title">-Colors-</h3>
       <h4 className="color__sub">Gradients</h4>
          <p className="color-sub_info">Gradients add visual interest and depth to designs. They create a smooth transition between two or more colors, which can capture attention and make a design more engaging.</p>

               <div className="color-box__cont">
                     <div className="color-box-gradient  primary-gradient"></div>
                     <p className="color-box__tag">primary-gradient</p>
                     <div className="color-box__info">
                        <p className="color-box__hex"> HEX: #5c6bc0, #48569b, #303F9F </p>
                        <p className="color-box__rgb">RGB: rgb(92, 107, 192), rgb(72, 86, 155), rgb(48, 63, 159)</p>
                     </div>
                  </div>

               <div className="color-box__cont">
                     <div className="color-box-gradient secondary-gradient"></div>
                     <p className="color-box__tag">secondary-gradient</p>
                     <div className="color-box__info">
                        <p className="color-box__hex"> HEX: #7986cb, #9FA8DA, #d1d5f0 </p>
                        <p className="color-box__rgb">RGB: rgb(121, 134, 203), rgb(159, 168, 218), rgb(209, 213, 240)</p>
                     </div>
                  </div>
               
               <div className="color-box__cont">
                     <div className="color-box-gradient shade-gradient"></div>
                     <p className="color-box__tag">shade-gradient</p>
                     <div className="color-box__info">
                        <p className="color-box__hex"> HEX: #333333HE, #101010, #010a13 </p>
                        <p className="color-box__rgb">RGB: rgb(51, 51, 51), rgb(16, 16, 16), rgb(1, 10, 19)</p>
                     </div>
                  </div>

            </div>

   </div> 
{/*------------- end of colors container -------------  */}

{/* ---------------------------------< TYPOGRAPHY >---------------------------------------- */}
      
 <div className="colors-cont typography-cont">

          <h3 className="typography__title color__title">-Typography-</h3>
          <h4 className="color__sub">Font Grid</h4>
          <p className="color-sub_info">Well-designed typography ensures that text content is easy to read, even on various devices and screen sizes. Accessible typography enhances the user experience for people with visual impairments by providing clear, legible text.</p>

            <div className="typography-flex">
                  <p className="typography-large-letter">Aa</p>
               </div>
               <h2 className="typography-title">"Roboto"</h2>
              
                  <p className="color-sub_info">Roboto is designed to be highly readable on screens, which is crucial for websites where users spend a lot of time reading content. Its clean and simple design makes it easy on the eyes, even when displayed in small sizes or on high-resolution screens.</p>
           
   
{/* he uppercase letters 'A' to 'Z' are represented by the values 65 to 90, and the lowercase letters 'a' to 'z' are represented by the values 97 to 122. */}
  {/* So when you add 65 + i in String.fromCharCode(65 + i), it's essentially iterating over the uppercase alphabet characters starting from 'A' (65 + 0 = 65) to 'Z' (65 + 25 = 90).*/}
         
          <div className="typography-grid">
            {/* Displaying letters A-Z */}
            {Array.from(Array(26).keys()).map(i => (
              <div className="typography-grid-item" key={i}>
                <p className="typography-letter">{String.fromCharCode(65 + i)}</p>
                <p className="typography-letter">{String.fromCharCode(97 + i)}</p>
              </div>
            ))}

      {/* This creates an array of length 10 and then extracts the keys (indices) from that array. This effectively gives you an array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]. */}
          {/* Displaying numbers 0-9*/}
            {Array.from(Array(10).keys()).map(i => (
              <div className="typography-grid-item" key={i + 26}>
                <p className="typography-letter">{i}</p>
              </div>
            ))}
          </div>

          <div className="hierachy-cont">
            <h3 className="typography__title color__title">-Typography-</h3>
            <h3 className="hierarchy-title color__sub">Hierarchy</h3>
            <p className="color-sub_info">Establishing a clear visual hierarchy helps users quickly understand the structure of content. By using different font sizes, colors, and weights, developers can guide users' eyes to the most important elements first.</p>
               
               <div className="hierarchy-item large-title">
                  Large Title (<span className="measurement">1.5rem / 24px</span>)
               </div>

               <div className="hierarchy-item sub-title">
                  Sub-Title (<span className="measurement">1.9rem / 30px</span>)
               </div>

               <div className="hierarchy-item main-heading">
                  Main Heading (<span className="measurement">1.1rem / 18px</span>)
               </div>

               <div className="hierarchy-item sub-heading">
                  Sub Heading (<span className="measurement">0.9rem / 14px</span>)
               </div>

               <div className="hierarchy-item small-text">
                  Small Text (<span className="measurement">0.7rem / 12px</span>)
               </div>

               <div className="hierarchy-item mobile-paragraph">
                  Mobile Paragraph (<span className="measurement">0.5rem / 8px</span>)
               </div>
       </div>


       <div className="components-cont">
            <h3 className="components_title color__title">-Modules-</h3>
            <h3 className="component-title color__sub">Components</h3>
            <p className="color-sub_info">Components and modules allow designers and developers to create reusable pieces of code or design elements. This means that once a component is created, it can be used across multiple parts of a website or application, saving time and effort.</p>
            

            <h3 className="components-display-cards__title">Cards Component</h3>
            <div className="component components__display-cards">
 
                  <header className='slide'>    
                           <a className="card" >   
                              <div className="card-info__cont">
                                       <h1 className='card__title'></h1>
                                       <p className="card__rating">Rating: </p>
                                       <p className="card__updated">Version: </p> 
                                          
                                       <button  className="card-btn__like">
                                          <i className='material-icons'>favorite</i>
                                       </button>
                                    </div>
                                 </a>
                        </header>

                        <header className='slide'>    
                           <a className="card" >   
                              <div className="card-info__cont">
                                       <h1 className='card__title'></h1>
                                       <p className="card__rating">Rating: </p>
                                       <p className="card__updated">Version: </p> 
                                          
                                       <button  className="card-btn__like">
                                          <i className='material-icons'>favorite</i>
                                       </button>
                                    </div>
                                 </a>
                        </header>

                        <header className='slide'>    
                           <a className="card" >   
                              <div className="card-info__cont">
                                       <h1 className='card__title'></h1>
                                       <p className="card__rating">Rating: </p>
                                       <p className="card__updated">Version: </p> 
                                          
                                       <button  className="card-btn__like">
                                          <i className='material-icons'>favorite</i>
                                       </button>
                                    </div>
                                 </a>
                        </header>

            </div>

         

   <div className="component components__section">
      
       <section>  
               <h3 className="components_section__title">Section Component</h3>

            <div className="section__div section-component" >
                    
                     
               <div className={`section-info__cont odd`}>
                  <div className="section-info-screenshot__cont">
                        
                     <div className={`section-div__title odd`}>
                              <div className={`section-title-info__cont odd`}>
                                 {/* <p className="section__rating">Rating: <span className="section-info__value"></span></p> */}
                                 <p className="section__released">Released:  <span className="section-info__value"></span></p>
                                 <p className="section__metacritic">Metacritic: <span className="section-info__value"></span> </p>
                                 <button  className="section__btn" >VIEW</button>
                                 <a className="section__href" >WEBSITE</a>
                              </div>

                              <div className="section-title-logo__cont">
                                 <img className='section-title__logo' alt="" />
                              </div>
                     </div>

                  
                        <div className={`section-info-screenshot__description odd`} >
                                 
                                 <h4 className="section-info-screenshot-description__subText">subtext</h4>
                                 <h3 className="section-info-screenshot-description__title">title</h3>
                                 <p className="section-info-screenshot-description__desc">description</p>
                           </div>

                              <a className="section-info-screenshot__title" href="#">view all</a>
                                 <div className="section-info-screenshot__imgs">   
                                             <img className="section-info-screenshot__img" />
                                             <img className="section-info-screenshot__img"  />
                                             <img className="section-info-screenshot__img"  />
                                             <img className="section-info-screenshot__img" />
                                             <img className="section-info-screenshot__img"  />
                                 </div>
                     </div>

                  </div>
         
               </div>
             </section >  
            
            </div>

       </div>

    </div>
   {/*------------- end of typography container -------------  */}

   {/* ---------------------------------< API INFO >---------------------------------------- */}

      <div className="api-cont">

      <img src="public/Content/rawg.png" alt="" className="api__logo" />
           
            <h3 className="api_title color__title">-RAWG-</h3>
               <h3 className="api-title color__sub">API</h3>
               <p className="color-sub_info">RAWG API offers access to a vast database of video games across various platforms, including PC, consoles, and mobile. This extensive coverage ensures that you can find information on a wide range of games, from the latest releases to classic titles.</p>

            
           
            <div className="api-link__list">
               <ul className="api-link-list__items">
                  <li><a className="api-link-list__item"href="https://rawg.io/">WEBSITE</a></li>
                  <li><a className="api-link-list__item"href="https://rawg.io/apidocs">API</a></li>
                  <li><a className="api-link-list__item"href="https://x.com/rawgtheworld?lang=en">TWITTER</a></li>
               </ul>
            </div>

         <div className="api__screenshots">
            <img className="api-screenshot__img" src="/Content/rawg_screenshot2.png" alt="" />
            <img className="api-screenshot__img" src="/Content/rawg_screenshot3.png" alt="" />
            <img className="api-screenshot__img" src="/Content/rawg_screenshot1.png" alt="" />
            
         </div>
                  
               
      </div>


      <div className="api-cont">

      <img src="/Content/wikipidia_logo.png" alt="" className="api__logo2" />
           
           <h3 className="api_title color__title">-Wiki-</h3>
              <h3 className="api-title color__sub">API</h3>
              <p className="color-sub_info">The MediaWiki Action API is a web service that allows access to some wiki features like authentication, page operations, and search. It can provide meta information about the wiki and the logged-in user.</p>

      
           <div className="api-link__list">
              <ul className="api-link-list__items">
                 <li><a className="api-link-list__item"href="https://en.wikipedia.org/wiki/Main_Page">WEBSITE</a></li>
                 <li><a className="api-link-list__item"href="https://www.mediawiki.org/wiki/API:Main_page">API</a></li>
                 <li><a className="api-link-list__item"href="https://x.com/Wikipedia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">TWITTER</a></li>
              </ul>
           </div>

        <div className="api__screenshots">
           <img className="api-screenshot__img" src="/Content/wiki-screenshot-api1.png" alt="" />
           <img className="api-screenshot__img" src="/Content/wiki-screenshot-api2.png" alt="" />
          
         
        </div>
                 
              
     </div>




     <div className="api-cont">

<img src="/Content/yt_logo_rgb_dark.png" alt="" className="api__logo" />
     
     <h3 className="api_title color__title">-Youtube/Google Cloud-</h3>
        <h3 className="api-title color__sub">API</h3>
        <p className="color-sub_info">The YouTube Data API v3 is an API that provides access to YouTube data, such as videos, playlists, and channels.</p>


     <div className="api-link__list">
        <ul className="api-link-list__items">
           <li><a className="api-link-list__item"href="https://www.youtube.com/">WEBSITE</a></li>
           <li><a className="api-link-list__item"href="https://developers.google.com/youtube/v3">API</a></li>
           <li><a className="api-link-list__item"href="https://twitter.com/YouTube">TWITTER</a></li>
        </ul>
     </div>

  <div className="api__screenshots">
     <img className="api-screenshot__img" src="/Content/youtube-api-screenshot1.png" alt="" />
     <img className="api-screenshot__img" src="/Content/youtube-api-screenshot2.png" alt="" />
     <img className="api-screenshot__img" src="/Content/youtube-api-screenshot3.png" alt="" />
   
  </div>
           
        
</div>


 <Footer></Footer>
 </>
   
   )
}

export default DesignPage