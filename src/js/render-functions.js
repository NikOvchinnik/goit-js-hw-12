import { refs } from '../main';
import { simpleGallery } from '../main';

export function renderImg(imgsObj) {
  const markup = imgsObj.hits
    .map(img => {
      return `<li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img
          src=${img.webformatURL}
          alt=${img.tags}
          width="360"
          height="200"
        />
        </a>
        <ul class="img-list-info">
          <li class="img-item">
            <h2 class="img-title">Likes</h2>
            <p class="img-text">${img.likes}</p>
          </li>
          <li class="img-item">
            <h2 class="img-title">Views</h2>
            <p class="img-text">${img.views}</p>
          </li>
          <li class="img-item">
            <h2 class="img-title">Comments</h2>
            <p class="img-text">${img.comments}</p>
          </li>
          <li class="img-item">
            <h2 class="img-title">Downloads</h2>
            <p class="img-text">${img.downloads}</p>
          </li>
        </ul>
      </li>`;
    })
    .join('');

  refs.listElem.innerHTML = markup;
  simpleGallery.refresh();
}
