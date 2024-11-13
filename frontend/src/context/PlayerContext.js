import { createContext, useEffect, useRef, useState } from "react";

// Create the context for the player
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null); 
    const seekBg = useRef(); 
    const seekBar = useRef(); 
    const [hasInteracted, setHasInteracted] = useState(false); 

    // Initial song data
    const initialSong = {
        _id: "67308cb07b066c083964f4b3",
        title: "Aashiyan",
        artist: "Shreya Ghoshal, Nikhil Paul George",
        track: "https://res.cloudinary.com/duylqcigk/video/upload/v1731234990/file_fjlmz1.mp3", 
        thumbnail: "https://res.cloudinary.com/duylqcigk/image/upload/v1731234992/file_zlsfvu.png",
        duration: "3:57" 
    };

    const [track, setTrack] = useState(initialSong); // Track state
    const [playStatus, setPlayStatus] = useState(false); // Play/Pause status
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    }); // Time state

    // Function to play the track
    const play = () => {
        if (hasInteracted && audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    // Function to pause the track
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Function to play a track with updated details and ensure playback starts immediately
    const playWithId = async (newTrack) => {
        setTrack(newTrack); 
        if (audioRef.current) {
            audioRef.current.pause(); 
            audioRef.current.load();  

            audioRef.current.onloadeddata = () => {
                audioRef.current.play();
                setPlayStatus(true);
            };
        }
    };

    // Effect to handle time updates and seek bar progress
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                const progress = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100);
                seekBar.current.style.width = `${progress}%`;

                seekBar.current.style.backgroundColor = `rgb(${255 - progress}, ${progress}, 255)`;

                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                });
            };
        }
    }, [audioRef]);

    // Listen for user interaction to enable play
    useEffect(() => {
        const handleUserInteraction = () => {
            setHasInteracted(true);
            play(); 
        };

        window.addEventListener("click", handleUserInteraction);
        window.addEventListener("touchstart", handleUserInteraction);

        return () => {
            window.removeEventListener("click", handleUserInteraction);
            window.removeEventListener("touchstart", handleUserInteraction);
        };
    }, []);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
