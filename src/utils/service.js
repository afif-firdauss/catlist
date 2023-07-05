import axios from 'axios';

const API_URL = "https://api.thecatapi.com/v1/";
const API_KEY = "live_CNE5NxUSWwEtLvzG8ChkawCfHRykSpHkOFWo1nkU0lJXGv60MHjOXWU1ic5wV1Z4"

export default class Service {
  getListItem(limit, page) {
    return axios(`${API_URL}breeds?limit=${limit}&page=${page}&order=Desc&api_key=${API_KEY}`, {
        method: 'GET',
    }).then(data => data?.data)
  }

  getItem(id) {
    return axios(`${API_URL}images/${id}`, {
        method: 'GET',
    }).then(data => data?.data)
  }

  searchItem(filter) {
    return axios(`${API_URL}images/search?limit=30&order=Desc&breed_ids=${filter}&api_key=${API_KEY}`, {
      method: 'GET',
  }).then(data => data?.data)
  }
}