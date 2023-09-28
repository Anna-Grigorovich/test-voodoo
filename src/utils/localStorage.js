export function saveToLocalStorage(product) {
  // Получите текущий список товаров из локального хранилища (если он существует)
  let existingProducts = JSON.parse(localStorage.getItem('cart')) || [];

  // Проверьте, есть ли товар с таким же ID
  const existingProductIndex = existingProducts.findIndex(
    existingProduct => existingProduct.id === product.id
  );
  console.log(product.id);
  console.log(existingProducts);
  if (existingProductIndex !== -1) {
    // Если товар с таким ID уже существует, удалите его
    existingProducts.splice(existingProductIndex, 1);
  }

  // Добавьте новый товар к существующему списку
  existingProducts.push(product);

  // Сохраните обновленный список товаров в локальное хранилище
  localStorage.setItem('cart', JSON.stringify(existingProducts));
}
