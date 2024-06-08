
// ----------------------------< Dependencies >---------------------------------------

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './schema.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcrypt';
import xss from 'xss';
import fetch from 'node-fetch'; 
import path from 'path';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

// In Node.js, __filename is a global variable that represents the filename of the code being 
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);


dotenv.config();

const app = express();
const jwt_key = process.env.JWT_KEY;
const port = process.env.PORT;
const api_key = process.env.API_KEY;
const api_key2 = process.env.API_KEY2;
const yt_api_key = process.env.YT_API_KEY;

app.use(cors());
app.use(express.json())


// ----------------------------< Database Connection >---------------------------------------

const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.log('Error with MongoDB:', err);
    });


// ----------------------------< HEROKU >---------------------------------------

// Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));

 // Handle any other routes by serving the index.html file
      app.get('*', (req, res) => {
         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
      });


// ----------------------------< Proxy API Request >---------------------------------------

// Define a route that acts as a proxy to the API server

// handel the search bar request 

// ----------- RAWG PROXY FETCH --------------

app.get('/api/games', async (req, res) => {

   const type = req.query.type;

   if(type === 'slideshowHeader'){
   try {
     // Make a request to the API server
     const response = await fetch(`https://api.rawg.io/api/games?key=${api_key2}&page_size=100`);
   
     if (!response.ok) {
       throw new Error('Failed to fetch data from API');
     }
     
     // Parse the JSON response and send it back to the client
     const data = await response.json();
   //   console.log(typeof data)
     
     // Set the Content-Type header to application/json
     res.setHeader('Content-Type', 'application/json');
     res.setHeader('Cache-Control', 'public, max-age=604800');
     
     // Send the JSON response
     return res.json(data);


   } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'An error occurred while fetching data from the API' });
    }

   }

   else if(type === 'searchBar'){
      try {
         const searchQuery = req.query.search;

         const response = await fetch(`https://api.rawg.io/api/games?key=${api_key2}&page_size=1&search=${searchQuery}`)

         if (!response.ok) {
            throw new Error('Failed to fetch data from API');
          }

          const data = await response.json();
          

          return res.json(data);


      } 
      catch(error) {
         console.error('Error fetching data:', error);
         return res.status(500).json({ error: 'An error occurred while fetching data from the API' });
      }
   }  else if(type === 'sectionHeader'){
         try {

            const response = await fetch(`https://api.rawg.io/api/games?key=${api_key2}&page_size=4`)
   
            if (!response.ok) {
               throw new Error('Failed to fetch data from API');
             }
   
             const data = await response.json();
            //  const gamesWithTrailers = data.results.filter(game => game.results[0].data.max > 0);
        
             return res.json(data);
             

   
         }
         catch(error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'An error occurred while fetching data from the API' });
         }
   }
 });


// ----------- WIKI PROXY FETCH --------------

app.post('/wiki',  async (req, res) => {
   // console.log(req.body);
   const searchValue = req.body.searchVal;

   const action = 'query';
   const list = 'search';
   const format = 'json';
   
   const prop = 'extracts';
   const exintro = ''; 
   const wbptterms = 'description';
  

   try{
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=${action}&list=${list}&format=${format}&srsearch=${encodeURIComponent(searchValue)}`)

      if (!response.ok) {
         throw new Error('Failed to fetch data from API');
       }

       const data = await response.json();
      
     
       // Extract pageids from search results which gives you a specific page
       // The reason for using join('|') in this specific context is related to how the Wikipedia API expects page IDs to be formatted when making subsequent requests. the API requires multiple page IDs to be provided as a single string, separated by a specific symbol, such as '|'.
      const pageIds = data.query.search.map(item => item.pageid).join('|');

      // console.log(pageIds)

      // refetch using the pageIds and extract the wiki data
      const extractsResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&exlimit=10&format=json&pageids=${pageIds}`);

      // if (!extractsResponse.ok) {
      //    throw new Error('Failed to fetch extracts from API');
      // }

      const extractsData = await extractsResponse.json();
      // console.log('extracted data', extractsData)
      
      return res.json(extractsData);

   }catch(error){
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'An error occurred while fetching data from the API' })
   }

})

// ----------- YOUTUBE PROXY FETCH --------------

