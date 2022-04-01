import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Listitem from '../listItem/ListItem.jsx';
import './list.scss'

const List = ({ list }) => {
    const listRef = useRef()
    const [isMoved, setIsMoved] = useState(false);
    const [sliderNumber, setSliderNumber] = useState(0);
    const [windowWitdh, setWindowWitdh] = useState(window.innerWidth);

    useEffect(() => {
        listRef.current.style.transform = `translateX(${0}px)`
        setSliderNumber(0)
    }, [windowWitdh]);
    const handleClick = (direction) => {
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50
        let countList = document.querySelector(".home .list .wrapper .container").querySelectorAll(".listItem").length
        let currentDisplay = Math.floor(windowWitdh / 260)
        if (direction === "left" && sliderNumber > 0) {
            setSliderNumber(sliderNumber - 1)
            listRef.current.style.transform = `translateX(${260 + distance}px)`
        }
        if (direction === "right" && countList - currentDisplay > sliderNumber) {

            setSliderNumber(sliderNumber + 1)

            listRef.current.style.transform = `translateX(-${260 - distance}px)`
        }

    }
    return (
            <div className="list" onMouseMoveCapture={() => { setWindowWitdh(window.innerWidth); }}>
                <span className="listTitle">{list.title}</span>
                <div className="wrapper">
                    <ArrowBackIosOutlined className='sliderArrow left' style={{ display: !isMoved && "none" }} onClick={() => handleClick("left")} />
                    <div className="container" ref={listRef}>
                        {list.content.map((item, i) => {
                            return <Listitem key={i} index={i} id={item} />
                        })}

                    </div>
                    <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleClick("right")} />

                </div>
            </div>
    );
}

export default List;
