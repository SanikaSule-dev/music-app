import React from "react";
import groupImage from "../assets/Group2.png";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const SideBarComponent = ({ toggleCreatePlaylistModal }) => {
    return (
        <div className="h-full w-full bg-gradient-to-b from-black via-indigo to-purple-900 flex flex-col">
            <div className="logo p-5 flex items-center justify-center">
                <img src={groupImage} className="h-30 w-3/4" alt="logo" />
            </div>

            <div className="px-5 py-3">
                <NavLink 
                    to="/user/display/home" 
                    className={({ isActive }) =>
                        isActive ? "text-white flex items-center justify-start cursor-pointer px-5 py-2" 
                                 : "text-gray-500 flex items-center justify-start cursor-pointer px-5 py-2"
                    }
                >
                    <Icon icon="ion:home-sharp" style={{ color: "gray", fontSize: "30px" }} className="mr-3" />
                    <span className="text-lg font-semibold hover:text-white">Home</span>
                </NavLink>
                
                <NavLink 
                    to="/user/display/search" 
                    className={({ isActive }) =>
                        isActive ? "text-white flex items-center justify-start cursor-pointer px-5 py-2" 
                                 : "text-gray-500 flex items-center justify-start cursor-pointer px-5 py-2"
                    }
                >
                    <Icon icon="icon-park-outline:search" style={{ color: "gray", fontSize: "30px" }} className="mr-3" />
                    <span className="text-lg font-semibold hover:text-white">Search</span>
                </NavLink> 
                
                <NavLink 
                    to="/user/display/library" 
                    className={({ isActive }) =>
                        isActive ? "text-white flex items-center justify-start cursor-pointer px-5 py-2" 
                                 : "text-gray-500 flex items-center justify-start cursor-pointer px-5 py-2"
                    }
                >
                    <Icon icon="material-symbols:library-music" style={{ color: "gray", fontSize: "30px" }} className="mr-3" />
                    <span className="text-lg font-semibold hover:text-white">Your Library</span>
                </NavLink>
            </div>

            <div className="px-5 py-7">
                <div className="flex items-center justify-start cursor-pointer px-5 py-2" onClick={toggleCreatePlaylistModal}>
                    <Icon icon="material-symbols:add-box" style={{ color: "gray", fontSize: "30px" }} className="mr-3" />
                    <span className="text-gray-500 text-lg font-semibold hover:text-white">Create Playlist</span>
                </div>
            </div>
        </div>
    );
};

export default SideBarComponent;
