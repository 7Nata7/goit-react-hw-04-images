import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ imgURL, onCloseModal }) => {
  useEffect(() => {
    const escapeClick = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', escapeClick);

    return () => {
      window.removeEventListener('keydown', escapeClick);
    };
  }, [onCloseModal]);

  const overlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={overlayClick}>
      <div className={css.modal}>
        <img src={imgURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgURL: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
