import createItem from '../js-partials/sidebar';
import {
  removeCardFromLocalStorage,
  updateQuantityInLocalStorage,
} from './localStorage';

export function handleDelete(deleteButtons) {
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      const cardIdToDelete = deleteButton.getAttribute('data-id');
      removeCardFromLocalStorage(cardIdToDelete);
      createItem(); // Обновляем отображение после удаления
    });
  });
}
export function handlePlus(plusButtons) {
  plusButtons.forEach(plusButton => {
    plusButton.addEventListener('click', () => {
      console.log(`+`);
      const cardIdToIncrement = plusButton.getAttribute('data-id');
      updateQuantityInLocalStorage(cardIdToIncrement, 1); // Увеличиваем количество товаров на 1
      createItem(); // Обновляем отображение после увеличения
    });
  });
}
export function handleMinus(minusButtons) {
  minusButtons.forEach(minusButton => {
    minusButton.addEventListener('click', () => {
      console.log(`-`);

      const cardIdToDecrement = minusButton.getAttribute('data-id');
      updateQuantityInLocalStorage(cardIdToDecrement, -1); // Уменьшаем количество товаров на 1
      createItem(); // Обновляем отображение после уменьшения
    });
  });
}
