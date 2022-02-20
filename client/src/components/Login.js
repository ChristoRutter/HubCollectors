import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    username: username,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Login</h1>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div >
                    <label class="sr-only">Username</label>
                    <input
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label class="sr-only">Password</label>
                    <input
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    mt-2
                    ">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};


export default Login