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

export function updateQuantityInLocalStorage(cardId, change) {
  const storedCards = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCards = storedCards.map(card => {
    if (card.id === parseInt(cardId)) {
      card.quantity = card.quantity + change;

      if (card.quantity < 1) {
        return null;
      }
    }
    return card;
  });

  const filteredCards = updatedCards.filter(card => card !== null);

  localStorage.setItem('cart', JSON.stringify(filteredCards));
}

export async function calculateTotal() {
  try {
    const cards = await getCardsFromLocalStorage(); // Получаем данные из локального хранилища

    // Используем reduce для подсчета общей суммы
    const total = cards.reduce((accumulator, card) => {
      // Проверяем, есть ли цена и количество у карточки
      if (card.price && card.quantity) {
        accumulator += card.price * card.quantity;
      }
      return accumulator;
    }, 0); // Начальное значение аккумулятора равно 0

    return total;
  } catch (error) {
    console.log(error.message);
    return 0; // Возвращаем 0 в случае ошибки
  }
}
