import { getCurrentPage } from './api';
import fetchCards from './collection';
const totalPages = Math.ceil(461 / 24);
const paginationEl = document.querySelector('.pagination');

export function createPagination() {
  const currentPage = getCurrentPage();
  paginationEl.innerHTML = '';

  const maxButtons = 5;
  const sideButtons = Math.floor(maxButtons / 2);

  let startPage = currentPage - sideButtons;
  let endPage = currentPage + sideButtons;

  if (startPage < 1) {
    startPage = 1;
    endPage = maxButtons;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - maxButtons + 1;
  }

  if (startPage < 1) {
    startPage = 1;
  }

  if (startPage > 1) {
    const firstPageButton = document.createElement('button');
    firstPageButton.className = 'w-10 h-10 rounded-full border border-black';
    firstPageButton.innerText = '1';
    firstPageButton.addEventListener('click', () => fetchCards(1));
    paginationEl.appendChild(firstPageButton);

    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.innerText = '...';
      paginationEl.appendChild(ellipsis);
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    const pageButton = document.createElement('button');
    pageButton.className = 'w-10 h-10 rounded-full border border-black';

    if (page === currentPage) {
      pageButton.classList.add('active');
    }

    pageButton.innerText = page;
    pageButton.addEventListener('click', () => fetchCards(page));
    paginationEl.appendChild(pageButton);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.innerText = '...';
      paginationEl.appendChild(ellipsis);
    }

    const lastPageButton = document.createElement('button');
    lastPageButton.className = 'w-10 h-10 rounded-full border border-black';
    lastPageButton.innerText = totalPages;
    lastPageButton.addEventListener('click', () => fetchCards(totalPages));
    paginationEl.appendChild(lastPageButton);
  }
}

// createPagination();
