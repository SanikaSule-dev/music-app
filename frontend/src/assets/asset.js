import barfiImage from "../assets/barfi.png";
import aashiyanTrack from "../assets/Aashiyan.mp3";
import dearImage from "../assets/dearZindagi.png";
import loveYouZindagiTrack from "../assets/Love_You_Zindagi.mp3";
import aashiquiImage from "../assets/aashiqui2.png";
import tumHiHoTrack from "../assets/Tum Hi Ho.mp3";
import rockstarImage from "../assets/rockstar.png";
import nadaanParindeTrack from "../assets/Nadaan Parinde.mp3";
import yehImage from "../assets/yehJawaniHaiDeewani.png";
import balamPichkariTrack from "../assets/Balam Pichkari.mp3";

export const songData = [
    {
        id: 0,
        name: "Aashiyan",
        thumbnail: barfiImage,
        songTrack: aashiyanTrack,
        artist: "Shreya Ghoshal, Nikhil Paul George",
        duration: "3:56"
    },
    {
        id: 1,
        name: "Love You Zindagi",
        thumbnail: dearImage,
        songTrack: loveYouZindagiTrack,
        artist: "Jasleen Royal, Amit Trivedi",
        duration: "2:45"
    },
    {
        id: 2,
        name: "Tum Hi Ho",
        thumbnail: aashiquiImage,
        songTrack: tumHiHoTrack,
        artist: "Arijit Singh, Mithoon",
        duration: "4:22"
    },
    {
        id: 3,
        name: "Nadaan Parinde",
        thumbnail: rockstarImage,
        songTrack: nadaanParindeTrack,
        artist: "Mohit Chauhan, A R Rahman",
        duration: "6:24"
    },
    {
        id: 4,
        name: "Balam Pichkari",
        thumbnail: yehImage,
        songTrack: balamPichkariTrack,
        artist: "Vishal Dadlani, Shalmali Kholgade, Pritam",
        duration: "4:50"
    },
]

