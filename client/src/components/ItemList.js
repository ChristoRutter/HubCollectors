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

    const deleteItem = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/collectors/${idFromBelow}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setList(list.filter((item, index) => item._id !== idFromBelow))
            })
            .catch((err) => console.log(err))
        
    }
    

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
        <div style={{ textAlign: "center" }}>
            <header>
                <h1>The Collection</h1>
                <Link to={"/new"}>Add a New Item to the Collection Page</Link>
                <button onClick={logout}>Logout</button>

            </header>

            {
                list.map((item, index) => (
                    <div key={index}>

                        
                        
                        <Link to={`/item/${item._id}`}>
                            <p>{item.name}</p>
                            <img src={item.image} alt="picture"
                                style={{ width: "150px", height: "150px" }} />
                        </Link>


                        <div>
                            <Link to={`/item/edit/${item._id}`}>Edit</Link>
                            <button onClick={() => deleteItem(item._id)}>
                                Delete
                            </button>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}


export default ItemList;