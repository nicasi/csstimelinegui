import React, { useState } from "react";
import "./styles.css";
import Line from "./Line";

export default function App() {
  const [cssPropsPaneText, setCssPropsPaneText] = useState("...");

  let animations = [
    {
      key: 0,
      selector: "#el1",
      duration: 500,
      delay: 100,
      keyframes: [
        {
          key: "0.0",
          offset: 0,
          backgroundColor:'red',
          transform:'rotate(0deg)'
        },
        {
          key: "0.1",
          offset: 0.5,
          backgroundColor:'green',
          transform:'rotate(180deg)'
        },
        {
          key: "0.2",
          offset: 1,
          backgroundColor: 'blue',
          transform: 'rotate(360deg)'
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

  const formatCss = (str) => {
    let arr = str.split(";");
    return arr.join(";\r\n");
  };

  const keyFrameSelectHandler = (cssProps) => {
    console.log(cssProps);
    setCssPropsPaneText(cssProps);
  };

  const keyFramePositionChangeHandler = (id, kfid, offset) => {
    let aniToChange = animations.find((ani) => ani.key === id);
    let keyFrameToChange = aniToChange.keyframes.find((kf) => kf.key === kfid);
    keyFrameToChange.offset = offset;

    animations.forEach(a => {
      
      if(document.querySelector(a.selector)) {
        document
          .querySelector(a.selector)
          .animate(a.keyframes, {duration: 2000, iterations: Infinity, fill: 'both'})
      }
      
    })
  };

  return (
    <div className="App">
      <div id="scene"></div>
      <div id="timeLine">
        {animations.map((animation) => {
          //console.log(animation);
          return (
            <Line
              key={animation.key}
              id={animation.key}
              onKeyFrameSelect={keyFrameSelectHandler}
              onKeyFramePositionChange={keyFramePositionChangeHandler}
              duration={animation.duration}
              delay={animation.delay}
              keyframes={animation.keyframes}
            />
          );
        })}
      </div>
      <div id="properties-pane">
        <h2>PROPERTIES</h2>
        <div contentEditable className="properties">
          {cssPropsPaneText}
        </div>
      </div>
    </div>
  );
}