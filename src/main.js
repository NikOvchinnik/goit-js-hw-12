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
};

refs.formElem.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const userSearch = e.target.elements.image.value.trim();
  if (!userSearch) {
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

  loaderShow();

  searchImgs(userSearch)
    .then(data => {
      if (data.hits.length === 0) {
        refs.listElem.innerHTML = '';
        return iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          messageSize: '16',
          messageLineHeight: '1.5',
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
      }
      renderImg(data);
    })
    .catch(error => {
      console.log('Error');
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
