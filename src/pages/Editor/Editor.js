import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { fabric } from "fabric";
import { BlockPicker as ColorPicker } from "react-color";
import { Doodle } from "../../services";
import { useInput, useToggle } from "../../hooks";
import { FormInput, Modal } from "../../components";
import queryString from 'query-string';
import "./Editor.scss";

// calulate starting canvas size based on screen size
let calcSize;
let { innerWidth, innerHeight } = window;
if(innerWidth > innerHeight) {
    calcSize = innerHeight > 500 ? 500 : innerHeight * 0.8;
} else {
    calcSize = innerWidth > 500 ? 500 : innerWidth * 0.8; 
}

// default canvas values
const DEFAULT_WIDTH = calcSize;
const DEFAULT_HEIGHT = calcSize;
const DEFAULT_COLOR = "#000002";
const DEFAULT_PEN_THICKNESS = 2;
const DEFAULT_BACK_COLOR = "#f2f2f2";

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

function Editor (props) {
    const cRef = useRef();
    const [fabricData, setFabricData] = useState(null);
    const [activeObject, setActiveObject] = useState(null);
    const [title, setTitle] = useState("Untitled");
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [height, setHeight] = useState(DEFAULT_HEIGHT);
    const [freeMode, setFreeMode] = useState(false);
    const [color, setColor] = useState(DEFAULT_COLOR);
    const [showPicker, setShowPicker] = useState(false);
    const [penWidth, setPenWidth] = useState(DEFAULT_PEN_THICKNESS);
    const [showPenSlider, setShowPenSlider] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showMenu, toggleShowMenu] = useToggle(false);
    const [showResizeModal, toggleResizeModal] = useToggle(false);
    const [resizeWidth, changeResizeWidth] = useInput();
    const [resizeHeight, changeResizeHeight] = useInput();
    
    useEffect( () => {
        async function init() {
            let params = queryString.parse(props.location.search);
            
            if(params.id !== undefined) {
                // load doodle from doodle API
                let loaded;
                
                try {
                    loaded = await Doodle.getOne(props.user.id, params.id);
                } catch(e) {
                    alert(e);
                }
            
                // load content to the fabric canvas
                fabricCanvas.initialize(cRef.current, {
                    width: loaded.width,
                    height: loaded.height,
                    backgroundColor: DEFAULT_BACK_COLOR,    
                });
                
                setTitle(loaded.title);
                setWidth(loaded.width);
                setHeight(loaded.height);
                fabricCanvas.loadFromJSON(loaded.content);
            } else {
                // initialize fabric canvas
                fabricCanvas.initialize(cRef.current, {
                    width: DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT,
                    backgroundColor: DEFAULT_BACK_COLOR,    
                });
            }
            
            // set fabric event listeners
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
                
            // save initial canvas
            setFabricData(fabricCanvas);
            setIsLoading(false);
        }
        
        init();
    }, [props.user.id, props.location.search]);
    
    function closeMenu () {
        // makes sure resize modal does not appear if menu closed without finishing action
        if(showResizeModal) {
            toggleResizeModal();
        }
        
        toggleShowMenu();
    }
    
    function validateResize () {
        return (resizeWidth > 0 && resizeHeight > 0);
    }
    
    function resizeCanvas () {
        // set new size for the canvas
        fabricCanvas.setWidth(resizeWidth);
        fabricCanvas.setHeight(resizeHeight);
        setWidth(resizeWidth);
        setHeight(resizeHeight);
        fabricCanvas.fire("save");

        toggleResizeModal();
        
        // close menu if on mobile view
        if(showMenu) {
            toggleShowMenu();
        }
    }
    
    async function saveCanvas () {
        setIsLoading(true);
        
        let params = queryString.parse(props.location.search);
        let payload = {
            title,
            content: JSON.stringify(fabricData),
            width,
            height,
        };
        
        try {
            if(params.id !== undefined) {
                // update doodle
                await Doodle.update(props.user.id, params.id, payload);
            } else {
                // save new doodle
                await Doodle.create(props.user.id, payload);
            }
        } catch(e) {
            alert(e);
        }
        
        setIsLoading(false);
        
        // close menu if on mobile view
        if(showMenu) {
            toggleShowMenu();
        }
    }
    
    function clearCanvas () {
        // clears contents of the canvas
        fabricCanvas.clear();
        fabricCanvas.setBackgroundColor(DEFAULT_BACK_COLOR);
        fabricCanvas.fire("save");

        // close menu if on mobile view
        if(showMenu) {
            toggleShowMenu();
        }
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
                <div className="Editor-header__group">
                    <Link className="Editor-header__link" to="/console">
                        <i className="material-icons">home</i>
                    </Link>
                    <input 
                        className="Editor-header__input"
                        type="text" 
                        id="title"
                        name="title"
                        placeholder="Untitled"
                        value={title}
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </div>
                <button 
                    className="Editor-header__button Editor-header_menu-button" 
                    onClick={toggleShowMenu}
                >
                    <i className="material-icons md-36">menu</i>
                </button>
                <div className="Editor-header__group Editor-header_menu-bar">
                    <button 
                        className="Editor-header__button" 
                        onClick={toggleResizeModal} 
                        title="Resize Canvas"
                    >
                        <i className="material-icons">photo_size_select_large</i>
                        <span>Resize</span>
                    </button>
                    <button 
                        className="Editor-header__button" 
                        onClick={saveCanvas} 
                        title="Save Canvas"
                    >
                        <i className="material-icons">save</i>
                        <span>Save</span>
                    </button>
                    <button 
                        className="Editor-header__button" 
                        onClick={clearCanvas} 
                        title="Clear Canvas"
                    >
                        <i className="material-icons">clear_all</i>
                        <span>Clear</span>
                    </button>
                </div>
            </header>
            <section className={showMenu ? "Editor-menu show" : "Editor-menu hide"}>
                <header className="Editor-menu__header">
                    <button 
                        className="Editor-menu__close-button" 
                        onClick={closeMenu}
                    >
                        <i className="material-icons md-36">clear</i>
                    </button>
                </header>
                <button 
                    className="Editor-menu__button" 
                    onClick={toggleResizeModal} 
                    title="Resize Canvas"
                    disabled={showResizeModal}
                >
                    <i className="material-icons">photo_size_select_large</i>
                    <span>Resize</span>
                </button>
                <button 
                    className="Editor-menu__button" 
                    onClick={saveCanvas} 
                    title="Save Canvas"
                >
                    <i className="material-icons">save</i>
                    <span>Save</span>
                </button>
                <button 
                    className="Editor-menu__button" 
                    onClick={clearCanvas} 
                    title="Clear Canvas"
                >
                    <i className="material-icons">clear_all</i>
                    <span>Clear</span>
                </button>
                {showResizeModal &&
                    <section className="Editor-resize">
                        <header className="Editor-resize__header">
                            <h1>Enter a new canvas size</h1>
                        </header>
                        <section className="Editor-resize__body">
                            <div className="Editor-resize__current">
                                Current: {width} x {height}
                            </div>
                            <FormInput 
                                className="Editor-resize__input"
                                type="number"
                                id="resize-width"
                                name="resize-width"
                                placeholder="Enter new width..."
                                value={resizeWidth}
                                onChange={changeResizeWidth}
                                label="Width"
                            />
                            <FormInput 
                                className="Editor-resize__input"
                                type="number"
                                id="resize-height"
                                name="resize-height"
                                value={resizeHeight}
                                placeholder="Enter new height..."
                                onChange={changeResizeHeight}
                                label="Height"
                            />
                            <button 
                                className="Editor-resize__button"
                                onClick={resizeCanvas} 
                                disabled={!validateResize()}
                            >
                                Confirm
                            </button>
                            <button 
                                className="Editor-resize__button"
                                onClick={toggleResizeModal}
                            >
                                Cancel
                            </button>
                        </section>
                    </section>
                }
            </section>
            <section className="Editor-objects">
                <button 
                    className="Editor-objects__button" 
                    onClick={toggleMode} 
                    title="Activate the brush"
                >
                    <span className={freeMode ? "" : "inactive"}>
                        <i className="material-icons">edit</i> 
                        Draw
                    </span>
                </button>
                <button 
                    className="Editor-objects__button" 
                    onClick={addLine} 
                    disabled={freeMode} 
                    title="Add a line element"
                >
                    <span className="line" />
                </button>
                <button 
                    className="Editor-objects__button" 
                    onClick={addCircle} 
                    disabled={freeMode} 
                    title="Add a circle element"
                >
                    <span className="circle"/>
                </button>
                <button 
                    className="Editor-objects__button" 
                    onClick={addRect} 
                    disabled={freeMode} 
                    title="Add a rectangle element"
                >
                    <span className="rectangle"/>
                </button>
                <button 
                    className="Editor-objects__button" 
                    onClick={addTriangle} 
                    disabled={freeMode} 
                    title="Add a triangle element"
                >
                    <span className="triangle" />
                </button>
                <button 
                    className="Editor-objects__button" 
                    onClick={addText} 
                    disabled={freeMode} 
                    title="Add a text element"
                >
                    <span>
                        <i className="material-icons">title</i>
                    </span>
                </button>
            </section>
            <section className="Editor-context">
                {activeObject &&
                    <div>
                        <div className="Editor-context__item">
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
                        <div className="Editor-context__item">
                            <button onClick={removeObject}>
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                }
                {freeMode && 
                    <div>
                        <div className="Editor-context__item">
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
                        <div className="Editor-context__item">
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
            <section className="Editor-workspace">
                <canvas 
                    className="Editor-workspace__canvas" 
                    ref={cRef}
                >
                    Not Supported by browser.
                </canvas>
            </section>
            {isLoading && 
                <Modal 
                    className="Editor-modal__loader"
                    show={true}
                    close={() => {}}
                >
                    <div className="Editor-loader" />
                </Modal>
            }
            {!showMenu && showResizeModal &&
                <Modal 
                    className="Editor-modal__resize" 
                    show={true} 
                    close={toggleResizeModal}
                >
                    <section className="Editor-resize">
                        <header className="Editor-resize__header">
                            <h1>Enter a new canvas size</h1>
                        </header>
                        <section className="Editor-resize__body">
                            <div className="Editor-resize__current">
                                Current: {width} x {height}
                            </div>
                            <FormInput 
                                className="Editor-resize__input"
                                type="number"
                                id="resize-width"
                                name="resize-width"
                                placeholder="Enter new width..."
                                value={resizeWidth}
                                onChange={changeResizeWidth}
                                label="Width"
                            />
                            <FormInput 
                                className="Editor-resize__input"
                                type="number"
                                id="resize-height"
                                name="resize-height"
                                value={resizeHeight}
                                placeholder="Enter new height..."
                                onChange={changeResizeHeight}
                                label="Height"
                            />
                            <button 
                                className="Editor-resize__button"
                                onClick={resizeCanvas} 
                                disabled={!validateResize()}
                            >
                                Confirm
                            </button>
                            <button 
                                className="Editor-resize__button"
                                onClick={toggleResizeModal}
                            >
                                Cancel
                            </button>
                        </section>
                    </section>
                </Modal>
            }
        </div>
    );
}

export default Editor;
