import React, { useState, useRef, useEffect } from "react";
import  { fabric } from "fabric";
import { CompactPicker as ColorPicker } from "react-color";
import { Modal, Button } from "../../components";
import { useInput, useToggle } from "../../hooks";
import "./Editor.scss";

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

function Editor () {
    const cRef = useRef();
    const [fabricData, setFabricData] = useState(null);
    const [activeObject, setActiveObject] = useState(null);
    const [title, setTitle] = useState("");
    const [freeMode, setFreeMode] = useState(false);
    const [color, setColor] = useState("#FF0000");
    const [showPicker, setShowPicker] = useState(false);
    const [penWidth, setPenWidth] = useState(1);
    const [showPenSlider, setShowPenSlider] = useState(false);
    const [resizeWidth, changeResizeWidth] = useInput();
    const [resizeHeight, changeResizeHeight] = useInput();
    const [showModal, toggleModal] = useToggle(false);
    
    useEffect( () => {
        fabricCanvas.initialize(cRef.current, {
            width: 500,
            height: 500,
            backgroundColor: "#f2f2f2",
        });
        
        fabricCanvas.on("mouse:up", (options) => {
            // on mouse up, update contents of the canvas
            setFabricData(fabricCanvas.toObject()); 
            setActiveObject(fabricCanvas.getActiveObject());
            setShowPicker(false);
        });
        
        fabricCanvas.on("save", () => {
            // save the state of the canvas when prompted
            setFabricData(fabricCanvas.toObject()); 
            setActiveObject(fabricCanvas.getActiveObject());
            fabricCanvas.renderAll();
        });
        
        setFabricData(fabricCanvas);
    }, []);
    
    function validateResize () {
        return (resizeWidth > 0 && resizeHeight > 0);
    }
    
    function resizeCanvas () {
        // set new size for the canvas
        fabricCanvas.setWidth(resizeWidth);
        fabricCanvas.setHeight(resizeHeight);
        fabricCanvas.fire("save");

        toggleModal();
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
            fabricCanvas.discardActiveObject();
            fabricCanvas.renderAll();
            setActiveObject(null);
            
            // turn free drawing mode on
            fabricCanvas.isDrawingMode = true;
            fabricCanvas.freeDrawingBrush.color = color;
            fabricCanvas.freeDrawingBrush.width = penWidth;
            setFreeMode(true);
        }
        else {
            fabricCanvas.isDrawingMode = false;
            setFreeMode(false);
        }
    }
    
    function addLine () {
        // add a line element to the canvas
        let coords = [0, 0, 100 , 100];
        let line = new fabric.Line(coords, {
            fill: color,
            stroke: color,
            strokeWidth: 2,
        });
    
        fabricCanvas.add(line);
        fabricCanvas.fire("save");
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
    
    function addTriangle () {
        // add a triangle to the canvas
        let triangle = new fabric.Triangle({
            width: 50,
            height: 50,
            fill: color,
        });
        
        fabricCanvas.add(triangle);
        fabricCanvas.fire("save");
    }
    
    function addText () {
        // add text box to the page
        let text = new fabric.Text("Hello", {
            fill: color,
        });

        fabricCanvas.add(text);
        fabricCanvas.fire("save");
    }
    
    function handleColorChange (color) {
        if(freeMode) {
            // change pen color
            fabricCanvas.freeDrawingBrush.color = color.hex;
        } else {
            // change active object color 
            if(activeObject.type === "path" || activeObject.type === "line") {
                fabricCanvas.getActiveObject().set("stroke", color.hex);
            } else {
                fabricCanvas.getActiveObject().set("fill", color.hex);
            }
        }
    
        // save color change
        setColor(color.hex);
        fabricCanvas.fire('save');
    }
    
    function handlePenWidthChange (e) {
        let newPenWidth = parseInt(e.target.value); // convert string to number
        fabricCanvas.freeDrawingBrush.width = newPenWidth;
        setPenWidth(newPenWidth);
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
                    <a href="/">
                        <i className="material-icons">home</i>
                    </a>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        placeholder="Untitled"
                        value={title}
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </section>
                <section className="Editor-header-right">
                    <button onClick={toggleModal} title="Resize Canvas">
                        <i className="material-icons">photo_size_select_large</i>
                    </button>
                    <button onClick={saveCanvas} title="Save Canvas">
                        <i className="material-icons">save</i>
                    </button>
                    <button onClick={clearCanvas} title="Clear Canvas">
                        <i className="material-icons">delete_sweep</i>
                    </button>
                </section>
            </header>
            <main className="Editor-main">
                <aside className="Editor-aside">
                    <button onClick={toggleMode} title="Activate the brush">
                        <span className={freeMode ? "" : "inactive"}>
                            <i className="material-icons">edit</i> 
                            Draw
                        </span>
                    </button>
                    <button onClick={addLine} disabled={freeMode} title="Add a line element">
                        <span className="line" />
                    </button>
                    <button onClick={addCircle} disabled={freeMode} title="Add a circle element">
                        <span className="circle"/>
                    </button>
                    <button onClick={addRect} disabled={freeMode} title="Add a rectangle element">
                        <span className="rectangle"/>
                    </button>
                    <button onClick={addTriangle} disabled={freeMode} title="Add a triangle element">
                        <span className="triangle" />
                    </button>
                    <button onClick={addText} disabled={freeMode} title="Add a text element">
                        <span>
                            <i className="material-icons">title</i>
                        </span>
                    </button>
                </aside>
                <section className="Editor-section">
                    <section className="Editor-section-context">
                        {activeObject &&
                            <div>
                                <div className="Editor-context-item">
                                    <div 
                                        style={{ 
                                            height: 30, 
                                            width: 30, 
                                            background: activeObject.get("fill") || activeObject.get("stroke"),
                                            cursor: "pointer",
                                        }}
                                        onClick={ () => setShowPicker(!showPicker) }
                                    />
                                    <div>
                                        {activeObject.get("fill") !== null 
                                            ? activeObject.get("fill").toUpperCase()
                                            : activeObject.get("stroke").toUpperCase()
                                        }
                                    </div>
                                    {showPicker &&
                                        <div style={{ position: "absolute", zIndex: 2, top: 45 }}>
                                            <ColorPicker
                                                color={color} 
                                                onChange={handleColorChange} 
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="Editor-context-item">
                                    <button onClick={removeObject}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </div>
                            </div>
                        }
                        {freeMode && 
                            <div>
                                <div className="Editor-context-item">
                                    <div 
                                        style={{ 
                                            height: 30, 
                                            width: 30, 
                                            background: fabricCanvas.freeDrawingBrush.color,
                                            cursor: "pointer",
                                        }}
                                        onClick={ () => setShowPicker(!showPicker) }
                                    />
                                    <div>{fabricCanvas.freeDrawingBrush.color.toUpperCase()}</div>
                                    {showPicker &&
                                        <div style={{ 
                                            position: "absolute", 
                                            zIndex: 2, 
                                            top: 45 
                                        }}>
                                            <ColorPicker
                                                color={color} 
                                                onChange={handleColorChange} 
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="Editor-context-item">
                                    <button onClick={ () => setShowPenSlider(!showPenSlider) }>
                                        <i class="material-icons">line_weight</i>
                                    </button>
                                    {showPenSlider &&
                                        <div style={{ 
                                            position: "absolute", 
                                            zIndex: 2, 
                                            top: 45,
                                            right: 0,
                                            background: "white",
                                            padding: "5px",
                                            fontSize: "14px"
                                        }}>
                                            <div>Pen Size: {penWidth}</div>
                                            <input
                                                type="range"
                                                id="penSlider"
                                                min={1} max={10}
                                                step={1}
                                                value={penWidth}
                                                onChange={handlePenWidthChange}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </section>
                    <section className="Editor-section-canvas">
                        <canvas ref={cRef}>Not Supported by browser.</canvas>
                    </section>
                </section>
            </main>
            
            <Modal 
                className="Editor-resize"
                show={showModal} 
                close={toggleModal}
            >
                <header>
                    <h1>Enter a new canvas size</h1>
                </header>
                <section>
                    <div className="Editor-resize-input">
                        <label htmlFor="resize-width">
                            New Width
                        </label>
                        <input 
                            type="number"
                            id="resize-width"
                            name="resize-width"
                            placeholder="Enter new width..."
                            value={resizeWidth}
                            onChange={changeResizeWidth}
                        />
                    </div>
                    
                    <div className="Editor-resize-input">
                        <label htmlFor="resize-height">
                            New Height
                        </label>
                        <input 
                            type="number"
                            id="resize-height"
                            name="resize-height"
                            value={resizeHeight}
                            placeholder="Enter new height..."
                            onChange={changeResizeHeight}
                        />
                    </div>
                    
                    <div>
                        <Button 
                            onClick={resizeCanvas} 
                            disabled={!validateResize()}
                        >
                            Resize
                        </Button>
                        <Button 
                            onClick={toggleModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </section>
            </Modal>
        </div>
    );
}

export default Editor;
