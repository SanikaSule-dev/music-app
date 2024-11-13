import React, { useEffect, useState } from 'react';
import SongCardComponent from '../components/SongCard';
import { authenticatedGETRequest } from '../utils/serverHelper';

const UserHomeComponent = () => {
    const [mySongs, setMySongs] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await authenticatedGETRequest("/songs/get/first10songs");
            if (response && response.songs) {
                setMySongs(response.songs);
            } else {
                console.error("Unexpected response format:", response);
            }
        };
        getData();     
    }, []);

    return (
        <div className='h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-700 to-purple-900 overflow-auto'>
            <div className='h-9/10 w-full flex flex-col px-5 py-2 gap-7'>
                <div className='gap-3'>
                    <div className='text-white font-bold text-3xl px-5 py-3'>
                        Music Just For You
                    </div>

                    <div className='flex p-3 gap-3 grid grid-cols-5'>
                        {mySongs.map((item, index) => (
                            <SongCardComponent 
                                key={index} 
                                image={item.thumbnail} 
                                name={item.title} 
                                artist={item.artist} 
                                id={item._id} 
                                track={item.track}
                            />
                        ))}
                    </div>
                </div> 
            </div>   
        </div>
    );
}

export default UserHomeComponent;
