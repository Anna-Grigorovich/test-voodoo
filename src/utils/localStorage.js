export function saveToLocalStorage(product) {
  let existingProducts = JSON.parse(localStorage.getItem('cart')) || [];

  existingProducts = existingProducts.map(existingProduct => {
    return {
      ...existingProduct,
      id: parseFloat(existingProduct.id),
    };
  });
  product.id = parseFloat(product.id);
  const existingProductIndex = existingProducts.findIndex(existingProduct => {
    return existingProduct.id === product.id;
  });
  if (existingProductIndex !== -1) {
    const updatedProducts = [...existingProducts];
    updatedProducts.splice(existingProductIndex, 1);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  } else {
    existingProducts.push(product);
    localStorage.setItem('cart', JSON.stringify(existingProducts));
  }
}

export function removeCardFromLocalStorage(cardId) {
  const storedCards = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCards = storedCards.filter(card => card.id !== parseInt(cardId));
  localStorage.setItem('cart', JSON.stringify(updatedCards));
}
export function getCardsFromLocalStorage() {
  const storedCards = JSON.parse(localStorage.getItem('cart')) || [];
  return storedCards;
}

// export function updateQuantityInLocalStorage(cardId, change) {
//   const storedCards = JSON.parse(localStorage.getItem('cart')) || [];
//   const updatedCards = storedCards.map(card => {
//     if (card.id === parseInt(cardId)) {
//       // Изменяем количество товаров на указанное значение (change)
//       card.quantity = card.quantity + change;
//     }
//     return card;
//   });
//   localStorage.setItem('cart', JSON.stringify(updatedCards));
// }

export function updateQuantityInLocalStorage(cardId, change) {
  const storedCards = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCards = storedCards.map(card => {
    if (card.id === parseInt(cardId)) {
      // Изменяем количество товаров на указанное значение (change)
      card.quantity = card.quantity + change;

      // Проверяем, стало ли количество товаров меньше 0
      if (card.quantity < 1) {
        // Если да, то удаляем эту карточку из массива
        return null;
      }
    }
    return card;
  });

  // Фильтруем, чтобы удалить все null значения (карточки с отрицательным количеством)
  const filteredCards = updatedCards.filter(card => card !== null);

  localStorage.setItem('cart', JSON.stringify(filteredCards));
}
