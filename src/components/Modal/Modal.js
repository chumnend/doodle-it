import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

function Modal(props) {
  const noAction = (event) => {
    // prevent close if clicking in window
    event.stopPropagation();
  };

  return (
    <div className={props.show ? 'Modal' : 'Modal-hide'} onClick={props.close}>
      <div className="Modal-box" onClick={noAction}>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
