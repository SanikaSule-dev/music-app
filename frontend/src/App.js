import React, { useState, useContext } from 'react';
import "./output.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PlayerContext } from './context/PlayerContext';
import UserSignUpComponent from "./user/UserSignUp";
import UserLoginComponent from "./user/UserLogin";
import SideBarComponent from './components/SideBar';
import PlayerComponent from './components/Player';
import DisplayComponent from './user/Display';
import CreatePlaylistModal from './modals/CreatePlaylistModal';
import AddToPlaylistModal from './modals/AddToPlaylistModal';
import { authenticatedPOSTRequest } from './utils/serverHelper';
import groupImage from "./assets/Group2.png";

function App() {
  const [cookie] = useCookies(["token"]);

  return (
    <Router>
      <div className="w-screen h-screen font-urbanist">
        <Routes>
          <Route path="/" element={<HelloComponent />} />

          {cookie.token ? (
            <Route path="/*" element={<AuthenticatedRoutes />} />
          ) : (
            <>
              <Route path="/user/signup" element={<UserSignUpComponent />} />
              <Route path="/user/login" element={<UserLoginComponent />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

const AuthenticatedRoutes = () => {
  const {audioRef, track} = useContext(PlayerContext);

  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const toggleCreatePlaylistModal = () => setCreatePlaylistModalOpen(!createPlaylistModalOpen);
  const toggleAddToPlaylistModal = () => setAddToPlaylistModalOpen(!addToPlaylistModalOpen);

  const addSongToPlaylist = async (playlistID) => {
    const songID = track._id;

    const payload = {playlistID, songID};
    const response = await authenticatedPOSTRequest(
        "/playlists/add/song",
        payload
    );
    console.log(payload);
    if(response && response._id){
        toggleAddToPlaylistModal();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="h-9/10 w-full flex flex-grow">
        <div className="h-full w-1/4">
          <SideBarComponent toggleCreatePlaylistModal={toggleCreatePlaylistModal} />
        </div>
        <div className="w-3/4 h-full flex-grow overflow-auto">
          {createPlaylistModalOpen && <CreatePlaylistModal closeModal={toggleCreatePlaylistModal} />}
          {addToPlaylistModalOpen && (
            <AddToPlaylistModal 
              closeModal={toggleAddToPlaylistModal} 
              addSongToPlaylist={addSongToPlaylist} // Pass function here
            />
          )}
          <Routes>
            <Route path="/user/display/*" element={<DisplayComponent />} />
            <Route path="*" element={<Navigate to="/user/display/home" />} />
          </Routes>
        </div>
      </div>
      <div className="h-1/10 w-full">
        <PlayerComponent openAddToPlaylistModal={toggleAddToPlaylistModal} />
        <audio ref={audioRef} src={track.track} preload='auto'></audio>
      </div>
    </div>
  );
};

const HelloComponent = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-black via-indigo-700 to-purple-900 items-center justify-center">
      <div className="logo m-5">
        <img src={groupImage} alt="logo" />
      </div>
      <div className="button flex m-5 items-center justify-center">
        <Link to="/user/signup">
          <button className="bg-white text-black text-2xl font-semibold p-5 rounded-full">
            Let's go
          </button>
        </Link>
      </div>
    </div>
  );
};

export default App;

