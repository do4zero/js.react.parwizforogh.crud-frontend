import api from '../../../utils/api';

const create = async (body) => {
  const response = await api.post('/articles', body);
  const { data } = response.data;
  return data;
};

const update = async (body, id) => {
  const response = await api.put(`/articles/${id}/`, body);
  const { data } = response.data;
  return data;
};

const fetch = async () => {
  const response = await api.get('/articles');
  const { data } = response.data;
  return data;
};

const fetchOne = async (id) => {
  const response = await api.get(`/articles/${id}/`);
  const { data } = response.data;
  return data;
};

const deleteCard = async (id) => {
  const response = await api.delete(`/articles/${id}/`);
  const { data } = response.data;
  return data;
};

export { create, update, fetch, fetchOne, deleteCard };
