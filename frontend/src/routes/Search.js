import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { authenticatedGETRequest } from '../utils/serverHelper';
import SingleSongCard from '../components/SingleSongCard';

const SearchComponent = () => {
  const [isFocused, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to search songs
  const searchSong = async () => {
    if (!searchText) return;  

    try {
      const response = await authenticatedGETRequest("/songs/get/songname/" + searchText);
      console.log(response);

      if (response && Array.isArray(response) && response.length > 0) {
        setSongData(response); 
        setErrorMessage("");   
      } else if (response && response.title) {
        setSongData([response]); 
        setErrorMessage("");     
      } else {
        setSongData([]);         
        setErrorMessage(`No results found for "${searchText}"`);  
      }

      setSearchText(""); 

    } catch (error) {
      console.error("Error fetching songs:", error);
      setErrorMessage("An error occurred while searching for songs. Please try again later.");
    }
  };

  return (
    <div className='h-full w-full flex flex-col items-center bg-gradient-to-b from-black via-indigo-700 to-purple-900 overflow-auto py-7'>
      
      {/* Search Bar */}
      <div className='h-1/10 w-full flex justify-center p-1'>
        <div className={`w-1/2 rounded-3xl px-5 py-2 bg-purple-300 flex gap-2 text-black ${isFocused ? "border border-white" : ""}`}>
          <Icon icon="icon-park-outline:search" style={{ color: "black", fontSize: "30px" }} className="mr-3" />
          <input 
            type="text" 
            placeholder='What would you like to listen?' 
            className='w-full bg-transparent focus:outline-none'
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();  // Trigger search when Enter is pressed
              }
            }} 
          />
        </div>
      </div>

      {/* Error or Result */}
      {errorMessage && (
        <div className="text-red-400 pt-10">{errorMessage}</div>
      )}

      {/* Display search results */}
      
        {songData.length > 0 ? (
          <div className='h-9/10 w-full px-5 py-5 flex flex-col items-center'>
            {songData.map((item, index) => (
              <SingleSongCard 
                key={index} 
                image={item.thumbnail} 
                name={item.title} 
                artist={item.artist} 
                duration={item.duration} 
                track={item.track}
                id={item._id}
              />
            ))}
          </div>
        ) : (
          !errorMessage && (
            <div className="text-gray-400 pt-10">
              Enter a song name to start searching.
            </div>
          )
        )}

    </div>
  );
};

export default SearchComponent;
