import axios from "axios";

export const BASE_URL = process.env.BASE_URL;

console.log("VARIÁVEL DE AMBIENTE", process.env.BASE_URL);

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
