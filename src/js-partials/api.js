import axios from 'axios';
const MAIN_URL = ' https://voodoo-sandbox.myshopify.com/products.json?limit=12';
axios.defaults.baseURL = 'https://voodoo-sandbox.myshopify.com/products.json';
let currentPage = 1;
export const fetchCard = async (page = 1) => {
  currentPage = page;
  try {
    const { data } = await axios.get(`/?page=${currentPage}&limit=24`);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getCurrentPage = () => currentPage;

fetchCard();
