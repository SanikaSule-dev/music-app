import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHomeComponent from "../routes/UserHome";
import SearchComponent from "../routes/Search";
import LibraryComponent from "../routes/Library";
import PlaylistDisplayComponent from "../components/SinglePlaylist";

const DisplayComponent = () => {      
    return (
        <div className="w-full h-full">
            <Routes>
                <Route path="home" element={<UserHomeComponent/>}/>
                <Route path="search" element={<SearchComponent/>}/>
                <Route path="library" element={<LibraryComponent/>}/>
                <Route path="playlist/:playlistID" element={<PlaylistDisplayComponent/>} />
            </Routes>
        </div>
    );
};

export default DisplayComponent;
