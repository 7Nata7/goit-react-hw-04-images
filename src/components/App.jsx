import { fetchImages } from './services/api';
import React, { useState, useEffect } from 'react';

import css from './App.module.css';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal';

const toastConfig = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, imgURL: '' });

  const onOpenModal = imgURL => {
    setModal({
      isOpen: true,
      imgURL,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      imgURL: null,
    });
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const formSubmit = value => {
    if (searchQuery === value) {
      toast.warn("It's the same query", toastConfig);
      return;
    }
    setSearchQuery(value);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setIsLoading(true);
        const images = await fetchImages(searchQuery, page);

        const totalHits = images.totalHits;
        const totalPages = Math.ceil(totalHits / 12);
        const isMorePages = page < totalPages;

        if (page === 1) {
          setImages(images.hits);
          setLoadMoreBtn(isMorePages);
          setPage(1);
        } else {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setLoadMoreBtn(isMorePages);
        }

        if (images.hits.length === 0) {
          toast.warn('No images', toastConfig);
        }

        if (page === 1 && images.hits.length > 0) {
          toast.success("Wow! It's success", toastConfig);
        }

        if (page === totalPages) {
          setLoadMoreBtn(false);
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again', toastConfig);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchImageData();
    }
  }, [searchQuery, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={formSubmit} />

      {isLoading && <Loader />}

      <ImageGallery images={images} onOpenModal={onOpenModal} />

      {loadMoreBtn && <Button onClick={onLoadMore} />}

      {modal.isOpen && (
        <Modal onCloseModal={onCloseModal} imgURL={modal.imgURL} />
      )}
    </div>
  );
};
