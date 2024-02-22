export function searchImgs(imgName) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/?';
  const PARAMS = new URLSearchParams({
    key: '42408042-b97fa2d9d3888df0f8d594195',
    q: `${imgName}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = BASE_URL + END_POINT + PARAMS;

  return fetch(url).then(res => res.json());
}
