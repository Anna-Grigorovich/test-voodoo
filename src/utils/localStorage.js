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
