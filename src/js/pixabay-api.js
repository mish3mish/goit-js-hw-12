import axios from 'axios';

export async function fetchImages(searchValue, page = 1) {
  const params = new URLSearchParams({
    key: '47046376-5398f80f14019d8274a22c320',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page,
  });

  const imageData = await axios.get(`https://pixabay.com/api/?${params}`);
  return imageData.data;
}
