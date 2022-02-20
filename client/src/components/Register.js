import React, {useState, useEffect} from 'react';
import axios from "axios";



const Register = (props)=>{

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data);
            setUser({
                username: "",
                password: "",
                confirmPassword: "",
            });
            setConfirmReg(
                "Thank you for Registering, you can now log in!",
            );
            setErrors({});
        })
        .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors);
        })


    }




return(
    <div>

        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Register</h1>
        {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
        <form onSubmit={register}>
            <div>
                <label class="sr-only">Username</label>
                {errors.username ? (
                    <span className="error-text">
                        {errors.username.message}
                    </span>
                ) : null}
                <input
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"
                    type="text"
                    name="username"
                    value={user.username}
                    
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label class="sr-only">Password</label>
                {errors.password ? (
                    <span className="error-text">
                        {errors.password.message}
                    </span>
                ) : null}
                <input
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label class="sr-only">Confirm Password</label>
                {errors.confirmPassword ? (
                    <span className="error-text">
                        {errors.confirmPassword.message}
                    </span>
                ) : null}
                <input
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="center">
                <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    mt-2
                    ">Register Me</button>
            </div>
        </form>
    </div>
)}


export default Register;