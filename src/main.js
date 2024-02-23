import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImgs } from './js/pixabay-api';
import { renderImg } from './js/render-functions';

export const refs = {
  formElem: document.querySelector('.form-search'),
  listElem: document.querySelector('.gallery-list'),
  loaderElem: document.querySelector('.loader-container'),
  btnLoadElem: document.querySelector('.btn-load'),
};

let query = '';
let currentPage = 1;
let totalPages = 0;

refs.formElem.addEventListener('submit', onSubmitForm);

async function onSubmitForm(e) {
  e.preventDefault();
  query = e.target.elements.image.value.trim();
  if (!query) {
    return iziToast.show({
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16',
      titleLineHeight: '1.5',
      message: 'Please, enter name of image',
      messageColor: '#fff',
      messageSize: '16',
      messageLineHeight: '1.5',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  }

  refs.listElem.innerHTML = '';
  btnLoadHide();
  loaderShow();
  currentPage = 1;

  await searchImgs(query, currentPage)
    .then(data => {
      totalPages = Math.ceil(data.totalHits / 15);
      if (totalPages === 0) {
        return reject();
      }
      renderImg(data);
      if (totalPages > currentPage) {
        btnLoadShow();
        refs.btnLoadElem.addEventListener('click', onLoadBtn);
      }
    })
    .catch(error => {
      btnLoadHide();
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    })
    .finally(() => {
      loaderHide();
      refs.formElem.reset();
    });
}

const options = {
  captionDelay: 250,
  captionsData: 'alt',
};

export const simpleGallery = new SimpleLightbox('.gallery-list a', options);

function loaderHide() {
  refs.loaderElem.classList.add('is-hidden');
}

function loaderShow() {
  refs.loaderElem.classList.remove('is-hidden');
}

async function onLoadBtn() {
  btnLoadHide();
  loaderShow();
  currentPage += 1;
  await searchImgs(query, currentPage)
    .then(data => {
      renderImg(data);
      if (totalPages > currentPage) {
        btnLoadShow();
      } else {
        iziToast.show({
          message: 'Were sorry, but youve reached the end of search results.',
          messageColor: '#fff',
          messageSize: '16',
          messageLineHeight: '1.5',
          backgroundColor: '#00FFFF',
          position: 'topRight',
        });
      } 
      const galleryItemElem = document.querySelector('.gallery-item');
      const sizeItemElem = galleryItemElem.getBoundingClientRect();
      scrollBy({
        behavior: 'smooth',
        top: sizeItemElem.height * 2.7,
      });
    })
    .catch(error => {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    })
    .finally(() => {
      loaderHide();
    });
}

function btnLoadHide() {
  refs.btnLoadElem.classList.add('is-hidden');
}

function btnLoadShow() {
  refs.btnLoadElem.classList.remove('is-hidden');
}
