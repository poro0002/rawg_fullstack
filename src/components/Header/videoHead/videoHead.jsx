import '../videoHead/videoHead.css'
import { useState, useEffect } from 'react';

   let apiKey = "29c74353cb064147baadabe161a31ef5"
   let gameId = 3498;
//    let searchVal = "League Of Legends"
    const myHeaders = new Headers({'Content-Type': 'application/json'});
    const mainRequest = new Request(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`, {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders,
      });

function VideoHead({videoUrl, imgUrl, topPosition}) {

    useEffect(() => {
        fetch(mainRequest)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => err.message)
    },[])

    let url1 = 'https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt46220ab041c41c30/6182fbf894e50d5a63800f26/Draven_Riven.mp4'
    let url2 = 'https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt15125ee1081e666a/6182fc684f03d1667573869b/Camille_Jhin.mp4'

    return (
        <>
        <header className='video-container'>
      {videoUrl && (
        <>
        <div className="png-container">
            <img className='video-png-overlay' src="src/Content/League of Legends Logo - 1280x831.png" alt="" />
        </div>
                <video
                    id="youtube-video"
                    width="100%"
                    height="100%"
                    src={url1}
                    frameBorder="0"
                    autoPlay
                    allowFullScreen
                    muted
                    loop
                ></video>
              </> 
            )}
             </header>
        <header className='photo-container' style={{top: topPosition}}>
            {imgUrl && (
                <img
                    id="header-photo"
                    src={imgUrl}
                    alt=""
                    style={{ width: '100%', height: 'auto' }}
                />
            )}
       </header>
    </>
    );
}

export default VideoHead;