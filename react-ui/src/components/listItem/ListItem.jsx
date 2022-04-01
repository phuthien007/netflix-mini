import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../../constants';
import "./listItem.scss"

const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
const Listitem = ({ index, id }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [item, setItem] = useState({})
    useEffect(() => {
        const getMovie = async() =>{
            try {
                const res = await axios(`${ROOT_URL}movies/${id}`,
                {
                    headers:{ 
                        "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ1Njg5ODE5YWVjZTFkYjBkZGNmZTkiLCJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInByb2ZpbGVQaWMiOiIiLCJpc0FkbWluIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIyLTAzLTMxVDA4OjM4OjQ4LjY3MloiLCJ1cGRhdGVkQXQiOiIyMDIyLTAzLTMxVDA5OjEwOjMyLjIwNloiLCJfX3YiOjAsImlhdCI6MTY0ODczNjQwMywiZXhwIjoxNjQ5MTY4NDAzfQ.6XHZ0tr30XLyKDeTrEMmBmA8tsgt-YP3xsOATlub1wA"
                    }
                })
                
                if(res.status === 200) {
                    setItem(res.data)
                } else{
                    console.log(res)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getMovie()
    }, [index, id])
    return (
        <Link to="/watches" state={{item: item}}>

        <div className="listItem"
            style={{ left: `${isHovered && (index === 0 ? 0 : index * 250)}px` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img
                src={item.img}
                alt=""
            />
            {isHovered && (
                <>
                    <video src={item.trailer } autoPlay={true} loop></video>
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpAltOutlined  className="icon"/>
                            <ThumbDownAltOutlined  className="icon"/>
                        </div>
                        <div className="itemInfoTop">
                            <span>{item.duration}</span>
                            <span className="limit">+{item.limit}</span>
                            <span>{item.year}</span>
                        </div>
                        <div className="desc">
                            {item.desc}
                            </div>
                        <div className="genre">{item.genre}</div>
                    </div>
                </>

            )}

        </div>
        </Link>

    );
}

export default Listitem;
