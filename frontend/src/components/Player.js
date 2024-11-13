import React, { useContext } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { PlayerContext } from '../context/PlayerContext';

const PlayerComponent = ({ openAddToPlaylistModal }) => {
  const {track, seekBar, seekBg, playStatus, play, pause, time } = useContext(PlayerContext);

  return (
    <div className='h-full w-full bg-black flex items-center text-white p-4 cursor-pointer'>
      <div className='flex items-center ml-7'>
        <div className='thumbnail flex items-center'>
          <img
            src={track.thumbnail}
            style={{ height: "50px", width: "55px" }}
            alt="Album Art"
          />
        </div>
        <div className='data flex flex-col ml-5'>
          <p className='text-lg truncate'>{track.title}</p>
          <p className='text-sm'>{track.artist}</p>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center flex-grow'>
        <div className='flex gap-4 mb-1'>
          
          {playStatus ? 
          <Icon icon="fluent:pause-20-filled" style={{ color: "white", cursor: "pointer", fontSize: "20px" }} onClick={pause}/> 
          : 
          <Icon icon="fluent:play-20-filled" style={{ color: "white", cursor: "pointer", fontSize: "20px" }} onClick={play}/>}

          <Icon
            icon="ic:round-playlist-add"
            style={{ color: "white", cursor: "pointer", fontSize: "25px" }}
            onClick={() => openAddToPlaylistModal(true)}
          />
        </div>

        <div className='flex items-center justify-center w-4/5 gap-3'>
          <p className='text-white text-sm'>{time.currentTime.minute} : {time.currentTime.second}</p>
            <div ref={seekBg} className='w-4/6 bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-gray-800 rounded-full' />
            </div>
          <p className='text-white text-sm'>{time.totalTime.minute} : {time.totalTime.second}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerComponent;

