// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const gallery = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend', cardsMarkup)


function createGalleryCardsMarkup (galleryItems ){
    return galleryItems
    .map(({ preview, original, description }) => {
    return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
      </a>
    </li>`;
})
.join('');
}

gallery.addEventListener('click', evt => {
evt.preventDefault();
if (evt.target.nodeName !== 'IMG') {
   return 
}
const instance = basicLightbox.create(`
<div class="modal">
<img src="${evt.target.dataset.source}" 
width="1100 height="800" />
</div>
`,

{
    onShow: instance => {
      instance.element().querySelector('img').onclick = instance.close;
      
      window.addEventListener('keydown', eventHandler);
    },
    onClose: instance => {
      window.removeEventListener('keydown', eventHandler);
    },
  },
);
      function eventHandler(event) {
        if (event.key === 'Escape') {
          instance.close();
          return;
        }
      }

instance.show();
})
