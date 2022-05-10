import React, { useState, useEffect } from "react";
import "./styles.css";
import Line from "./Line";

export default function App() {
    const [cssPropsPaneText, setCssPropsPaneText] = useState("...");
    const [html, setHTML] = useState('<div id="el1"></div>');
    const [zoom, setZoom] = useState(33);
    const [zoomUpdateFlag, setZoomUpdateFlag] = useState(false);

    useEffect(() => {
        applyAnimations();
    });

    const startAnimations = [
        {
            key: 0,
            selector: "#el1",
            duration: 1000,
            delay: 0,
            keyframes: [
                {
                    key: "0.0",
                    offset: 0,
                    backgroundColor: 'red',
                    transform: 'rotate(0deg)'
                },
                {
                    key: "0.1",
                    offset: 0.5,
                    backgroundColor: 'orange',
                    transform: 'rotate(45deg)'
                },
                {
                    key: "0.2",
                    offset: 1,
                    backgroundColor: 'red',
                    transform: 'rotate(0deg)'
                }
            ]
        },
        {
            key: 1,
            selector: "#el2",
            duration: 300,
            delay: 0,
            keyframes: [
                {
                    key: "1.0",
                    offset: 0,
                    backgroundColor: 'pink',
                    transform: 'scale(0)'
                },
                {
                    key: "1.1",
                    offset: 1,
                    backgroundColor: 'orange',
                    transform: 'scale(1)'
                }
            ]
        }
    ];
    
    const [animations, setAnimations] = useState(startAnimations);

    const formatCss = (str) => {
        let arr = str.split(";");
        return arr.join(";\r\n");
    };

    const keyFrameSelectHandler = (cssProps) => {
        setCssPropsPaneText(cssProps);
    };

    const applyAnimations = () => {
        animations.forEach(a => {
            let el = document.querySelector(a.selector);
            if (el) {
                el.animate(a.keyframes, { duration: a.duration, iterations: Infinity, fill: 'both' })
            }
        })
    }

    const keyFramePositionChangeHandler = (id, kfid, offset) => {
        let aniToChange = animations.find((ani) => ani.key === id);
        let keyFrameToChange = aniToChange.keyframes.find((kf) => kf.key === kfid);
        keyFrameToChange.offset = offset;
        setAnimations(animations);
        applyAnimations();
    };

    const widthChangeHandler = (id, width) => {
        let aniToChange = animations.find((ani) => ani.key === id);
        aniToChange.duration = width * (100/zoom);
        console.log(animations);
        applyAnimations();
        console.log("width change handler in app.js called, duration: " + (width * (100/zoom)))
    }

    const onHTMLChangeHandler = (e) => {
        let html = e.target.value;
        setHTML(html);
    }

    function createMarkup() {
        return { __html: html };
    }

    const onZoomInputChangeHandler = (e) => {
        setZoomUpdateFlag(true);
        setZoom(e.target.value);
        console.log("zoom: " + e.target.value);
        animations.forEach(a => console.log(a.duration))
    }

    const removeZoomFlag = () => {
        setZoomUpdateFlag(false);
    }

    return (
        <div className="App">
            <div id="scene" dangerouslySetInnerHTML={createMarkup()}>
            </div>
            <textarea id="html" onChange={onHTMLChangeHandler}></textarea>
            <div id="timeLine">
                <input value={zoom} onChange={onZoomInputChangeHandler}></input>
                {
                    animations.map((animation) => {
                        return (
                            <Line
                                key={animation.key}
                                id={animation.key}
                                onKeyFrameSelect={keyFrameSelectHandler}
                                onKeyFramePositionChange={keyFramePositionChangeHandler}
                                onWidthChange={widthChangeHandler}
                                onZoomUpdateHandler={removeZoomFlag}
                                duration={animation.duration}
                                delay={animation.delay}
                                keyframes={animation.keyframes}
                                zoom={zoom}
                                zoomUpdated={zoomUpdateFlag}
                            />
                        );
                    })
                }
            </div>
            <div id="properties-pane">
                <h2>PROPERTIES</h2>
                <div className="properties">
                    {cssPropsPaneText}
                </div>
            </div>
        </div>
    );
}