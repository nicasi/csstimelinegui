import React, { useState } from "react";
import "./styles.css";
import Line from "./Line";

export default function App() {
  const [cssPropsPaneText, setCssPropsPaneText] = useState("...");
  const [sceneContent, setSceneContent] = useState(<div id="el1">element</div>);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(document.getElementById('el1'));
  });

  console.log(document.getElementById('el1'));
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
          backgroundColor:'green'
        },
        {
          key: "0.2",
          offset: 1,
          backgroundColor: 'blue',
          transform: 'rotate(100deg)'
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
          position: 0,
          backgroundColor: 'pink',
          transform: 'scale(0)'
        },
        {
          key: "1.1",
          position: 0.1,
          backgroundColor: 'orange',
          transform: 'scale(1)'
        }
      ]
    }
  ];

  const generateAnimationCss = () => {
    return animations
      .map(
        (animation) =>
          animation.selector +
          `{animation: a-${animation.key} ${animation.duration}ms ${animation.delay}ms}`
      )
      .join();
  };

  const KeyframesArr = () => {
    return animations.map((animation) => {
      animation.keyframes
    });
  };


  const formatCss = (str) => {
    let arr = str.split(";");
    return arr.join(";\r\n");
  };

  const keyFrameSelectHandler = (cssProps) => {
    setCssPropsPaneText(cssProps);
  };

  const keyFramePositionChangeHandler = (id, kfid, position) => {
    let aniToChange = animations.find((ani) => ani.key === id);
    let keyFrameToChange = aniToChange.keyframes.find((kf) => kf.key === kfid);
    keyFrameToChange.position = position;
    KeyframesArr();
    //setGeneratedKeyframesCss(generateKeyframesCss());
    setSceneContent(
      <div key={Math.random()} id="el1">
        element
      </div>
    );
  };

  return (
    <div className="App">
      <div id="scene">{sceneContent}</div>
      <div id="timeLine">
        {animations.map((animation) => {
          return (
            <Line
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
          {formatCss(cssPropsPaneText)}
        </div>
      </div>
    </div>
  );
}
