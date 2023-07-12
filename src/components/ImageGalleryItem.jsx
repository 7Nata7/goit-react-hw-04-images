import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export const ImageGalleryItem = ({ image, onOpenModal }) => {
  const onImageClick = () => {
    onOpenModal(image.largeImageURL);
  };

  return (
    <li className={css.galleryItem} onClick={onImageClick}>
      <img
        className={css.imageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onOpenModal: PropTypes.func,
};
