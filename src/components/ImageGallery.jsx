import css from './ImageGalleryItem.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

