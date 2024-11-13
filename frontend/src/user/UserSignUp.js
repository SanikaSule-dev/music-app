import { useState } from "react";
import { useCookies } from "react-cookie";
import React from "react";
import groupImage from "../assets/Group2.png";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { unauthenticatedPOSTRequest } from "../utils/serverHelper";

const UserSignUpComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUp = async () => {
        if(password != confirmPassword) {
            alert("password do not match");
            return;
        }
        const data = {email, password, firstName, lastName, userName};
        const response = await unauthenticatedPOSTRequest("/auth/register", data);
        if(response && !response.err) {
            console.log(response);
            const token = response.token;
            const date = new Date();
            date.setHours(date.getHours() + 5);
            setCookie("token", token, {path: "/", expires: date});
            alert("Success");
            navigate("/user/home");
        } else{
            alert("Failure");
        }
    };

    return <div className="w-full h-full bg-gradient-to-b from-black via-indigo to-purple-900 flex flex-col items-center overflow-y-auto">
        <div className="logo p-30 m-6">
            <img src={groupImage} className="h-24 w-auto" alt="logo"></img>
        </div>

        <div className="w-1/2 border-b border-white"></div>

        <div className="inputRegion flex flex-col items-center justify-center w-1/2 p-2">
            <div className="font-semibold text-xl text-white m-7">Sign Up</div>

            <TextInput placeholder = "Email ID" value={email} setValue={setEmail} />

            <PasswordInput placeholder = "Create Password" value={password} setValue={setPassword}/>

            <PasswordInput placeholder = "Confirm Password" value={confirmPassword} setValue={setConfirmPassword}/>

            <TextInput placeholder = "First Name" value={firstName} setValue={setFirstName}/>

            <TextInput placeholder = "Last Name" value={lastName} setValue={setLastName}/>

            <TextInput placeholder = "Username" value={userName} setValue={setUserName}/>

            <div className="w-full flex items-center justify-center m-7">
                <button className="bg-purple-400 text-lg font-semibold p-2 px-10 rounded-full" onClick={(e) => {
                    e.preventDefault(); 
                    signUp();
                }}>SIGN UP</button>
            </div>

            <div className="w-full border-b border-white mt-3"></div>

            <div className="font-semibold text-xl text-white m-7">Already have an account?</div>

            <div className="w-full flex items-center justify-center mb-5">
                <button className="bg-purple-400 text-lg font-semibold p-2 px-10 rounded-full"><Link to="/user/login">LOG IN</Link></button>
            </div>
        </div>
    </div>;
};

export default UserSignUpComponent;