export const AlbumData = [
    {
        id: 0,
        name: "Barfi",
        thumbnail: barfiImage,
        tracks: [
            songData[0], songData[1], songData[2], songData[3]
        ],
        artist: "Pritam",
        duration: "3:56"
    },
    {
        id: 1,
        name: "Dear Zindagi",
        thumbnail: dearImage,
        tracks: [
            {
                name: "Love You Zindagi",
                artist: "Amit Trivedi, Jasleen Royal",
                duration: "3:52"
            },
            {
                name: "Tu Hi Hai",
                artist: "Amit Trivedi, Arijit Singh",
                duration: "3:19"
            },
            {
                name: "Taarefon Se",
                artist: "Amit Trivedi, Arijit Singh",
                duration: "4:38"
            },
            {
                name: "Let's Break Up",
                artist: "Amit Trivedi, Vishal Dadlani",
                duration: "4:05"
            },
            {
                name: "Just Go To Hell",
                artist: "Amit Trivedi, Sunidhi Chauhan",
                duration: "5:35"
            },
            {
                name: "Love You Zindagi-Club Remix",
                artist: "Amit Trivedi, Alia Bhatt",
                duration: "3:34"
            },
            {
                name: "Ae Zindagi Gale Laga Le-Take 1",
                artist: "Ilaiyaraaja, Amit Trivedi, Arijit Singh",
                duration: "2:51"
            },
            {
                name: "Ae Zindagi Gale Laga Le-Take 2",
                artist: "Ilaiyaraaja, Amit Trivedi, Alia Bhatt",
                duration: "3:05"
            },
        ],
        artist: "Amit Trivedi",
        duration: "2:45"
    },
    {
        id: 2,
        name: "Aashiqui 2",
        thumbnail: aashiquiImage,
        tracks: [
            {
                name: "Tum Hi Ho",
                artist: "Mithoon, Arijit Singh",
                duration: "4:21"
            },
            {
                name: "Sunn Raha Hai(Male Version)",
                artist: "Ankit Tiwari",
                duration: "6:30"
            },
            {
                name: "Chahun Main Ya Na",
                artist: "palak Muchhal, Arijit Singh",
                duration: "5:04"
            },
            {
                name: "Hum Mar Jayenge",
                artist: "Tulsi Kumar, Arijit Singh",
                duration: "5:06"
            },
            {
                name: "Meri Aashiqui",
                artist: "Palak Muchhal, Arijit Singh",
                duration: "4:26"
            },
            {
                name: "Piya Aaye Na",
                artist: "Tulsi Kumar, KK",
                duration: "4:46"
            },
            {
                name: "Bhula Dena",
                artist: "Mustsfa Zahid",
                duration: "4:00"
            },
            {
                name: "Aasan Nahin Yahan",
                artist: "Arijit Singh",
                duration: "3:34"
            },
            {
                name: "Sunn Raha Hai(Female Version)",
                artist: "Shreya Ghoshal",
                duration: "5:14"
            },
            {
                name: "Milne Hai Mujhse Aayi",
                artist: "Arijit Singh",
                duration: "4:55"
            },
            {
                name: "Aashiqui(The Love Theme)",
                artist: "Mithoon",
                duration: "2:42"
            },
            {
                name: "Tum Hi Ho(Remix)",
                artist: "Mithoon, Arijit Singh, DJ Shadow Dubai, Dj Javed",
                duration: "3:57"
            },
        ],
        artist: "Mithoon, Ankit Tiwari, Jeet Gannguli",
        duration: "4:22"
    },
    {
        id: 3,
        name: "Rockstar",
        thumbnail: rockstarImage,
        tracks: [
            {
                name: "Phir Se Ud Chala",
                artist: "Mohit Chauhan",
                duration: "4:28"
            },
            {
                name: "Jo Bhi Main",
                artist: "Mohit Chauhan",
                duration: "4:33"
            },
            {
                name: "Katiya Karun",
                artist: "Harshdeep Kaur",
                duration: "3:58"
            },
            {
                name: "Kun Faya Kun",
                artist: "A R Rahman, Javed Ali, Mohit Chauhan",
                duration: "7:50"
            },
            {
                name: "Sheher Mein",
                artist: "Mohit Chauhan, Karthik",
                duration: "4:01"
            },
            {
                name: "Haawa Haawa",
                artist: "Mohit Chauhan",
                duration: "5:39"
            },
            {
                name: "Aur Ho",
                artist: "Mohit Chauhan, Alma Ferovic",
                duration: "5:32"
            },
            {
                name: "Tango For Taj",
                artist: "A R Rahman",
                duration: "2:58"
            },
            {
                name: "Tum Ko",
                artist: "Kavita Krishnamurthy",
                duration: "5:45"
            },
            {
                name: "The Dictionary Of Fa",
                artist: "A R Rahman",
                duration: "2:40"
            },
            {
                name: "Nadaan Parinde",
                artist: "A R Rahman, Mohit Chauhan",
                duration: "6:24"
            },
            {
                name: "Tum Ho",
                artist: "Mohit Chauhan, Suzanne D'souza",
                duration: "5:16"
            },
            {
                name: "Saadda Haq",
                artist: "Mohit Chauhan",
                duration: "6:02"
            },
            {
                name: "Meeting Place",
                artist: "Ranbir Kapoor",
                duration: "1:09"
            },
            {
                name: "Jaagran",
                artist: "Mohit Chauhan",
                duration: "1:03"
            },
        ],
        artist: "A R Rahman",
        duration: "6:24"
    },
    {
        id: 4,
        name: "Yeh Jawaani Hai Dewaani",
        thumbnail: yehImage,
        tracks: [
            {
                name: "Badtameez Dil",
                artist: "Pritam, Benny Dayal, Shefali Alvares",
                duration: "4:12"
            },
            {
                name: "Balam Pichkari",
                artist: "Pritam, Vishal Dadlani, Shalmali Kholgade",
                duration: "4:48"
            },
            {
                name: "Ilahi",
                artist: "Pritam, Arijit Singh",
                duration: "3:48"
            },
            {
                name: "Kabira",
                artist: "Pritam, Tochi Rana, Rekha Bhardwaj",
                duration: "3:43"
            },
            {
                name: "Dilliwali Girlfriend",
                artist: "Pritam, Arijit Singh, Sunidhi Chauhan",
                duration: "4:20"
            },
            {
                name: "Subhanallah",
                artist: "Pritam, Sreeram, Shilpa Rao",
                duration: "4:09"
            },
            {
                name: "Ghagra",
                artist: "Pritam, Rekha Bhardwaj, Vishal Dadlani",
                duration: "5:04"
            },
            {
                name: "Kabira(Encore)",
                artist: "Pritam, Harshdeep Kaur, Arijit Singh",
                duration: "4:30"
            },
            {
                name: "Ilhai(Reprise)",
                artist: "Pritam, Mohit Chauhan",
                duration: "3:34"
            },
        ],
        artist: "Pritam",
        duration: "4:50"
    },
]