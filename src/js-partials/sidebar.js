import { handleDelete, handleMinus, handlePlus } from '../utils/listener';
import {
  getCardsFromLocalStorage,
  removeCardFromLocalStorage,
  updateQuantityInLocalStorage,
} from '../utils/localStorage';

const listEl = document.querySelector('.shop_list');
const svgIcon = require('../image/symbol-defs.svg');

const sidebar = document.querySelector('.sidebar');
// Ссылка на элемент иконки корзины (по которому пользователь будет нажимать)
const cartIcons = document.querySelectorAll('.cart-icon');

// Обработчик события нажатия на иконку корзины для каждой иконки
cartIcons.forEach(cartIcon => {
  cartIcon.addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-full'); // Переключаем класс, чтобы показать/скрыть сайдбар
    // Проверяем, виден ли сейчас сайдбар (класс 'translate-x-full' не применен)
    const sidebarVisible = !sidebar.classList.contains('translate-x-full');
    // Если сайдбар виден, вызываем createItem
    if (sidebarVisible) {
      createItem();
    }
  });
});

export default async function createItem() {
  try {
    const cards = await getCardsFromLocalStorage(); // Получаем данные из локального хранилища

    listEl.innerHTML = '';
    listEl.insertAdjacentHTML('beforeend', await itemShopMarkup(cards));

    const deleteButtons = document.querySelectorAll('.delete-button');
    handleDelete(deleteButtons);

    const plusButtons = document.querySelectorAll('.plus-button');
    handlePlus(plusButtons);
    const minusButtons = document.querySelectorAll('.minus-button');
    handleMinus(minusButtons);
  } catch (error) {
    console.log(error.message);
  }
}
export async function totalMarkup() {}

export async function itemShopMarkup(cards) {
  const markup = cards.map(card => {
    const id = card.id;

    const imageSrc =
      card.imgSrc || 'https://dummyimage.com/300x300/ffffff/ff36ff.png'; // Используем imgSrc из данных или значение по умолчанию

    return `<li>
            <div class="flex justify-between">
              <div class="flex">
                <img
                  src="${imageSrc}"
                  alt=""
                  class="w-[74px] h-[74px]"
                />
              <div class=" flex flex-col gap-3 ml-[18px] truncate max-w-[200px] ">
                <p class="h-3 text-yellow-50 text-sm font-bold ">${card.title}</p>
                <p class="h-3 text-yellow-50 text-sm font-bold">${card.price}</p>
                <div class="flex gap-2">
                  <button data-id="${id}" class="minus-button">
          <svg width="10px" height="10px" fill="#FCF7E6">
           <use href="${svgIcon}#icon-min"></use>
          </svg>
 </button>
                  <p class="h-5 text-center text-yellow-50 text-sm font-bold">
                    ${card.quantity}
                  </p>
                  <button data-id="${id}" class="plus-button">
                    <svg width="10px" height="10px"  fill="#FCF7E6">
                       <use href="${svgIcon}#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
              </div>

              <div>
                <button data-id="${id}" class="delete-button">
                  <svg width="24px" height="24px" fill="#FCF7E6" >
                   <use href="${svgIcon}#icon-delete"></use>
                  </svg>
                </button>
              </div>
            </div>
          </li>`;
  });
  return markup.join('');
}

createItem();
