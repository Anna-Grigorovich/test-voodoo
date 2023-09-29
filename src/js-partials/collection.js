import { saveToLocalStorage } from '../utils/localStorage';
import { fetchCard } from './api';
const galleryEl = document.querySelector('.cards__list');
galleryEl.addEventListener('click', handlerContainerClick);
function handlerContainerClick(evt) {
  evt.preventDefault();
  const targetBtn = evt.target.closest('.addBtn'); // Используем closest для поиска ближайшего элемента с классом .addBtn
  if (!targetBtn) {
    return;
  }
  const title = targetBtn.getAttribute('data-title');
  const price = targetBtn.getAttribute('data-price');
  const imgSrc = targetBtn.getAttribute('data-img');
  const id = targetBtn.getAttribute('data-id');

  const product = {
    title,
    price,
    imgSrc,
    id,
  };
  saveToLocalStorage(product);
  createItem();
}
export default async function fetchCards(option) {
  try {
    const { products } = await fetchCard();
    // console.log(products);
    // filmTrendsAPI.page = 1;
    // createPagination(option, 1, total_results);

    galleryEl.innerHTML = '';
    galleryEl.insertAdjacentHTML('beforeend', await cardMarkup(products));

    // window.removeEventListener('load', fetchPopularMovies);
  } catch (error) {
    console.log(error.message);
  }
}

export async function cardMarkup(card) {
  const markup = await card.map(card => {
    const id = card.id;

    let imageSrc = card.images[0]?.src;
    if (!imageSrc) {
      imageSrc = 'https://dummyimage.com/300x300/ffffff/ff36ff.png';
    }

    return `<li class="w-[300px] h-[402px]">
        <div class="relative mb-3">
          <img
            src="${imageSrc}"
            alt=""
          />
          <button
            class="text-mainBgColor p-2 bg-black rounded h-[26px] w-[48px] flex justify-center items-center text-xs absolute left-3 top-3"
          >
            USED
          </button>
        </div>
        
        <div class="flex justify-between mb-3">
          <div>
            <p class="font-bold text-sm truncate max-w-[200px]">${card.title}</p>
            <p class="font-bold text-sm ">${card.variants[0].price} Kr</p>
          </div>
          <div>
            <p class="font-bold text-sm truncate">${card.vendor}</p>
            <p class="text-sm font-normal">rating</p>
          </div>
        </div>
        <button class="bg-black text-white min-w-full h-[42px] rounded addBtn"  data-id="${id}" data-title="${card.title}"
  data-price="${card.variants[0].price}"
  data-img="${imageSrc}">
          ADD TO CART
        </button>
      </li>`;
  });
  //   console.log(markup);

  return markup.join('');
}

// cardMarkup();
fetchCards();
