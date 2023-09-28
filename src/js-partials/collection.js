import { fetchCard } from './api';
const galleryEl = document.querySelector('.cards__list');

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
  const markup = await card.map(({ id, title }) => {
    console.log(card);
    return `<li class="w-[300px] h-[402px]">
        <div class="relative mb-3">
          <img
            src="https://cdn.shopify.com/s/files/1/0690/0075/7529/products/5196c9302b12ec8d50d0e700e2865c2a.png?v=1694603298"
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
            <p class="font-bold text-sm">${title}</p>
            <p class="font-bold text-sm">000Kr</p>
          </div>
          <div>
            <p class="font-bold text-sm">condition</p>
            <p class="text-sm font-normal">rating</p>
          </div>
        </div>
        <button class="bg-black text-white min-w-full h-[42px] rounded">
          ADD TO CART
        </button>
      </li>`;
  });
  //   console.log(markup);

  return markup;
}

// cardMarkup();
fetchCards();
