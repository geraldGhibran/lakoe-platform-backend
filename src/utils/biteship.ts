import axios from 'axios';

const biteship = axios.create({
  baseURL: process.env.BITESHIP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.BITESHIP_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default biteship;
