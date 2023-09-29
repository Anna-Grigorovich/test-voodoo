import axios from 'axios';
const MAIN_URL = ' https://voodoo-sandbox.myshopify.com/products.json?limit=12';
axios.defaults.baseURL = 'https://voodoo-sandbox.myshopify.com/products.json';
let page = 1;
export const fetchCard = async () => {
  try {
    const { data } = await axios.get(`/?page=${page}&limit=24`);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

fetchCard();
