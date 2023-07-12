import css from './Button.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export const Button = ({ onClick }) => {
  return (
    <div>
      <button className={css.load_button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
