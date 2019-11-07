import axios from "axios";

// PROD URL
export const BASE_URL = "http://localhost:8000";

// DEV URL
export const BASE_URL_DEV = "http://localhost:3000";

export const api = {
  // Gerenciamento
  getAllFields(allfields) {
    return axios.get(allfields);
  },
  prodwells_by_fields(allfields) {
    return axios.get(allfields);
  },
  filter_injectwells(allfields) {
    return axios.get(allfields);
  },
  listarPocosProdutores(url) {
    return axios.get(url);
  },
  getWellInjectors(url) {
    return axios.get(url);
  },

  // Exploracao
  getPrimaryDataForm(url) {
    return axios.get(url);
  },
  postPrimaryDataForm(url) {
    return axios.post(url);
  }
};
