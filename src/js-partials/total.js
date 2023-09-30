import { calculateTotal } from '../utils/localStorage';

const totalEl = document.querySelector('.total-price');

export async function createTotal() {
  totalEl.innerHTML = '';
  totalEl.insertAdjacentHTML('beforeend', await totalMarkup());
}

export async function totalMarkup() {
  const total = await calculateTotal();
  const roundedTotal = total.toFixed(2);
  const markup = () => {
    return ` <p class="h-3 text-yellow-50 text-sm">TOTAL</p>
          <p class="h-3 text-yellow-50 text-sm">${roundedTotal || 0} Kr</p>`;
  };
  return markup();
}
