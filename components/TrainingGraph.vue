<template>
  <div>
    <b-row align-v="center">
      <b-col sm="7">
        <h6 class="font-weight-bold green">Intervalo de Treinamento</h6>
        <h2>{{this.type}}</h2>
        {{this.liquid_file}}
        {{this.oil_file}}
        {{this.gas_file}}
        <b-form-row>
          <b-col sm="4">
            <label for="date-start">Data início</label>
            <b-input
              id="date-start"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="date"
              ref="datestart"
              v-model="datestart"
            ></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="date-end">Data fim</label>
            <b-input id="date-end" class="mb-2 mr-sm-2 mb-sm-0" type="date" v-model="dateend"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="valitadion">
              Validação
              <small>(Meses)</small>
            </label>
            <b-input
              id="valitadion"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="number"
              v-model="validation"
            ></b-input>
          </b-col>
          <!-- col -->
        </b-form-row>
        <!-- form-row -->
      </b-col>
      <!-- col -->
      <b-col>
        <h6 class="font-weight-bold green">Parâmetros de treinamento</h6>
        <b-form-row>
          <b-col sm="4">
            <label for="simulation">Simulação</label>
            <b-input
              id="simulation"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="number"
              v-model="simulation"
            ></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="interval">Intervalo</label>
            <b-input id="interval" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="interval"></b-input>
          </b-col>
          <!-- col -->
        </b-form-row>
        <!-- form-row -->
      </b-col>
      <button
        class="btn btn-success mt-5 mr-4 px-5"
        type="button"
        @click="training"
        v-on:click="counter += 1"
      >Treinar</button>
      <button
        class="btn btn-success mt-5 mr-4 px-5"
        type="button"
        @click="triggerTrainingAll"
      >Treinar TUDO</button>
    </b-row>
    <!-- row -->
    <hr class="mt-5 mb-5" />

    <b-row>
      <b-col sm="12">
        <b-button variant="outline-success" size="sm" @click="reset">Reset Zoom</b-button>
        <b-button variant="outline-success" size="sm" @click="print">Salvar Gráfico</b-button>

        <div>
          <graph
            ref="chartLiquid"
            v-show="!isShowing"
            v-if="type === 1"
            :height="180"
            :chart-data="liquid"
            :options="chartOptions"
          />
          <graph
            ref="chartOil"
            v-show="!isShowing"
            v-if="type === 2"
            :height="180"
            :chart-data="oil"
            :options="chartOptions"
          />
          <graph
            ref="chartGas"
            v-show="!isShowing"
            v-if="type === 3"
            :height="180"
            :chart-data="gas"
            :options="chartOptions"
          />

          <graph
            ref="chartLiquidTr"
            v-show="isShowing"
            v-if="type === 1"
            :height="180"
            :chart-data="outputliquidTrained"
            :options="chartOptionsVertical"
          />
          <!-- ref="myChartTrained" -->
          <graph
            ref="chartOilTr"
            v-show="isShowing"
            v-if="type === 2"
            :height="180"
            :chart-data="outputoilTrained"
            :options="chartOptionsVertical"
          />
          <graph
            ref="chartGasTr"
            v-show="isShowing"
            v-if="type === 3"
            :height="180"
            :chart-data="outputgasTrained"
            :options="chartOptionsVertical"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BASE_URL } from "@/services";
import axios from "axios";
import main from "../plugins/main";
import ChartAnnotationsPlugin from "chartjs-plugin-annotation";
import barramento from "@/barramento";

import Graph from "~/components/Graph.vue";

