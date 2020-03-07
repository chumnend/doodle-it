import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Modal.css";

function Modal ({ className, show, close, children, ...props}) {
    
    const noAction = (e) => e.stopPropagation(); // prevent close if clicking in window
    
    return (
        <div 
            className={classNames(className, "Modal", { "Modal-hide": !show })} 
            onClick={close}
        >
            <div className="Modal-main" onClick={noAction}>
                {children}
            </div>
        </div>
    );
} 

Modal.defaultProps = {
    className: "",
};

Modal.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.instanceOf(Array).isRequired,   
};

export default Modal;
