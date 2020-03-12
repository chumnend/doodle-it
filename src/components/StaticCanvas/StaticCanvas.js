import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";
import PropTypes from "prop-types";

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.StaticCanvas();

function StaticCanvas ({ className, fabricData, width, height, ...props}) {
    const cRef = useRef(null);
    
    useEffect( () => {
        fabricCanvas.initialize(cRef.current, {
            width,
            height,
        });
        
        fabricCanvas.loadFromJSON(fabricData);
    }, [fabricData, width, height]);
    
    return (
        <canvas ref={cRef} className={className}> 
            Not supported by browser.
        </canvas>
    );
}

StaticCanvas.defaultProps = {
    className: "",
};

StaticCanvas.propTypes = {
    className: PropTypes.string,
    fabricData: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default StaticCanvas;
