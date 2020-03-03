import React, { useState, useRef, useEffect } from "react";
import  { fabric } from "fabric";
import { CompactPicker as ColorPicker } from "react-color";
import "./Editor.scss";

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

function Editor () {
    const cRef = useRef();
    const [fabricData, setFabricData] = useState(null);
    const [activeObject, setActiveObject] = useState(null);
    const [title, setTitle] = useState("Untitled");
    const [freeMode, setFreeMode] = useState(false);
    const [color, setColor] = useState("#FF0000");
    const [showPicker, setShowPicker] = useState(false);
    const [penWidth, setPenWidth] = useState(1);
    
    useEffect( () => {
        fabricCanvas.initialize(cRef.current, {
            width: 500,
            height: 500,
            backgroundColor: "#f2f2f2",
        });
        
        fabricCanvas.on("mouse:up", () => {
            // on mouse up, update contents of the canvas
            setFabricData(fabricCanvas.toObject()); 
            setActiveObject(fabricCanvas.getActiveObject());
        });
        
        fabricCanvas.on("save", () => {
            // save the state of the canvas when prompted
            setFabricData(fabricCanvas.toObject()); 
            setActiveObject(fabricCanvas.getActiveObject());
            fabricCanvas.renderAll();
        });
        
        setFabricData(fabricCanvas);
    }, []);
    
    function resizeCanvas () {
        // set new size for the canvas
        let newWidth = prompt("Enter new canvas width", 500);
        let newHeight = prompt("Enter new canvas height", 500);
        
        if(newWidth > 0 && newHeight > 0) {
            fabricCanvas.setWidth(newWidth);
            fabricCanvas.setHeight(newHeight);
            fabricCanvas.fire("save");
        } else {
            alert("Invalid Entry");
        }
    }
    
    function saveCanvas () {
        // TODO: saves fabric canvas information to db 
        console.log(JSON.stringify(fabricData));
    }
    
    function clearCanvas () {
        // clears contents of the canvas
        fabricCanvas.clear();
        fabricCanvas.setBackgroundColor("#f2f2f2");
        fabricCanvas.fire("save");
    }
    
    function toggleMode () {
        // set canvas for free drawing or select mode
        if(!freeMode) {
            // deselect any active objects
            setActiveObject(null);
            fabricCanvas.discardActiveObject();
            fabricCanvas.renderAll();
            
            // turn free drawing mode on
            setFreeMode(true);
            fabricCanvas.isDrawingMode = true;
            fabricCanvas.freeDrawingBrush.color = color;
            fabricCanvas.freeDrawingBrush.width = penWidth;
        }
        else {
            setFreeMode(false);
            fabricCanvas.isDrawingMode = false;
        }
    }
    
    function addCircle () {
        // add a circle element to the canvas
        let circle = new fabric.Circle({ 
            radius: 20,
            fill: color,
        });
        
        fabricCanvas.add(circle);
        fabricCanvas.fire("save");
    }
    
    function addRect () {
        // add a rectangle element to the canvas
        let rect = new fabric.Rect({
            width: 50,
            height: 50,
            fill: color,
        });
        
        fabricCanvas.add(rect);
        fabricCanvas.fire("save");
    }
    
    function handleColorChange (color) {
        // update color state
        setColor(color.hex);
        
        
        if(freeMode) {
            // change pen color
            fabricCanvas.freeDrawingBrush.color = color.hex;
        } else {
            // change active object color 
            fabricCanvas.getActiveObject().set("fill", color.hex);
        }
    
        // save color change
        fabricCanvas.fire('save');
    }
    
    function handlePenWidthChange (e) {
        // change the pen width
        setPenWidth(e.target.value);
        fabricCanvas.freeDrawingBrush.width = e.target.value;
        fabricCanvas.fire("save");
    }
    
    function removeObject () {
        // remove current active object from the canvas
        fabricCanvas.remove(fabricCanvas.getActiveObject());
        fabricCanvas.fire('save');
    }
    
    return (
        <div className="Editor">
            <header className="Editor-header">
                <section className="Editor-header-left">
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        value={title}
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </section>
                <section className="Editor-header-right">
                    <button onClick={resizeCanvas}>Resize</button>
                    <button onClick={saveCanvas}>Save</button>
                    <button onClick={clearCanvas}>Clear</button>
                </section>
            </header>
            <main className="Editor-main">
                <aside className="Editor-aside">
                    <button onClick={toggleMode}>
                        {freeMode ? "Free" : "Select"}
                    </button>
                    <button onClick={addCircle} disabled={freeMode}>Circle</button>
                    <button onClick={addRect} disabled={freeMode}>Rect</button>
                </aside>
                <section className="Editor-section">
                    <section className="Editor-section-context">
                        {activeObject &&
                            <div>
                                <div className="Editor-context-left">
                                    <div 
                                        /* NOTE: fill does not exist for path objects */
                                        style={{ 
                                            height: 30, 
                                            width: 30, 
                                            background: activeObject.get("fill") 
                                        }}
                                        onClick={ () => setShowPicker(!showPicker) }
                                    />
                                    <div>{activeObject.get("fill").toUpperCase()}</div>
                                    {showPicker &&
                                        <div style={{ position: "absolute", zIndex: 2, top: 45 }}>
                                            <ColorPicker
                                                color={color} 
                                                onChange={handleColorChange} 
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="Editor-context-right">
                                    <div>Top: {activeObject.get("top")}</div>
                                    <div>Left: {activeObject.get("left")}</div>
                                    <div>Angle: {activeObject.get("angle")}</div>
                                    <button onClick={removeObject}>Remove</button>
                                </div>
                            </div>
                        }
                        {freeMode && 
                            <div>
                                <div className="Editor-context-left">
                                    <div 
                                        style={{ 
                                            height: 30, 
                                            width: 30, 
                                            background: fabricCanvas.freeDrawingBrush.color 
                                        }}
                                        onClick={ () => setShowPicker(!showPicker) }
                                    />
                                    <div>{fabricCanvas.freeDrawingBrush.color.toUpperCase()}</div>
                                    {showPicker &&
                                        <div style={{ position: "absolute", zIndex: 2, top: 45 }}>
                                            <ColorPicker
                                                color={color} 
                                                onChange={handleColorChange} 
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="Editor-context-right">
                                    <div>Pen Size: {penWidth}</div>
                                    <div>
                                        <input
                                            type="range"
                                            id="penSlider"
                                            min={1} max={10}
                                            step={1}
                                            value={penWidth}
                                            onChange={handlePenWidthChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </section>
                    <section className="Editor-section-canvas">
                        <canvas ref={cRef}>Not Supported by browser.</canvas>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default Editor;