export default {
  props: {
    idwell: [String, Number, Array, Object],
    idField: [String, Number, Array, Object],
    type: [Number, Array, Object],
    injectWells: [Object, Array],
    liquid_file: [Object, Array],
    gas_file: [Object, Array],
    oil_file: [Object, Array]
  },
  components: {
    Graph
  },
  data() {
    return {
      counter: 0,
      isShowing: false,
      oil: {},
      oil_trained: {},
      liquid: {},
      liquid_trained: {},
      gas: {},
      gas_trained: {},
      chartOptions: {},
      chartOptionsVertical: {},
      datestart: "", // use fileLoad
      dateend: "", // use fileLoad
      validation: 18, // use fileLoad
      simulation: 50, // use fileLoad
      interval: 1, // use fileLoad
      outputoilTrained: "",
      outputliquidTrained: "",
      outputgasTrained: {}
    };
  },
  async created() {
    this.fillData();
  },
  methods: {
    triggerTrainingAll() {
      this.trainingAll(1);
      this.trainingAll(2);
      this.trainingAll(3);
    },
    getChartVisible() {
      var refChart = "";

      if (this.type === 1) {
        refChart = !this.isShowing ? "chartLiquid" : "chartLiquidTr";
      }
      if (this.type === 2) {
        refChart = !this.isShowing ? "chartOil" : "chartOilTr";
      }
      if (this.type === 3) {
        refChart = !this.isShowing ? "chartGas" : "chartGasTr";
      }

      return refChart;
    },
    reset() {
      this.$resetGraph(this.getChartVisible());
    },
    print() {
      this.$print(this.getChartVisible());
    },
    fillData() {
      axios
        .get(`${BASE_URL}/gerenciamento/ListarGraficos/` + this.idwell)

        // @info: ISSUE: listar grafico
        // .get(`${BASE_URL}/gerenciamento/ListarGraficos/` + this.idwell  + "@"+  this.idField)
        .then(response => {
          const responseData = response.data;
          //this.datestart = ;
          this.datestart = responseData.map(item => item.data_inicio);
          this.dateend = responseData.map(item => item.data_fim);

          // DATA ÓLEO
          this.oil = {
            labels: responseData[0].oil.map(item => item.date),

            datasets: [
              {
                fill: true,
                label: "Vazão de Óleo",
                backgroundColor: "rgba(66, 184, 131, 0.2)",
                borderWidth: 2,
                borderColor: "#42b883",
                pointBackgroundColor: "#42b883",
                data: responseData[0].oil.map(item => item.value)
              }
            ]
          };

          // DATA LIQUID
          this.liquid = {
            labels: responseData[0].liquid.map(item => item.date),

            datasets: [
              {
                fill: true,
                label: "Vazão de Líquido",
                backgroundColor: "rgba(29, 140, 248, 0.2)",
                borderWidth: 2,
                borderColor: "#1d8cf8",
                pointBackgroundColor: "#1d8cf8",
                data: responseData[0].liquid.map(item => item.value)
              }
            ]
          };

          // DATA GAS
          this.gas = {
            labels: responseData[0].gas.map(item => item.date),

            datasets: [
              {
                fill: true,
                label: "Vazão de Gás",
                backgroundColor: "rgba(160, 140, 20, 0.2)",
                borderWidth: 2,
                borderColor: "#af8306",
                pointBackgroundColor: "#af8306",
                data: responseData[0].gas.map(item => item.value)
              }
            ]
          };

          // OPTIONS (commons , oil, liquid and Gás)
          this.chartOptions = {
            title: {
              display: true,
              text: responseData.map(item => item.name)
            },
            pan: {
              enabled: true,
              mode: "x"
            },
            zoom: {
              drag: true,
              enabled: true,
              mode: "xy",
              speed: 0.7
            },

            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Valor"
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    // max: 20
                    // min: 0,
                    stepSize: 4.5
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Data"
                  }
                }
              ]
            }
          };
        });
    },

    async training() {
      //  this.$NotificationInfo("Treinando com dados informado, aguarde ...");

      // Initial Values
      let newGraph = this;
      let sufixUrl = "";
      let vazao = "";
      let nomeVazao = "";

      // Vazão Líquida
      if (this.type === 1) {
        sufixUrl = "Bruta";
        vazao = "liquid";
        nomeVazao = "Líquido";
      }
      // Vazão Óleo
      if (this.type === 2) {
        sufixUrl = "Oleo";
        vazao = "oil";
        nomeVazao = "Óleo";
      }
      // Vazão Gás
      if (this.type === 3) {
        sufixUrl = "Gas";
        vazao = "gas";
        nomeVazao = "Gás";
      }

      const Training = axios.create({
        withCredentials: true
      });
      Training.post(`${BASE_URL}/gerenciamento/ModelARFlowTraining`, {
        start_date: Array.isArray(this.datestart)
          ? this.datestart[0]
          : this.datestart,
        final_date: Array.isArray(this.dateend)
          ? this.dateend[0]
          : this.dateend,
        window_size: parseInt(this.validation),
        n_interval: parseInt(this.interval),
        well_id: this.idwell,
        injection_wells: this.injectWells.map(item => item.id),
        n_sims: parseInt(this.simulation),
        training_type: vazao,
        training_id: localStorage.getItem("training_id") + "-" + this.idwell
      })
        .then(response => {
          //Show trained graph with tab
          this.$NotificationSuccess("Treinado com sucesso!");

          var lstTrained = new Array();
          for (const key in response.data[vazao]) {
            const element = Object.assign({}, response.data[vazao][key]);
            element.value = undefined;

            for (const keyT in response.data[vazao + "_trained"]) {
              var elementT = response.data[vazao + "_trained"][keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }

            lstTrained.push(element);
          }
          // Create Trained line
          this.chartOptionsVertical = {
            title: {
              display: true,
              text: response.data.name
            },
            pan: {
              enabled: true,
              mode: "x"
            },
            zoom: {
              drag: true,
              enabled: true,
              mode: "xy",
              speed: 0.7
            },
            annotation: {
              events: ["click"],
              annotations: [
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: response.data.vertical_date_line,
                  borderColor: "red",
                  label: {
                    content: "TODAY",
                    enabled: false,
                    position: "top"
                  }
                }
              ]
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Valor"
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    // max: 20
                    // min: 0,
                    stepSize: 4.5
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Data"
                  }
                }
              ]
            }
          };

          let graphData = {
            labels: response.data[vazao].map(item => item.date),
            datasets: [
              {
                fill: true,
                label: "Vazão de " + nomeVazao,
                backgroundColor: "rgba(29, 140, 248, 0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: response.data[vazao].map(item => item.value)
              },
              {
                fill: true,
                label: "Validação",
                backgroundColor: "rgba(66, 184, 131, 0)",
                borderWidth: 2,
                borderColor: "#ff0000",
                pointBackgroundColor: "#ff0000",
                data: lstTrained.map(item => item.value)
              }
            ]
          };

          newGraph["output" + vazao + "Trained"] = graphData;

          this.$counter();
        })

        .catch(error => {
          this.$NotificationError(error);
        });
    },

    async trainingAll(type) {
      //  this.$NotificationInfo("Treinando com dados informado, aguarde ...");

      let type_graph = type;

      // Initial Values
      let newGraph = this;
      let sufixUrl = "";
      let vazao = "";
      let nomeVazao = "";

      //  new values for traningAll
      let start_date = "";
      let final_date = "";
      let window_size = "";
      let n_interval = "";
      let n_sims = "";

      // Vazão Líquida
      if (type_graph === 1) {
        sufixUrl = "Bruta";
        vazao = "liquid";
        nomeVazao = "Líquido";
        start_date = this.liquid_file.start_date;
        final_date = this.liquid_file.final_date;
        window_size = this.liquid_file.window_size;
        n_interval = this.liquid_file.n_interval;
        n_sims = this.liquid_file.n_sims;
      }
      // Vazão Óleo
      if (type_graph === 2) {
        sufixUrl = "Oleo";
        vazao = "oil";
        nomeVazao = "Óleo";
        start_date = this.oil_file.start_date;
        final_date = this.oil_file.final_date;
        window_size = this.oil_file.window_size;
        n_interval = this.oil_file.n_interval;
        n_sims = this.oil_file.n_sims;
      }
      // Vazão Gás
      if (type_graph === 3) {
        sufixUrl = "Gas";
        vazao = "gas";
        nomeVazao = "Gás";
        start_date = this.gas_file.start_date;
        final_date = this.gas_file.final_date;
        window_size = this.gas_file.window_size;
        n_interval = this.gas_file.n_interval;
        n_sims = this.gas_file.n_sims;
      }

      const Training = axios.create({
        withCredentials: true
      });
      this.$NotificationWarn("Chegou no POST", vazao);
      Training.post(`${BASE_URL}/gerenciamento/ModelARFlowTraining`, {
        start_date: start_date,
        final_date: final_date,
        window_size: parseInt(window_size),
        n_interval: parseInt(n_interval),
        well_id: this.idwell,
        injection_wells: this.injectWells.map(item => item.id),
        n_sims: parseInt(n_sims),
        training_type: vazao,
        training_id: localStorage.getItem("training_id") + "-" + this.idwell
      })
        .then(response => {
          //Show trained graph with tab

          var lstTrained = new Array();
          for (const key in response.data[vazao]) {
            const element = Object.assign({}, response.data[vazao][key]);
            element.value = undefined;

            for (const keyT in response.data[vazao + "_trained"]) {
              var elementT = response.data[vazao + "_trained"][keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }

            //tem que melhorar
            this.isShowing = true;
            lstTrained.push(element);
          }

          for (var i = 1; i < 2; i++) {
            if (type_graph === this.type) {
              this.datestart = start_date;
              this.dateend = final_date;
              this.validation = window_size;
              this.interval = n_interval;
              this.simulation = n_sims;
            }
            // more statements
          }

          this.$NotificationSuccess("Treinado com sucesso!");
          // Create Trained line
          this.chartOptionsVertical = {
            title: {
              display: true,
              text: response.data.name
            },
            pan: {
              enabled: true,
              mode: "x"
            },
            zoom: {
              drag: true,
              enabled: true,
              mode: "xy",
              speed: 0.7
            },
            annotation: {
              events: ["click"],
              annotations: [
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: response.data.vertical_date_line,
                  borderColor: "red",
                  label: {
                    content: "TODAY",
                    enabled: false,
                    position: "top"
                  }
                }
              ]
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Valor"
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    // max: 20
                    // min: 0,
                    stepSize: 4.5
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Data"
                  }
                }
              ]
            }
          };

          let graphData = {
            labels: response.data[vazao].map(item => item.date),
            datasets: [
              {
                fill: true,
                label: "Vazão de " + nomeVazao,
                backgroundColor: "rgba(29, 140, 248, 0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: response.data[vazao].map(item => item.value)
              },
              {
                fill: true,
                label: "Validação",
                backgroundColor: "rgba(66, 184, 131, 0)",
                borderWidth: 2,
                borderColor: "#ff0000",
                pointBackgroundColor: "#ff0000",
                data: lstTrained.map(item => item.value)
              }
            ]
          };

          newGraph["output" + vazao + "Trained"] = graphData;

          this.$counter();
        })

        .catch(error => {
          this.$NotificationError(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
