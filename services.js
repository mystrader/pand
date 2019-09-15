import axios from "axios";

// 1. AllFields: http://www.json-generator.com/api/json/get/ceyAJrObFK?indent=2
// 2. FilterProdWells,id_38: http://www.json-generator.com/api/json/get/cgieBdJrCa?indent=2
// 3. FilterInjectWells:  http://www.json-generator.com/api/json/get/bVpwFsdeNu?indent=2

// const allfields =  "http://www.json-generator.com/api/json/get/ceyAJrObFK?indent=2";
// const prodwells_by_fields =  "http://www.json-generator.com/api/json/get/ceyAJrObFK?indent=2";
// const filter_injectwells =  "http://www.json-generator.com/api/json/get/ceyAJrObFK?indent=2";

export const api = {
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
  }
};
