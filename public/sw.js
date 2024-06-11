// a service worker always has to attend to both the server and the client
// it works as a proxy in between both

const version = 1;

const isProduction = self.location.hostname !== 'localhost';
const baseURL = isProduction ? '' : 'http://localhost:3500';


// ================================ Install ========================================

self.addEventListener('install', (e) => {
    console.log('service worker installed') 

    e.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll(['/src/components/Header/slideshow/slideshow.jsx', '/src/components/Header/slideshow/slideshow.css', '/index.html'])
        })
    )
})

// ================================ Activate ========================================

self.addEventListener('activate', (e) => {
    // this runs when the service worker has replaced an old version
    console.log('service worker activated - this will not function will not be used until the page reloads') 

    // The self.clients.claim() method ensures that any pages controlled by the service worker will immediately start using the new version of the service worker without needing to be reloaded.
    e.waitUntil(self.clients.claim());
});



// ================================ Fetch ========================================

self.addEventListener('fetch', (e) => {

    // this will intercept any fetch that is going on in your pwa\
    // if you have multiple fetches happening make sure to identify the specific URL you want to effect


    
    if (e.request.url.includes(baseURL + '/api/games')) {
        e.respondWith(
            fetch(e.request)
                .then(response => {
                    const clonedResponse = response.clone();
                    return caches.open('dynamic').then(cache => {
                        cache.put(e.request, clonedResponse);
                        console.log('Updated dynamic cache');
                        return response; // return it back to the browser so the data can be seen for the client
                    });
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    return caches.match(e.request).then(cachedResponse => {
                        if (cachedResponse) {
                            console.log('Retrieved from cache');
                            return cachedResponse;
                        }
                    });
                })
        );
    }
        // the browser is making requests for all the provided files to make the app run
        // For other requests (static assets, fonts, ect), try fetching from cache first, then from network
        // this will make it load way faster as well if the website has already cached everything while still online
     else {
        // Check if the request is for the login or register endpoint
        const isLoginRequest = e.request.url.includes(`${baseURL}/login`);
        const isRegisterRequest = e.request.url.includes(`${baseURL}/register`);
        const isFavoritesRequest = e.request.url.includes(`${baseURL}/updateFavorites`);
    
        // If the request is not for login or register, try fetching from cache first, then from network
        if (isLoginRequest || isRegisterRequest || isFavoritesRequest) {
            return;
        } else{
            e.respondWith(
                // Try to match the request with cache data
                caches.match(e.request) 
                    .then(cachedResponse => {
                        return cachedResponse || fetch(e.request); // If cache data is found, return it; otherwise, fetch from network
                    })
                    .catch(err => {
                        console.log("error", err);
                        return caches.match('/index.html'); // Fallback to index.html in case of error
                    }) 
            );
        }
    }
    
});




// ================================ Message ========================================


 self.addEventListener('message', (e) => {
    console.log('pass a message'); // via postMessage method on front end
 
    
});  


// self.addEventListener('message', (e) => {
//     console.log('Message received:', e.data);
//     if (e.data && e.data.type === 'api-data') {
//         const data = e.data.data;
//         console.log('Data here?:', data);

//         caches.open('dynamic')
//             .then(cache => {
//                 cache.put('api-data', new Response(JSON.stringify(data)));
//                 console.log('API data stored in cache');
//             })
//             .catch(error => {
//                 console.error('Error opening cache:', error);
//             });
//     }
// });


// =================================================================================


    // console.log('fetch request for', e.request.url, 'from', e.clientId) 


// self.addEventListener('fetch', (e) => {

//        //  e.request is sent each time the webpage asks for any data
//      //  the request keyword is built into the fetch eventlistener

//         // now we check the cache for the preExisting info and if its new save it
//         e.respondWith(
//             caches.match(e.request)
//             .then(cacheResponse => {
//                 return (
//                 // check the catch then do another fetch if missing the required data
//                     cacheResponse || fetch(e.request) // if it finds an exact full cache match it will just return
//                         .then(fetchResponse => {
//                             if(!fetchResponse.ok){
//                                 throw new Error("there was a problem with the response")
//                             }
    
//                             // if that condition runs false we have a response form the server
//                             return caches.open('dynamic').then(cache => {
//                                 cache.put(e.request, fetchResponse.clone()) // make a copy for the cache data
//                                 return fetchResponse // return it back to the browser so the data can be seen for the client
//                                 // the service worker works as a proxy that gets in between the server and the client for saving files
//                             })
//                         })
//                 )
//             })
//             .catch(err => {
//                 //if there is an error intercepting the files, what do you want to do to handle it ?
         
//                 return caches.match('/404.html');
//             })
//         );
// });
