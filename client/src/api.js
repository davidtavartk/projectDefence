import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

const registerUser = (username, password, email) => {
  return api.post('/registration', {
    username: username,
    password: password,
    email: email
  });
}

const loginUser = (username, password) => {
  return api.post('/login', {
    username: username,
    password: password
  });
}

const makeCollection = (formData) => {
  return api.post('/collection', formData);
}

const getCollection = (id) => {
  return api.get(`/collection/${id}`);
}

const getAllCollections = () => {
  return api.get('/home');
}

const makeItem = (formData) => {
  return api.post('/item', formData);
}
const getAllItems = () => {
  return api.get('/homeItems');
}

const getItem = (id) => {
  return api.get(`/item/${id}`)
}

const getItemComments = (id) => {
  return api.get(`/item/${id}/comments`, getItemComments);
}

const addComment = (id, data) => {
  return api.post(`/item/${id}/comment`, data);
}

const addItemLike = (id, user_id) => {
  return api.post(`/item/${id}/addLike`, { user_id });
}

const removeItemLike = (id, user_id) => {
  return api.post(`/item/${id}/removeLike`, { user_id });
}

const getIsLiked = (id, user_id) => {
  return api.get(`/item/${id}/isLiked/${user_id}`);
}

const getLikesCountForItem = (id) => {
  return api.get(`/item/${id}/likesCount`)
}

export {
  api, registerUser, loginUser, makeCollection, getCollection,
  getAllCollections, getAllItems, getItem, addComment, getItemComments,
  addItemLike, removeItemLike, getIsLiked, makeItem, getLikesCountForItem
};