import React, { useState, useEffect } from "react";
import KeyFrame from "./KeyFrame";

const Line = (props) => {
    const [Width, setWidth] = useState(props.duration * props.zoom/100);
    const [WidthStart, setWidthStart] = useState(props.duration * props.zoom/100);
    const [Left, setLeft] = useState(props.delay);
    const [LeftStart, setLeftStart] = useState(props.delay);
    const [MouseXStart, setMouseXStart] = useState(0);
    const [MouseButtonDownOnLine, setMouseButtonDownOnLine] = useState(false);
    const [MouseButtonDownOnResizeHandle, setMouseButtonDownOnResizeHandle] = useState(false);
    const [MouseMoveHandlerAdded, setMouseMoveHandlerAdded] = useState(false);

    useEffect(() => {
        if(props.zoomUpdated) {
            setWidth(props.duration * props.zoom/100);
            onZoomUpdateHandler();
        }

        console.log(props.zoomUpdated);

        if (MouseMoveHandlerAdded) return;

        if (!MouseButtonDownOnLine && !MouseButtonDownOnResizeHandle) {
            return;
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        setMouseMoveHandlerAdded(true);
    });

    const mouseMoveHandler = (e) => {
        e.stopPropagation();

        if (MouseButtonDownOnLine) {
            let newLeftVal = LeftStart + (e.clientX - MouseXStart);
            setLeft(newLeftVal);
        }

        if (MouseButtonDownOnResizeHandle) {
            let newWidthVal = WidthStart + (e.clientX - MouseXStart);
            setWidth(newWidthVal);
        }
    };

    const dblClickHandler = (e) => {
        console.log(e.clientX - Left - 7);
    };

    const mouseDownHandler = (e) => {
        if (e.target.className == 'line') setMouseButtonDownOnLine(true);
        if (e.target.className == 'resize-handle') setMouseButtonDownOnResizeHandle(true);
        setMouseXStart(e.clientX);
        setLeftStart(Left);
        setWidthStart(Width);
    }

    const mouseUpHandler = (e) => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        setMouseMoveHandlerAdded(false);

        setMouseButtonDownOnLine(false);
        setMouseButtonDownOnResizeHandle(false);
        //setMouseXStart(e.clientX);
        //setLeftStart(Left);
    }

    const onKeyFrameSelectHandler = (cssProps) => {
        props.onKeyFrameSelect(cssProps);
    };

    const onPositionChangeHandler = (id, offset) => {
        props.onKeyFramePositionChange(props.id, id, offset);
    };

    const onZoomUpdateHandler = () => {
        props.onZoomUpdateHandler();
    }

    return (
        <div className="line"
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseLeave={mouseUpHandler}
            onDoubleClick={dblClickHandler}
            style={{ left: Left + "px", width: Width }} >
            <div className="track">
                {
                    props.keyframes.map((keyframe) => {
                        return (
                            <KeyFrame key={keyframe.key}
                                id={keyframe.key}
                                offset={keyframe.offset}
                                cssProps={keyframe.css}
                                parentWidth={Width}
                                zoom={props.zoom}
                                onKeyFrameSelect={onKeyFrameSelectHandler}
                                onPositionChange={onPositionChangeHandler}
                                onZoomUpdate={onZoomUpdateHandler}
                            />
                        );
                    })
                }
            </div>
            <div className="resize-handle" ></div></div>
    );
};

export default Line;