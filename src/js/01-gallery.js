// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);



const galleryRef = document.querySelector(".gallery");


function createImage(galleryItems) {
  return galleryItems
    .map((e) => {
  return `<div class="gallery__item"> <a
        class="gallery__link"
        href="${e.original}">
        <img
        class="gallery__image"
        src="${e.preview}"
        alt="${e.description}"
        loading="lazy"
        ></img>
        </a></div>`;
    })
    .join(" ");
}
const galleryCreate = createImage(galleryItems);
galleryRef.insertAdjacentHTML("beforeEnd", galleryCreate);

new SimpleLightbox('.gallery a', {captionsData: "alt", captionDelay: 250 });
