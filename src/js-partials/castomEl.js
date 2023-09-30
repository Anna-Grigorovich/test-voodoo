class CustomPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `

      <slot></slot>
    `;
  }

  // Метод для отображения/скрытия попапа
  toggle() {
    const isVisible = this.style.display !== 'none';
    this.style.display = isVisible ? 'none' : 'block';
  }
}

customElements.define('custom-popup', CustomPopup);

const popupButton = document.querySelector('.popup-button');
const customPopup = document.querySelector('custom-popup');

document.addEventListener('DOMContentLoaded', () => {
  const popupButton = document.querySelector('.popup-button');
  const customPopup = document.querySelector('custom-popup');

  popupButton.addEventListener('click', () => {
    customPopup.toggle();
  });
});
