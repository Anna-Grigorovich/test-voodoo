import axios from 'axios';
axios.defaults.baseURL = 'https://voodoo-sandbox.myshopify.com/products.json';
let currentPage = 1;
export const fetchCard = async (page = 1) => {
  currentPage = page;
  try {
    const { data } = await axios.get(`/?page=${currentPage}&limit=24`);
    window.scrollTo(0, 0);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getCurrentPage = () => currentPage;

fetchCard();
