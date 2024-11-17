export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-item-link">
        <img src="${webformatURL}" alt="${tags}" class="gallery-item-img" />
        <div class="gallery-item-content">
        <p class="gallery-item-description">Likes<span> ${likes}</span></p>
        <p class="gallery-item-description">Views<span> ${views}</span></p>
        <p class="gallery-item-description">Comments<span> ${comments}</span></p>
        <p class="gallery-item-description">Downloads<span> ${downloads}</span></p>
        </div>
        </a>
      </li>
      `
    )
    .join('');
}
