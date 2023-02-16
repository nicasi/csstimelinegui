import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import "./styles.css";
import Line from "./Line";

export default function App() {
    const [html, setHTML] = useState('');
    const [CSS, setCSS] = useState('');
    const [zoom, setZoom] = useState(33);
    const [zoomUpdateFlag, setZoomUpdateFlag] = useState(false);

    useEffect(() => {
        applyAnimations();
    });

    const startAnimations = [
        {
            key: 0,
            selector: ".el1",
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

        // translate json to css
        let cssStr = '';

        Object
            .entries(cssProps)
            .filter(el => (el[0] != 'key' && el[0] != 'offset'))
            .forEach((arr) => {
                let key = arr[0]
                let val = arr[1]
                key = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
                cssStr += `${key}: ${val};\n`
            })

        setCSS(cssStr)
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
        aniToChange.keyframes.sort((a, b) => a.offset - b.offset);
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

    const ZoomInputChangeHandler = (e) => {
        setZoomUpdateFlag(true);
        setZoom(e.target.value);
    }

    const removeZoomFlag = () => {
        setZoomUpdateFlag(false);
    }

    const handleHTMLEditorChange = (value, event) => {
        setHTML(value);
    }

    function handleCSSEditorChange(value, event) {
        setCSS(value);
      }

    return (
        <div className="App">
            <div id="scene" dangerouslySetInnerHTML={{__html: html}}>
            </div>
            <Editor
                className="emmet-editor html-editor"
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
                onChange={handleHTMLEditorChange}
            />
            <Editor
                className="emmet-editor css-editor"
                defaultLanguage="css"
                theme="vs-light"
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
                beforeMount={(monaco) => {
                    monaco.languages.css.cssDefaults.setOptions({
                        validate: false
                    })
                    emmetCSS(monaco);
                }}
                onChange={handleCSSEditorChange}
                value={CSS}
            />
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
            <style>{CSS}</style>
        </div>
    );
}