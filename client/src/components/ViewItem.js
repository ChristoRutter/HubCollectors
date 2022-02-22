import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';


const ViewItem = (props) =>{

    const {id} = props;
    const [item, setItem] = useState({})
    





    useEffect(()=>{
        axios.get(`http://localhost:8000/api/collectors/${id}`)

            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setItem(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])


    const deleteItem = () =>{

        axios.delete(`http://localhost:8000/api/collectors/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err)
            })

    }


    return(
        

<section class="text-gray-700 body-font overflow-hidden bg-white">
<div class="container px-5 py-24 mx-auto">
  <div class="lg:w-4/5 mx-auto flex flex-wrap">
    <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={item.image} />
    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{item.name}</h1>

      <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
        
        <div class="flex ml-6 items-center">
          
          
        </div>
      </div>
      
      <p class="leading-relaxed">{item.description}</p>
      <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
        
        <div class="flex ml-6 items-center">
          
          
        </div>
      </div>
      <div class="flex">
        <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={deleteItem}>Delete {item.title}</button>
        <Link class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"  to={"/home"}>Return Home</Link>
      </div>
    </div>
  </div>
</div>
</section>
    )
}


export default ViewItem;