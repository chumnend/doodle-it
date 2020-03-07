import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../Button";
import "./LoaderButton.css";

function LoaderButton ({ className, disabled, children, ...props }) {
    return (
        <Button 
            className={classNames(className, "LoaderButton")}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
}

LoaderButton.defaultProps = {
    className: "",
    disabled: false,
};

LoaderButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default LoaderButton;
