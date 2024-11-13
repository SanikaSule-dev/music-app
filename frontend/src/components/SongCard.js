import React, { useContext, useState } from 'react';
import HoverComponent from './Hover';
import { PlayerContext } from '../context/PlayerContext';

const SongCardComponent = ({ image, name, artist, track, duration, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {playWithId} = useContext(PlayerContext);

  const handleSongClick = () => {
    playWithId({
      track: track,
      _id: id,
      title: name,
      artist: artist,
      thumbnail: image,
      duration: duration,
    });
  }
  
  return (
    <div
      className="flex flex-col cursor-pointer relative rounded-lg bg-black pt-3"
      style={{ width: "180px", height: "280px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSongClick}
    >
      <div className="px-3 pt-1" style={{ height: "165px" }}>
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={name} />
      </div>
      
      <div className="px-3 mt-3">
        <p className='font-bold text-white text-lg'>{name}</p>
        <p className='font-semibold text-white text-sm'>{artist}</p>
      </div>
      
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <HoverComponent />
        </div>
      )}
    </div>
  );
};

export default SongCardComponent;
