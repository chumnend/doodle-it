import React, { useState, useRef, useEffect } from "react";
import  { fabric } from "fabric";
import "./Editor.scss";

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

function Editor () {
    const cRef = useRef();
    const [fabricData, setFabricData] = useState(null);
    const [activeObject, setActiveObject] = useState(null);
    const [title, setTitle] = useState("Untitled");
    const [freeMode, setFreeMode] = useState(false);
    
    useEffect( () => {
        fabricCanvas.initialize(cRef.current, {
            width: 500,
            height: 500,
            backgroundColor: "white",
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
        fabricCanvas.setBackgroundColor("#FFF");
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
            fill: "blue",
        });
        
        fabricCanvas.add(circle);
        fabricCanvas.setActiveObject(fabricCanvas.getObjects()[0]);
        fabricCanvas.fire("save");
    }
    
    function addRect () {
        // add a rectangle element to the canvas
        let rect = new fabric.Rect({
            width: 50,
            height: 50,
            fill: "blue",
        });
        
        fabricCanvas.add(rect);
        fabricCanvas.setActiveObject(fabricCanvas.getObjects()[0]);
        fabricCanvas.fire("save");
    }
    
    function setRed () {
        fabricCanvas.getActiveObject().set("fill", "red");
        fabricCanvas.fire("save");
    }
    
    function setBlue () {
        fabricCanvas.getActiveObject().set("fill", "blue");
        fabricCanvas.fire("save");
    }
    function removeObject () {
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
                    <button onClick={addCircle}>Circle</button>
                    <button onClick={addRect}>Rect</button>
                </aside>
                <section className="Editor-section">
                    <section className="Editor-section-context">
                        {activeObject &&
                            <div>
                                <div className="Editor-context-left">
                                    <div>Fill: {activeObject.get("fill")}</div>
                                    <div>Top: {activeObject.get("top")}</div>
                                    <div>Left: {activeObject.get("left")}</div>
                                    <div>Angle: {activeObject.get("angle")}</div>
                                </div>
                                <div className="Editor-context-right">
                                    <button onClick={setRed}>Set Red</button>
                                    <button onClick={setBlue}>Set Blue</button>
                                    <button onClick={removeObject}>Remove</button>
                                </div>
                            </div>
                        }
                        {freeMode && 
                            <div>
                                <div className="Editor-context-left">
                                    <div>Pen Color: {fabricCanvas.freeDrawingBrush.color}</div>
                                    <div>Pen Size: {fabricCanvas.freeDrawingBrush.width}</div>
                                </div>
                                <div className="Editor-context-right">
                                </div>
                            </div>
                        }
                    </section>
                    <section className="Editor-section-canvas">
                        <canvas id="Editor-canvas" ref={cRef}>
                            Not Supported by browser.
                        </canvas>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default Editor;
