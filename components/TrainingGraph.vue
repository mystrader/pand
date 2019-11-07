<template>
  <div>
    <b-row align-v="center">
      <b-col>
        <h6 class="font-weight-bold green">Intervalo de Treinamento</h6>
        <b-form-row>
          <b-col sm="4">
            <label for="date-start">Data início</label>
            <b-input id="date-start" class="mb-2 mr-sm-2 mb-sm-0" type="date" v-model="datestart"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="date-end">Data fim</label>
            <b-input id="date-end" class="mb-2 mr-sm-2 mb-sm-0" type="date" v-model="dateend"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="3">
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
          <b-col sm="3">
            <label for="simulation">Simulação</label>
            <b-input
              id="simulation"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="number"
              v-model="simulation"
            ></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="3">
            <label for="interval">Intervalo</label>
            <b-input id="interval" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="interval"></b-input>
          </b-col>
          <!-- col -->
        </b-form-row>
        <!-- form-row -->
      </b-col>
      <button
        class="btn btn-success mt-5 mr-2 px-5"
        type="button"
        @click="training"
        v-on:click="counter += 1"
      >Treinar</button>
    </b-row>
    <!-- row -->
    <hr class="mt-5 mb-5" />

    <b-row>
      <b-col sm="12">
        <div class>
          <graph
            ref="chartLiquid"
            v-show="!isShowing"
            v-if="oilshow == false"
            :height="180"
            :chart-data="liquid"
            :options="chartOptions"
          />
          <graph
            ref="chartOil"
            v-show="!isShowing"
            v-if="oilshow == true"
            :height="180"
            :chart-data="oil"
            :options="chartOptions"
          />
          <!-- ref="myChartTrained" -->
          <graph
            ref="chartLiquidTr"
            v-show="isShowing"
            v-if="oilshow == false"
            :height="180"
            :chart-data="outputliquidTrained"
            :options="chartOptionsVertical"
          />
          <graph
            ref="chartOilTr"
            v-show="isShowing"
            v-if="oilshow == true"
            :height="180"
            :chart-data="outputoilTrained"
            :options="chartOptionsVertical"
          />
        </div>
        <button class="btn btn-success" @click="reset">Reset Zoom</button>
        <button class="btn btn-success" @click="print">Salvar gráfico</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BASE_URL } from "@/services";
import axios from "axios";
import main from "../plugins/main";
import ChartAnnotationsPlugin from "chartjs-plugin-annotation";

import Graph from "~/components/Graph.vue";

export default {
  props: ["idwell", "oilshow", "injectWells"],
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
      chartOptions: {},
      chartOptionsVertical: {},
      datestart: "",
      dateend: "",
      validation: 18,
      simulation: 50,
      interval: 1,
      outputoilTrained: "",
      outputliquidTrained: ""
    };
  },
  async created() {
    this.fillData();
  },

  methods: {
    getChartVisible() {
      var refChart = "";
      if (this.oilshow == false) {
        refChart = !this.isShowing ? "chartLiquid" : "chartLiquidTr";
      } else {
        refChart = !this.isShowing ? "chartOil" : "chartOilTr";
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
        .then(response => {
          const responseData = response.data;

          this.datestart = responseData.map(item => item.data_inicio);
          this.dateend = responseData.map(item => item.data_fim);

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
      let newGraph = this;
      let sufixUrl = "Oleo";
      let vazao = "oil";
      let nomeVazao = "Óleo";
      let BSW = true;

      if (!this.oilshow) {
        sufixUrl = "Bruta";
        vazao = "liquid";
        nomeVazao = "Líquido";
        BSW = false;
      }

      const Training = axios.create({
        withCredentials: true
      });
      Training.post(`${BASE_URL}/gerenciamento/ListarGraficoVazao`, {
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
        BSW: BSW
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

<style lang="scss" scoped>
</style>