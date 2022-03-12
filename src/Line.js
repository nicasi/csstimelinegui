import React, { useState } from "react";
import KeyFrame from "./KeyFrame";

const Line = (props) => {
  const [Left, setLeft] = useState(props.delay);
  const [LeftStart, setLeftStart] = useState(0);
  const [MouseXStart, setMouseXStart] = useState(0);

  console.log("line init");

  const dragHandler = (e) => {
    //e.preventDefault();
    e.stopPropagation();
    //console.log("line drag");
    if (e.clientX !== 0) {
      let newLeftVal = LeftStart + e.clientX - MouseXStart;
      setLeft(newLeftVal);
    }
  };

  const dragStartHandler = (e) => {
    setMouseXStart(e.clientX);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    e.dataTransfer.effectAllowed = "move";
  };

  const dragStopHandler = (e) => {
    setLeftStart(Left);
  };

  const dblClickHandler = (e) => {
    console.log(e.clientX - Left - 7);
  };

  const width = parseInt(props.duration);

  const onKeyFrameSelectHandler = (cssProps) => {
    props.onKeyFrameSelect(cssProps);
  };

  const onPositionChangeHandler = (id, offset) => {
    props.onKeyFramePositionChange(props.id, id, offset);
  };

  return (
    <div
      className="line"
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragStopHandler}
      onDrag={dragHandler}
      onDoubleClick={dblClickHandler}
      style={{ left: Left + "px", width: width }}
    >
      <div className="track">
        {props.keyframes.map((keyframe) => {
          return (
            <KeyFrame
              key={keyframe.key}
              id={keyframe.key}
              offset={keyframe.offset}
              cssProps={keyframe.css}
              parentWidth={width}
              onKeyFrameSelect={onKeyFrameSelectHandler}
              onPositionChange={onPositionChangeHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Line;
