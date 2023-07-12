import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '36535246-034277b0f5c12969743e82132';

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `${baseURL}?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};