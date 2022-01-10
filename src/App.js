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
          position: 0,
          css: `background-color:red;transform:rotate(0deg)`
        },
        {
          key: "0.1",
          position: 50,
          css: `background-color: green`
        },
        {
          key: "0.2",
          position: 100,
          css: `background-color: blue;transform: rotate(100deg)`
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
          css: `background-color:pink;transform:scale(0)`
        },
        {
          key: "1.1",
          position: 10,
          css: `background-color: orange;transform: scale(1)`
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

  const [generatedAnimationCss, setGeneratedAnimationCss] = useState(
    generateAnimationCss()
  );

  const generateKeyframesCss = () => {
    return animations.map((animation) => {
      let s = `@keyframes a-${animation.key} {`;
      s += animation.keyframes
        .map(
          (kf) => `${kf.position}% {
                        ${kf.css}
                      }`
        )
        .join();
      s += "}";
      return s;
    });
  };

  const [generatedKeyframesCss, setGeneratedKeyframesCss] = useState(
    generateKeyframesCss()
  );

  const formatCss = (str) => {
    let arr = str.split(";");
    return arr.join(";\r\n");
  };

  const keyFrameSelectHandler = (cssProps) => {
    setCssPropsPaneText(cssProps);
  };

  const keyFramePositionChangeHandler = (id, kfid, position) => {
    setGeneratedAnimationCss(generateAnimationCss());
    setGeneratedKeyframesCss(generateKeyframesCss());
  };

  return (
    <div className="App">
      <div className="timeLine">
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
      <style>{generatedAnimationCss}</style>
      <style>{generatedKeyframesCss}</style>
    </div>
  );
}