app.post('/api/youtube', async (req, res) => {
    console.log(req.body);
    let searchValue = req.body.searchVal;


    try{
       let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchValue)}&key=${yt_api_key}&type=video`)
      //  if(!response.ok){
      //    throw new Error('there was a problem with the response')
      //  }
       let data = await response.json();
       console.log('youtube data', data)
       
       // this creates a new array of data with every item that has a video id 
       const videoIds = data.items.map(item => item.id.videoId);
        
        return res.json({ videoIds });

    }catch{
      console.log('error fetching from youtube api')
      return res.status(500).json({ error: 'An error occurred while fetching data from the youtube API' })
    }
})



// ----------------------------< Port Connection >---------------------------------------


// checks if the server successfully launched
// make sure in the callback functions REQ always comes first

app.listen(port, (err) => {
   if(err){
      console.log('server error', err)
      return
   }else{
      console.log(`listening on port ${port}`)
   }
});

// quick test route to the root endpoint/ good to test with postman
// postman is just an artificial client so you can see what a user will see
// app.get('/', (req, res)=> {
//    res.status(200).send({code: "0", message: "ok"})   
// });

// test token
// app.get('/test', (req,res)=> {
//    if()
// })

// JWT token - give the client a token, this makes it so they can securely access the env key
// you need an id, limit & integrate the limit into the expiry time
// then put it in a payload that is data about the token


// ----------------------------< Token/Verify Function >---------------------------------------

// token function global 

function createToken() {
   let id = crypto.randomInt(10000);
   const secondsPerDay = 86400; // 60 seconds * 60 minutes * 24 hours   
   const expiry = Math.floor(Date.now() / 1000) + (7 * secondsPerDay);
   const payload = {
      id: id,
      expires: expiry,
   };
   return jwt.sign(payload, jwt_key);
}


// ----------------------------< Register Route >---------------------------------------


app.post('/register', async (req, res)=> {
      try{
         const existingUser = await User.findOne({username: req.body.username})
         const existingEmail = await User.findOne({email: req.body.email})

         if(existingUser){
            return res.status(400).json({error: "username is taken"})
         } else if(existingEmail){
            return res.status(400).json({error: "There is an account associated with this email already"})
         }else{
            console.log('User Data:', req.body)
            // Hash the password before storing it in the database
             // 10 is the saltRounds
            const hashedPassword = await bcrypt.hash(req.body.pass, 10);
          

           //  XSS implementation - sanitization for Cross-Site Scripting (XSS) attacks.
            const sanitizedData = {
               fName: xss(req.body.fName),
               lName: xss(req.body.lName),
               username: xss(req.body.username),
               pass: hashedPassword, // Store the hashed password
               email: xss(req.body.email),
           };

           const newUser = await User.create(sanitizedData);


        // Send token in Authorization header for the response object
        let token = createToken();
      

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
            token: token,
         });

         }  
         
      }catch(error){
         res.status(400).send({error: error.message})
      }
})


// ----------------------------< Login Route >---------------------------------------


app.post('/login', async (req, res)=> {
   
   
  try{
      const reqUser = req.body.username;
      const reqPass = req.body.pass;

      const matchedAccount = await User.findOne({username: reqUser})
     

      if(!matchedAccount){
         console.log('no account with that username')
         return res.status(400).json({error: "no account with that username"})
      } 

      const passwordMatch = await bcrypt.compare(reqPass, matchedAccount.pass);
      
      if(passwordMatch){
        
         console.log(`successful Login Welcome ${matchedAccount.username}`)
         
         let token = createToken();
         return res.status(201).json({
            success: true,
            message: "User logged successfully",
            user: matchedAccount,
            userID: matchedAccount._id,
            username: matchedAccount.username,
            fullName: matchedAccount.fName + ' ' + matchedAccount.lName,
            email: matchedAccount.email,
            token: token
         });

      }else{
        
         console.log('wrong username or password')
         return res.status(400).json({error: "wrong username or password"})
      }  
   }catch{
      res.status(500).json({ error: "something went wrong"  });
  }
});

// ----------------------------< Update Favorites >---------------------------------------


app.post('/updateFavorites', async (req, res)=> {
   try {

      console.log('Received updateFavorites request:', req.body);
     
      const bodyObj = req.body;
      const type = bodyObj.type;
      const favorites = bodyObj.gameData;
      const userID = bodyObj.userID;
      
      const typeQuery = req.query.type;

      // const gameData = JSON.parse(favorites); // turns it into a javascript object 

    // check the database for existing favorites for that user using the userID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
  }

       //debug
      // console.log(type)
      // console.log(userID)
      
      if(type === 'login'){

       
          if(user.favorites && user.favorites.length > 0){
            console.log('favorites found!')
            return res.status(200).json({ data: user.favorites});
         } else{
            return res.status(400).json({ error: 'no favorites were found'});
         }     
        
      } else if(type === 'favorites'){ 
          //find the right user and push the favorites to the users database
          // Find the corresponding user in the database
          console.log(user)

            // Update the user's favorites with the new data
            
                  user.favorites.push(favorites);
               

                 // Save the updated user object back to the database
                 await user.save();


         // Send a response back to the client
         console.log('successfully stored')
         return res.status(200).json({ message: 'successfully added to favorites' });

      } else if(type === 'deleteFavorite'){ 

         let match = false;
         console.log(user);

          // match the data coming from the client to one of the objects in the favorites array
           for(let i = 0; i < user.favorites.length; i++ ){
              if(user.favorites[i].id === favorites.id){
                  user.favorites.splice(i, 1)
                  await user.save();
                  console.log('successfully Deleted')
                  match = true;
                  break; // Exit the loop once the item is found and deleted
                
              } 
           }

           if (match) {
            return res.status(200).json({ message: 'Successfully deleted favorite' });
          } else {
            console.log('Could not find match');
            return res.status(200).json({ message: 'Could not find index to delete' });
          }
      }


   
  } catch (error) {
      console.error('Error updating favorites:', error);
      return res.status(500).json({ error: 'Something went wrong' });
  }
})



// ----------------------------< Search Route >---------------------------------------

// search database
app.get('/search',(req, res)=> {
    
})






