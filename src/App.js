import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import "./styles.css";
import Line from "./Line";

export default function App() {
    const [cssPropsPaneText, setCssPropsPaneText] = useState("...");
    const [html, setHTML] = useState('');
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
                    transform: 'rotate(180deg)'
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

    const AddKeyframeHandler = (key, percentage) => {
        console.log("add keyframe at " + key + " " + percentage);
    };

    const widthChangeHandler = (id, width) => {
        let aniToChange = animations.find((ani) => ani.key === id);
        aniToChange.duration = width * (100/zoom);
        applyAnimations();
    }

    const HTMLChangeHandler = (e) => {
        let html = e.target.value;
        setHTML(html);
    }

    function createMarkup() {
        return { __html: html };
    }

    const ZoomInputChangeHandler = (e) => {
        setZoomUpdateFlag(true);
        setZoom(e.target.value);
    }

    const removeZoomFlag = () => {
        setZoomUpdateFlag(false);
    }

    return (
        <div className="App">
            <Editor
                height="300px"
                defaultLanguage="html"
                theme="vs-light"
                options={{
                    minimap: {
                        enabled: false
                    }}
                }
                beforeMount={(monaco) => {
                emmetHTML(monaco);
                }}
            />
            <div id="scene" dangerouslySetInnerHTML={createMarkup()}>
            </div>
            <textarea id="html" onChange={HTMLChangeHandler}></textarea>
            <div id="timeLine">
                <input value={zoom} onChange={ZoomInputChangeHandler}></input>
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
                                onAddKeyframe={AddKeyframeHandler}
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