import React from "react";
import { useState } from "react";
import groupImage from "../assets/Group2.png";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { unauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";

const UserLoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = async () => {
        const data = { email, password };

        try {
            const response = await unauthenticatedPOSTRequest("/auth/login", data);

            if (response && !response.error) {
                // Handle success
                const token = response.token;
                const date = new Date();
                date.setHours(date.getHours() + 5);
                setCookie("token", token, { path: "/", expires: date });
                alert("Login Successful");
                navigate("/user/display/home");
            } else {
                // Handle failure (wrong credentials)
                alert(response.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-full h-full bg-gradient-to-b from-black via-indigo to-purple-900 flex flex-col items-center">
            <div className="logo p-30 m-6">
                <img src={groupImage} className="h-24 w-auto" alt="logo" />
            </div>

            <div className="w-1/2 border-b border-white"></div>

            <div className="inputRegion flex flex-col items-center justify-center w-1/2 p-2">
                <div className="font-semibold text-xl text-white m-7">Login to continue</div>

                <TextInput
                    placeholder="Email ID or Username"
                    value={email}
                    setValue={setEmail}
                />

                <PasswordInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />

                <div className="w-full flex items-center justify-end m-7">
                    <button
                        className="bg-purple-400 text-lg font-semibold p-2 px-10 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        LOG IN
                    </button>
                </div>

                <div className="w-full border-b border-white mt-3"></div>

                <div className="font-semibold text-xl text-white m-7">Don't have an account?</div>

                <div className="w-full flex items-center justify-center mb-3">
                    <button className="bg-purple-400 text-lg font-semibold p-2 px-10 rounded-full">
                        <Link to="/user/signup">SIGN UP</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserLoginComponent;
