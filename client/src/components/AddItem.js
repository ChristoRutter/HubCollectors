import React, {useState} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';



const AddItem = (props) =>{

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [errors, setError] = useState({})


    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/collectors",
        {
            name,
            description,
            image
        },
        {withCredentials: true}
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setError(err.response.data.errors)
        })

    }

    return(
        <div class="
        mx-96
        my-24
    ">

            <Link  to={"/home"}>Return Home</Link>
            <header >
                <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Add a Item to your Collection</h1>
                
            </header>

            <form onSubmit={submitHandler}>

                <div>
                    <label class="sr-only">Name</label>
                    <input 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name"

                        value={name} onChange={(e)=>setName(e.target.value)} type="text" />

                    
                    {
                        errors.name?
                        <span>{errors.name.message}</span>
                        :null
                    }
                </div>

                <div>
                    <label class="sr-only">Image</label>
                    <input 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Image"

                        value={image} onChange={(e)=>setImage(e.target.value)} type="file" />

                    
                    {
                        errors.image?
                        <span>{errors.image.message}</span>
                        :null
                    }
                    
                </div>

                <div>
                    <label class="sr-only">Description</label>
                    <input
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Description"

                        value={description} onChange={(e)=>setDescription(e.target.value)} type="" />

                    
                    {
                        errors.description?
                        <span>{errors.description.message}</span>
                        :null
                    }
                </div>

                

                <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    mt-2
                    ">Add Item</button>


            </form>
            
        </div>
    )
}


export default AddItem;