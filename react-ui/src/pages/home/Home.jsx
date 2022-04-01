import React, { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured.jsx';
import List from '../../components/list/List.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';
import './home.scss'
import axios from 'axios';
import { ROOT_URL } from '../../constants.js';
const Home = ({type}) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null);
    useEffect(() => {
        const getRandomLists = async () =>{
            try {
                const res = await axios.get(`${ROOT_URL}lists/${type && "?type=" + type}${genre ? "&genre=" + genre : ""}`,{
                    headers:{ 
                        "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1Njg5ODE5YWVjZTFkYjBkZGNmZTkiLCJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInByb2ZpbGVQaWMiOiIiLCJpc0FkbWluIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIyLTAzLTMxVDA4OjM4OjQ4LjY3MloiLCJ1cGRhdGVkQXQiOiIyMDIyLTAzLTMxVDA5OjEwOjMyLjIwNloiLCJfX3YiOjAsImlhdCI6MTY0ODczNjQwMywiZXhwIjoxNjQ5MTY4NDAzfQ.6XHZ0tr30XLyKDeTrEMmBmA8tsgt-YP3xsOATlub1wA"
                    }
                })
                if(res.status === 200){
                    setLists(res.data)
                } else{
                    console.log(res)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getRandomLists()
        
    }, [type, genre]);
    return (
        <div className="home">
            <Navbar  />
            <Featured type={type}/>
            {lists.length > 0 ? 
            (lists.map((list) => {
                return <List key={list.title} list = {list} />
            }))
            : (<span>No list</span>) 
        }
        
        </div>
    );
}

export default Home;
