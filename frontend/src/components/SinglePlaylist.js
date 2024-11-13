import React, { useState, useEffect } from 'react';
import SingleSongCard from './SingleSongCard';
import { authenticatedGETRequest } from "../utils/serverHelper";
import { useParams } from 'react-router-dom';

const PlaylistDisplayComponent = () => {
    const [playlistDetails, setPlaylistDetails] = useState(null); // Initially set to null
    const { playlistID } = useParams();
    console.log(playlistID);

    useEffect(() => {
        const getData = async () => {
            const response = await authenticatedGETRequest("/playlists/get/playlist/" + playlistID);
            setPlaylistDetails(response); 
            console.log(response);
        };
        getData();
    }, [playlistID]);

    if (!playlistDetails) {
        return null; 
    }

    return (
        playlistDetails._id ? (
                <div className='h-full w-full items-center justify-center bg-gradient-to-b from-black via-indigo-700 to-purple-900 flex flex-col text-white'>
                    <div className='h-2/5 w-full flex border-b border-white px-10 py-9 items-center gap-7'>
                        <div className='rounded-lg' style={{ width: '170px', height: '170px' }}>
                            <img className='w-full h-full object-cover' src={playlistDetails.thumbnail} alt={playlistDetails.title} />
                        </div>

                        <div className='text-white space-y-3'>
                            <p className='font-extrabold text-5xl px-5 pt-12'>
                                {playlistDetails.title}
                            </p>
                        </div>
                    </div>

                    {/* Title Row for Track List */}
                    <div className='w-full px-10 py-2'>
                        <div className='grid grid-cols-2 gap-2 font-sm text-gray-300'>
                            <p><span className='ml-11 mr-10'>#</span>Title</p>
                            <p style={{ marginLeft: '350px' }}>Duration</p>
                        </div>
                        <hr />
                    </div>

                    {/* Scrollable Track List */}
                    <div className='h-full w-full px-10 py-2 overflow-y-auto cursor-pointer'>
                        {playlistDetails.tracks && playlistDetails.tracks.length > 0 ? (
                            playlistDetails.tracks.map((item, index) => (
                                <SingleSongCard 
                                    key={index} 
                                    image={item.thumbnail} 
                                    name={item.title} 
                                    artist={item.artist} 
                                    duration={item.duration} 
                                    track={item.track}
                                    id={item._id}
              />
                            ))
                        ) : (
                            <p>No tracks available</p> 
                        )}
                    </div>
                </div>
        ) : null 
    );
};

export default PlaylistDisplayComponent;
