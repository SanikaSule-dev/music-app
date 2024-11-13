import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { authenticatedPOSTRequest } from "../utils/serverHelper";

const CreatePlaylistModal = ({ closeModal }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await authenticatedPOSTRequest(
            "/playlists/create",
            { title: playlistName, thumbnail: playlistThumbnail, tracks: [] }
        );
        if (response._id) {
            closeModal();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" 
            onClick={closeModal}
        >
            <div
                className="bg-gradient-to-b from-black via-indigo to-purple-900 rounded-md p-8 h-3/5 w-3/5 border border-white rounded-lg items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation(); // Prevents click propagation to the outer div
                }}
            >
                
                    <div className="text-white mt-5 mb-5 font-bold text-3xl">
                        Create Playlist
                    </div>
                    <div className="space-y-3 flex flex-col justify-center items-center">
                        <TextInput
                        placeholder="Playlist Name"
                        value={playlistName}
                        setValue={setPlaylistName}
                        />
                        <TextInput
                        placeholder="Thumbnail"
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                        />
                        <div
                        className="bg-white w-1/4 rounded-full flex font-semibold justify-center items-center py-3 mt-7 cursor-pointer"
                        onClick={createPlaylist}
                        >
                            Create
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
