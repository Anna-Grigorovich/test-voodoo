import axios from 'axios';
const MAIN_URL = ' https://voodoo-sandbox.myshopify.com/products.json?limit=12';
axios.defaults.baseURL = 'https://voodoo-sandbox.myshopify.com/products.json';
export const fetchCard = async (page = 1) => {
  try {
    const { data } = await axios.get(`/?page=${page}&limit=24`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

fetchCard();
