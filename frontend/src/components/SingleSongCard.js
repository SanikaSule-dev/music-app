import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const SingleSongCard = ({ image, name, artist, duration, id, track }) => { 
  const {playWithId} = useContext(PlayerContext);

  const handleSongClick = () => {
    playWithId({
      track: track,
      _id: id,
      title: name,
      artist: artist,
      thumbnail: image,
      duration: duration
    });
  }

    return (
      <div
        className="w-full flex hover:bg-gray-500 hover:bg-opacity-50 px-5 py-3 rounded-sm"
        style={{ height: "90px" }} onClick={handleSongClick}
      >
        <div
          className="w-16 h-16 bg-cover bg-center px-7"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        ></div>
        <div className="flex w-full">
          <div className="text-white flex justify-center flex-col pl-4 w-5/6">
            <div className="cursor-pointer text-xl">
              {name}
            </div>
            <div className="text-sm text-gray-300 cursor-pointer">
              {artist}
            </div>
          </div>
          <div className="w-1/6 flex items-center justify-center text-white text-m">
            <div>{duration}</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SingleSongCard;
  