import React, { useState } from "react";

const KeyFrame = (props) => {

  const calcOffset = (x) => {
    return (x / 100) * -16;
  };

  const [Left, setLeft] = useState(props.offset*100);
  const [OffsetLeft, setOffsetLeft] = useState(calcOffset(props.offset*100));
  const [LeftStart, setLeftStart] = useState(props.offset*100);
  const [MouseXStart, setMouseXStart] = useState(0);

  const dragHandler = (e) => {
    //e.preventDefault();
    e.stopPropagation();
    if (e.clientX !== 0) {
      let newLeftValPx = toPx(LeftStart) + e.clientX - MouseXStart;
      if (newLeftValPx < 0) newLeftValPx = 0;
      if (newLeftValPx > props.parentWidth - 16)
        newLeftValPx = props.parentWidth - 16;
      let newLeftVal = toPercentage(newLeftValPx);

      setLeft(newLeftVal);
      setOffsetLeft(calcOffset(newLeftVal));
    }
  };

  const toPercentage = (x) => {
    return (x / (props.parentWidth - 16)) * 100;
  };

  const toPx = (x) => {
    return (x / 100) * (props.parentWidth - 16);
  };

  const dragStartHandler = (e) => {
    setMouseXStart(e.clientX);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    e.dataTransfer.effectAllowed = "move";
  };

  const dragStopHandler = (e) => {
    setLeftStart(Left);
    props.onPositionChange(props.id, Left/100);
  };

  const onClickHandler = (e) => {
    props.onKeyFrameSelect(props.cssProps);
  };

  return (
    <div
      className="keyFrame"
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragStopHandler}
      onDrag={dragHandler}
      onClick={onClickHandler}
      style={{ left: Left + "%", marginLeft: OffsetLeft + "px" }}
    ></div>
  );
};

export default KeyFrame;
