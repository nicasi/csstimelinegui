import React, { useState } from "react";
import "./styles.css";
import Line from "./Line";

export default function App() {
  const [cssPropsPaneText, setCssPropsPaneText] = useState("...");

  let animations = [
    {
      id: 0,
      duration: 500,
      delay: 100,
      keyframes: [
        {
          key: '0.0',
          position: 0,
          css: `background-color:red;transform:rotate(0deg)`
        },
        {
          key: '0.1',
          position: 50,
          css: `background-color: green`
        },
        {
          key: '0.2',
          position: 100,
          css: `background-color: blue;transform: rotate(100deg)`
        }
      ]
    },
    {
      id: 1,
      duration: 300,
      delay: 0,
      keyframes: [
        {
          key: '1.0',
          position: 0,
          css: `background-color:pink;transform:scale(0)`
        },
        {
          key: '1.1',
          position: 10,
          css: `background-color: orange;transform: scale(1)`
        }
      ]
    }
  ];

  const formatCss = (str) => {
    let arr = str.split(";");
    return arr.join(";\r\n");
  };

  const keyFrameSelectHandler = (cssProps) => {
    setCssPropsPaneText(cssProps);
  };

  const keyFramePositionChangeHandler = (id, position) => {
    console.log('in app: ' + position + ' ' + id);
  };

  /*
        .map((anObjectMapped, index) => {
    return (
        <p key={`${anObjectMapped.name}_{anObjectMapped.email}`}>
            {anObjectMapped.name} - {anObjectMapped.email}
        </p>
    );
})
        */

  return (
    <div className="App">
      <div className="timeLine">
        {animations.map((animation) => {
          return (
            <Line
              key={animation.id}
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
          {formatCss(cssPropsPaneText)}
        </div>
      </div>
    </div>
  );
}
