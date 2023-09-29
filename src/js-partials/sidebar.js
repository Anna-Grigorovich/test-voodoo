const listEl = document.querySelector('.shop_list');

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
    console.log(cards);

    listEl.innerHTML = '';
    listEl.insertAdjacentHTML('beforeend', await itemShopMarkup(cards));

    // window.removeEventListener('load', fetchPopularMovies);
  } catch (error) {
    console.log(error.message);
  }
}

export async function itemShopMarkup(cards) {
  //   const cards = await getCardsFromLocalStorage(); // Получаем данные из локального хранилища

  const markup = cards.map(card => {
    const id = card.id;
    const imageSrc =
      card.imgSrc || 'https://dummyimage.com/300x300/ffffff/ff36ff.png'; // Используем imgSrc из данных или значение по умолчанию

    return `<li>
            <div class="flex justify-between">
              <div>
                <img
                  src="${imageSrc}"
                  alt=""
                  class="w-[74px] h-[74px]"
                />
              </div>
              <div class=" flex flex-col gap-3 ">
                <p class="h-3 text-yellow-50 text-sm font-bold">${
                  card.title || 'Product Name'
                }</p>
                <p class="h-3 text-yellow-50 text-sm font-bold">${
                  card.price
                }</p>
                <div class="flex">
                  <button>
                    <svg width="10px" height="10px"  fill="#FCF7E6">
                      <use href="./image/symbol-defs.svg#icon-min"></use>
                    </svg>
                  </button>
                  <p class="h-5 text-center text-yellow-50 text-sm font-bold">
                    ${card.quantity || '1'}
                  </p>
                  <button>
                    <svg width="10px" height="10px"  fill="#FCF7E6">
                      <use href="./image/symbol-defs.svg#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <button>
                  <svg width="24px" height="24px" fill="#FFFFFF" >
                    <use href="./image/symbol-defs.svg#icon-delete"></use>
                  </svg>
                </button>
              </div>
            </div>
          </li>`;
  });
  console.log(markup);
  return markup.join('');
}

// Функция для получения данных из локального хранилища
function getCardsFromLocalStorage() {
  const storedCards = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(storedCards);
  return storedCards;
}

createItem();
