// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
console.log(galleryItems);

const galleryEl = document.querySelector('.gallery')

const createGalleryItem = galleryItems.reduce((html, nextItem) => html + 
`<a class="gallery__item" href="${nextItem.original}">
<img class="gallery__image" src="${nextItem.preview}" alt="${nextItem.description}" />
</a>`, ``);

galleryEl.innerHTML = createGalleryItem;


const lightbox = new SimpleLightbox('.gallery a', {
    docClose: true,
    enableKeyboard: true,
    loop: true,

    captions: true, 
    captionSelector: '.gallery__image',
    captionType: 'attr',
    captionsData: 'alt', 
    captionPosition: 'bottom',
    captionDelay: 250,
});
       