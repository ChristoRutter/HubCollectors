import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';


const ItemList = (props) => {


    const [list, setList] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/collectors")
            .then((res) => {
                console.log(res.data)
                setList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    
    

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, 
                
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
       

        <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-8">
      <div class="w-full mb-6 lg:mb-0">
      <Link to={"/new"}>Add a New Item to the Collection Page</Link>
        <button class="mx-12 my-12" onClick={logout}>Logout</button>
        <h1 class="sm:text-4xl text-5xl font-bold font-medium title-font mb-2 text-gray-900">The Collection</h1>
        <div class="h-1 w-200 bg-indigo-500 rounded content-center"></div>
      </div>
    </div>



        {
                list.map((item, index) => (
                    

                        
                        
                                                   
                            <Link key={index} to={`/item/${item._id}`} class="flex flex-wrap -m-4 justify-center">
                                  <div class="lg:w-1/4 p-4 w-1/2">
                                    <a class="block relative h-48 rounded overflow-hidden">
                                      <img alt="picture" class="object-cover object-center w-full h-full block" src={item.image} />
                                    </a>
                                    <div class="mt-4">
                                      
                                      <h2 class="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
                                      <div>
                                            <Link to={`/item/edit/${item._id}`}>Edit</Link>
                                      </div>
                                    </div>
                                  </div>
                            </Link>





                        



                    
                ))
            }

   
  </div>
</section>

            

    )
}


export default ItemList;