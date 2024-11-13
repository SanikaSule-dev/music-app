import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticatedGETRequest } from '../utils/serverHelper';
import HoverComponent from '../components/Hover';

const LibraryComponent = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      const response = await authenticatedGETRequest("/playlists/get/me");
      console.log(response); 
      setMyPlaylists(response); 
    };
    getData();
  }, []);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-700 to-purple-900 overflow-auto px-5 py-7'>
      <div className='h-1/10 w-full text-white font-bold text-3xl px-5 py-3'>
        My Playlists
      </div>
      <div className='h-9/10 w-full flex grid grid-cols-5 gap-3 px-3 py-5'>
        {myPlaylists.map((item, index) => (
          <CardComponent
            key={index}
            name={item.title}
            image={item.thumbnail}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

const CardComponent = ({ image, name, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col cursor-pointer relative rounded-lg bg-black" style={{ width: "180px", height: "260px" }} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/user/display/playlist/${id}`)}
    >
      <div className="px-3 pt-5" style={{height: "170px" }}>
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={name} />
      </div>
      
      <div className="px-3 mt-5">
        <p className='font-bold text-white text-xl'>{name}</p>
      </div>
      
      {/* Conditionally render HoverComponent */}
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <HoverComponent />
        </div>
      )}
    </div>
  );
};

export default LibraryComponent;
