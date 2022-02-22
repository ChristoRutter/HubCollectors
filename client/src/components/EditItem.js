import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router'

const EditItem = (props) => {
    const {id} = props

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})


    useEffect(() =>{
        axios.get(`http://localhost:8000/api/collectors/${id}`)
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                setName(res.data.name)
                setImage(res.data.image)
                setDescription(res.data.description)
                
            })
            .catch((err) =>{console.log(err)})
    }, [])

    const editSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/collectors/${id}`,{
            name,
            image,
            description
        })
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
                console.log("err.response.data.errors",err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div class="
        mx-96
        my-24
    ">
            <header>
                <Link to={"/home"} > Return Home </Link>
            </header>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Edit {name}</h1>
            

            <form className="Form" onSubmit={editSubmit}>
                <div>

                <div>

                <p>
                    <label class="sr-only">Name:</label>
                    <input 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 

                        value={name} onChange={(e)=>setName(e.target.value)} type="text"></input>

                    {
                        errors.name?
                        <span>{errors.name.message}</span>
                        :null
                    }
                </p>
                <p>
                    <label class="sr-only">Image:</label>
                    <input 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 

                        value={image} onChange={(e)=>setImage(e.target.value)} type="file"></input>

                    {
                        errors.image?
                        <span>{errors.image.message}</span>
                        :null
                    }
                </p>
                <p>
                    <label class="sr-only">Description:</label>
                    <input 
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                        value={description} onChange={(e)=>setDescription(e.target.value)} type="text"></input>
                    {
                        errors.description?
                        <span>{errors.description.message}</span>
                        :null
                    }
                </p>
                </div>
                
                </div>
                <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    mt-2
                    ">Edit {name}</button>
            </form>
        </div>
    )

}

export default EditItem