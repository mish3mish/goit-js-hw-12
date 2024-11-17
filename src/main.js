import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
let searchValue = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();
  searchValue = event.target.search.value.trim(); // removed const
  console.log(searchValue);
  if (!searchValue) {
    iziToast.error({
      message: 'The field cannot be empty!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  loader.classList.remove('is-hidden');
  loader.classList.add('is-active');

  await renderImages();
}

async function renderImages() {
  try {
    const response = await fetchImages(searchValue, page);
    if (response.totalHits === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
      });
      return;
    }
    gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    if (response.hits.length === 15 && response.totalHits > page * 15) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    getCardHeight();
  } catch (error) {
    console.log(error.message);
  } finally {
    loader.classList.remove('is-active');
    loader.classList.add('is-hidden');
  }
}

async function handleLoadMore() {
  page += 1;
  await renderImages();
}

function getCardHeight() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const rect = galleryItem.getBoundingClientRect();
    const cardHeight = rect.height;

    if (page > 1) {
      setTimeout(() => {
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }, 300);
    }
  }
}
