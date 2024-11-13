// AddToPlaylistModal
import React, { useState, useEffect, useContext } from "react";
import { authenticatedGETRequest } from "../utils/serverHelper";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
    const [myPlaylists, setMyPlaylists] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await authenticatedGETRequest("/playlists/get/me");
            console.log(response)
            setMyPlaylists(response);
        };
        getData();
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" 
            onClick={closeModal}
        >
            <div
                className="bg-gradient-to-b from-black via-indigo to-purple-900 rounded-md p-8 h-3/4 w-2/6 border border-white rounded-lg items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation(); // Prevents click propagation to the outer div
                }}
            >
                <div className="text-white mt-5 mb-5 font-bold text-3xl">Add to Playlist</div>
                <div className="space-y-3 flex flex-col
                justify-center items-center">
                    {myPlaylists.map((item) => (
                        <PlaylistListComponent
                            key={item._id}
                            info={item}
                            addSongToPlaylist={addSongToPlaylist}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
    return (
        <div
            className="bg-black bg-opacity-70 w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3 rounded-md"
            onClick={() => addSongToPlaylist(info._id)}
        >
            <img src={info.thumbnail} className="w-12 h-12 rounded" alt="thumbnail" />
            <div className="text-white font-semibold text-lg">{info.title}</div>
        </div>
    );
};

export default AddToPlaylistModal;
