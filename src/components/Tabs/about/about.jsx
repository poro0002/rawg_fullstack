import { useState, useEffect } from "react"
import "../about/about.css"
import Footer from '../../Footer/footer'


function AboutPage(props){
   return(
<>
    <div className="design-page-cont">
      
           <video autoPlay loop muted className="background-video">
              <source src="/Content/smoke1.mov" type="video/mp4" />
     
            </video>
   
  
            <div class="about-page">
        <section class="intro">
      
            <h1>Efficient User Experience: A Full-Stack React Project</h1>
            <h2>Introduction</h2>
            <p>I am Kieran Poropat, a self-taught Full-Stack developer with a passion for programming, engineering, and artistic design. In this write-up, I aim to provide insights into my project and its significance, showcasing my expertise and contributions to the realm of web development.</p>
            <p>This project is a testament to the pursuit of an efficient user experience, tailored to meet the diverse needs of every visitor. By offering personalized account features and seamless navigation, I sought to create a platform where users can engage effortlessly, fostering a sense of belonging and connection. Through a meticulous integration of front-end and back-end technologies, this project emerges as a pivotal example of a fully functional Progressive Web Application (PWA).</p>
        </section>

        <section class="overview">
            <h2>Overview</h2>
            <p>The purpose of this project was to build a full website top to bottom that supports function offline functionality and be responsive to all devices. Challenging myself with Scalability was my main incentive.</p>
        </section>

        <section class="frameworks">
            <h2>Frameworks</h2>
            <ul>
                <li>React + Vite</li>
                <li>Express JS</li>
            </ul>
        </section>

        <section class="apis">
            <h2>APIs</h2>
            <ul>
                <li>Local Storage</li>
                <li>Cache API</li>
                <li>Server-Side API</li>
                <li>RAWG Video Game DB API</li>
                <li>Wiki API</li>
                <li>Youtube Data API v3</li>
                <li>Postman (for testing)</li>
            </ul>
        </section>

        <section class="database">
            <h2>Database</h2>
            <p>MongoDB</p>
        </section>

        <section class="dependencies">
            <h2>Dependencies</h2>
            <ul>
                <li><span>Cors</span> - Used for basic security measures and is industry standard</li>
                <li><span>Jsonwebtoken</span> - for user Authentication</li>
                <li><span>Nodemon</span> - having a server that updates itself</li>
                <li><span>Dotenv</span> - environment private variables for security purposes such as api keys</li>
                <li><span>Bcrypt</span> - used for hashing passwords before storing in database</li>
                <li><span>Mongoose</span> - library to manipulate/add/remove data in mongoDB</li>
                <li><span>XSS</span> - sanitization for cross scripting attacks</li>
                <li><span>React-router-dom</span> - routing used in the nav-bar</li>
                <li><span>Node-Fetch</span> - being able to fetch on the server side proxy route</li>
            </ul>
        </section>

        <section class="features">
            <h2>Features</h2>
            <ul>
                <li>Manual Service Worker</li>
                <li>Creating & Accessing User Accounts/Profile via MongoDB</li>
                <li>Asynchronous Programming</li>
                <li>Saved Favorites</li>
                <li>JWT</li>
                <li>MongoDB/mongoose CRUD</li>
                <li>Server Side Proxy Fetching</li>
                <li>Middleware</li>
                <li>Conditional Rendering</li>
                <li>Routing</li>
                <li>Passing Props/Events/States/Hooks</li>
                <li>Modern Design</li>
                <li>Advanced Vanilla CSS</li>
                <li>Responsive Layout</li>
                <li>Advanced Fetching and Data Manipulation</li>
                <li>Full PWA (lighthouse approved)</li>
            </ul>
        </section>

        <section class="deployment">
            <h2>Deployment</h2>
            <ul>
                <li>Vite Production Build</li>
                <li>Github</li>
                <li>Heroku (PaaS)</li>
            </ul>
        </section>

        <section class="version-control">
            <h2>Version Control</h2>
            <p>git</p>
        </section>

        <section class="challenges">
            <h2>Challenges</h2>
            <h3>- Cross-Origin API Issue -</h3>
            <p>Encountering cross-origin issues with multiple APIs posed a significant obstacle in the development process. These APIs restricted the interception of frontend requests by the service worker due to cross-origin errors. To address this challenge, I implemented a solution by establishing a server-side endpoint using Express.js.</p>
            <p>The solution involved a client making a request to the server endpoint, which then executed a fetch operation via Node-fetch. Acting as a proxy route, the server endpoint retrieved the required API data and transmitted it back to the client. Crucially, this response was intercepted by the service worker, enabling the data to be cached before being forwarded to the client for display.</p>
            <p>Implementing this solution not only resolved the immediate issue but also provided valuable insights into managing service workers within a large-scale project. By selectively intercepting specific URLs and optimizing functionality, I ensured a streamlined and efficient codebase. This experience underscored the importance of adaptability and innovative problem-solving in overcoming complex technical challenges.</p>

            <h3>- State Management and Page Reload Issue -</h3>
            <p>A persistent challenge I encountered throughout the project was managing state persistence across page reloads in React. React's state is ephemeral and gets reset on page refresh, making it challenging to retain data between different pages or sessions. To mitigate this, I heavily relied on browser local storage for storing critical application data, which was not ideal for all scenarios.</p>
            <p>Moving forward, I recognize the importance of adopting more robust state management solutions like Redux or MobX. These libraries offer centralized state management, allowing data to be stored globally and accessed across components efficiently. Additionally, exploring techniques such as URL parameters for passing state between pages and server-side state management could provide more sustainable solutions to this challenge.</p>

            <h3>- JWT Token Header -</h3>
            <p>Implementing JWT token authentication posed a significant challenge during the development process. While the conventional approach involves sending the JWT token through the Authorization header, this method encountered persistent failures.</p>
            <p>Various server environments or configurations may impose restrictions on setting headers on the server side, complicating the implementation of custom headers such as "Authorization". Additionally, applications operating behind proxy servers may further complicate header management by modifying or filtering specific headers.</p>
            <p>To address this challenge, I conducted thorough debugging using tools like Postman to identify the root cause of the issue. Despite extensive efforts, including attempts to set the header of the response object with the JWT token, the desired functionality remained elusive.</p>
            <p>Ultimately, I devised an alternative solution by transmitting the JWT token in the response body. This workaround ensured seamless communication between the server and client, with the token securely stored in the client's local storage for subsequent authentication purposes.</p>
            <p>Navigating this challenge underscored the importance of adaptability and innovative problem-solving in overcoming technical hurdles. By leveraging alternative approaches and diligently troubleshooting, I successfully implemented a robust authentication mechanism tailored to the project's requirements.</p>

            <h3>- MongoDB Data Storage -</h3>
            <p>A notable challenge encountered during the development process pertained to storing and accessing diverse data types in MongoDB. Specifically, the task involved updating and displaying a user's favorites property, which comprised an array of objects containing API data. Despite meticulous handling, I encountered recurring client-side response errors, prompting a thorough investigation to identify the root cause.</p>
            <p>Upon careful analysis, I realized that the issue stemmed from the traditional "fetch() .then()" syntax utilized in data retrieval and manipulation. To address this, I adopted a more efficient approach, employing "try{} catch{}" asynchronous blocks, which leveraged the async/await syntax. This strategic adjustment proved instrumental in resolving the issue, offering a succinct and effective method for data fetching.</p>
            <p>This challenge presented a valuable learning opportunity, allowing me to deepen my understanding of data storage methodologies in MongoDB. By exploring alternative techniques and refining my approach, I enhanced my proficiency in managing diverse data types within the database. Moving forward, I am poised to apply these insights to future projects, ensuring robust and optimized data management solutions.</p>
        </section>

        <section class="personal-value">
            <h2>Personal Value</h2>
            <h3>- Problem Solving Abilities -</h3>
            <p>Navigating complex code bases and solving intricate problems requires a systematic and methodical approach, qualities that I prioritize in my development process. I adhere to a disciplined methodology, characterized by clear, concise thinking and meticulous planning. Utilizing my notebook as an extension of my cognitive toolkit, I break down challenges into manageable segments, facilitating a comprehensive understanding of the task at hand.</p>
            <p>In my view, programming transcends mere coding; it is predominantly a process of thoughtful planning and strategic analysis. Recognizing this, I allocate substantial time off-screen, dedicating myself to meticulous planning and problem deconstruction. This preparatory phase is indispensable, particularly in the context of large-scale projects where code contributions vary in style and complexity.</p>
            <p>By investing in thorough problem-solving methodologies, I ensure that each challenge is approached with precision and pragmatism. This proactive approach not only enhances my efficiency but also fosters collaborative synergy within development teams. As I continue to refine my problem-solving techniques, I remain committed to delivering innovative and effective solutions in all my endeavors.</p>

            <h3>- Collaboration & Communication -</h3>
            <p>My approach to collaboration is marked by a blend of laid-back demeanor and unwavering dedication to excellence. While I may identify as an introvert, I recognize the paramount importance of effective communication and teamwork in achieving optimal outcomes.</p>
            <p>Clear and articulate communication lies at the heart of successful team dynamics, enabling seamless problem-solving and fostering a collaborative environment. I place great emphasis on expressing ideas and concerns with clarity and precision, ensuring mutual understanding among team members. Moreover, maintaining composure and empathy in interpersonal interactions is integral to nurturing a supportive and cohesive team culture.</p>
            <p>My collaborative aptitude has been honed through diverse academic and professional experiences. During my tenure at Algonquin College for Mobile App Development and Seneca College for Independent Music Production, I actively participated in group projects, demonstrating my ability to collaborate effectively in multidisciplinary settings. Whether it involved co-writing songs or developing apps in teams of three, I consistently contributed to the collective success with professionalism and diligence.</p>
            <p>By leveraging my adept communication skills and collaborative mindset, I am poised to make meaningful contributions to dynamic team environments, driving innovation and achieving collective goals.</p>

            <h3>- Continuous Learning -</h3>
            <p>My commitment to continuous learning is ingrained in my approach to problem-solving and personal growth. I possess an inherent drive to see tasks through to completion, dedicating myself wholeheartedly to overcoming challenges as they arise. This steadfast determination extends to my pursuit of knowledge, as I recognize that each obstacle presents an opportunity for learning and improvement.</p>
            <p>I firmly believe that the key to success lies in perpetual self-improvement. By continually expanding my skill set and knowledge base, I equip myself with the tools necessary to tackle future challenges with confidence and proficiency. Rather than feeling daunted by the rapid pace of technological evolution, I am fueled by a sense of motivation and inspiration to delve deeper into the realm of emerging technologies and innovations.</p>
            <p>Embracing a growth mindset, I remain unfazed by setbacks and setbacks, viewing them as stepping stones on the path to becoming a more adept and versatile programmer. My insatiable curiosity and thirst for knowledge drive me to explore new horizons and push the boundaries of my capabilities, ensuring that I am always prepared to meet the demands of the ever-evolving tech landscape.</p>
        </section>

        <section class="conclusion">
            <h2>Conclusion</h2>
            <p>In the journey of conceptualizing, building, and refining this full-stack React project, I've not only honed my technical skills but also cultivated a deep appreciation for the intricacies of crafting a seamless user experience. This project stands as a testament to my dedication to delivering excellence in every aspect of development, from the initial ideation phase to the deployment of a fully functional, responsive web application.</p>
            <p>As I reflect on the challenges overcome and the lessons learned, I am reminded of the boundless potential for innovation and growth within the realm of software development. Each obstacle encountered, whether it be navigating cross-origin API issues or refining database storage mechanisms, has served as an opportunity for learning and refinement. Through persistence, adaptability, and a relentless pursuit of knowledge, I've emerged not only as a proficient developer but as a resilient problem-solver capable of tackling complex challenges head-on.</p>
            <p>Looking ahead, I am eager to channel my passion for continuous learning and my drive for innovation into collaborative endeavors within a dynamic team environment. I am confident that my blend of technical expertise, collaborative spirit, and unwavering commitment to excellence positions me as a valuable asset to any organization seeking to push the boundaries of what's possible in the realm of web development.</p>
            <p>I am excited about the prospect of contributing my skills and insights to projects that push the envelope, challenge conventions, and ultimately, make a meaningful impact in the lives of users. Together, let's embark on a journey of innovation, creativity, and boundless possibility.</p>
            <p>Thank you for considering my project and the potential I bring to your team. I look forward to the opportunity to contribute and grow alongside like-minded individuals dedicated to pushing the boundaries of technological innovation.</p>
        </section>
    </div>
<div className="sig-cont">
<img className="frasr-logo" src="/Content/white-SIGNATURE.png" alt="" />
{/* <p>- Kieran</p> */}
</div>
   
</div> 
<Footer></Footer>
</>
   )
}

export default AboutPage