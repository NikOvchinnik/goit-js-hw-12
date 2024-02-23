import axios from 'axios';

export async function searchImgs(imgName, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/?';
  const params = {
    key: '42408042-b97fa2d9d3888df0f8d594195',
    q: `${imgName}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15,
  };

  const url = BASE_URL + END_POINT;
  const res = await axios.get(url, { params });

  return res.data;
}
