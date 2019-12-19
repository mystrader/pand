<template>
  <div>
    <h4>Póleo</h4>
    <b-row>
      <b-col>
        <h6 class="head-prediction font-weight-bold green">Parâmetros de predição</h6>
        <b-form-row>
          <b-col sm="4">
            <label for="horizon">Horizonte (Meses)</label>
            <b-input id="horizon" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="horizon"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="curven">Curva de incerteza: N</label>
            <b-input id="curven" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="uncertainty"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="curvesigma">Curva de incerteza: Sigma</label>
            <b-input id="curvesigma" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="sigma"></b-input>
          </b-col>
          <!-- col -->
        </b-form-row>
        <!-- form-row -->
      </b-col>
      <!-- col -->
      <b-col>
        <div class="head-injectors d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bold green mt-3 mb-0">
            Injetores
            <small>(m³/d)</small>
          </h6>
        </div>
        <!-- head-injectors -->

        <div v-if="wellInjectFile">
          <!-- from file load -->
          <b-form-row class="selected-injectors">
            <b-col sm="3" v-for="item in wellInjectFile" :key="item.id">
              <label for="inject">{{ item.name }}</label>
              <b-input id="inject" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="item.value"></b-input>
            </b-col>
          </b-form-row>
        </div>
        <div v-else>
          <!-- normal flow -->
          <b-form-row class="selected-injectors">
            <b-col sm="3" v-for="item in lstpocoinject" :key="item.id">
              <label for="inject">{{ item.name }}</label>
              <b-input id="inject" class="mb-2 mr-sm-2 mb-sm-0" type="number" v-model="item.value"></b-input>
            </b-col>
          </b-form-row>
        </div>

        <!-- selected-injectors -->
      </b-col>
      <!-- col -->
    </b-row>
    <!-- row -->
    <div class="d-flex justify-content-center mt-5 mb-4">
      <b-button
        lass="btn btn-success"
        variant="success"
        @click="generate"
        v-on:click="counter += 1"
        class="mr-3"
      >Gerar Póleo</b-button>
      <download-csv
        :data="wellsExporteds"
        ref="generator"
        style="display: none"
        name="Lista de Poços.csv"
      >Exportar Póleo</download-csv>
      <b-button variant="success" @click="exportGraph">Exportar Póleo</b-button>
    </div>
    <b-row>
      <b-col sm="12" v-show="isShowing">
        <h4>Previsão</h4>
        <b-tabs content-class="mt-5 mb-5" align="left">
          <b-tab title="Bruta" active>
            <template v-slot:title>
              <i class="material-icons fix-icon-pos-tab">assessment</i>
              Bruta
            </template>
            <!-- GRAPH:  chartLiquidPoil -->
            <b-button
              variant="outline-success"
              size="sm"
              @click="reset('chartLiquidPoil')"
            >Reset Zoom</b-button>
            <b-button
              variant="outline-success"
              size="sm"
              @click="print('chartLiquidPoil')"
            >Salvar gráfico</b-button>
            <graph
              ref="chartLiquidPoil"
              class="mb-4"
              :lstpocoinject="lstpocoinject"
              :idwell="idwell"
              :height="180"
              :chart-data="liquidPoil"
              :options="chartOptionsLiquid"
            />
          </b-tab>

          <b-tab>
            <template v-slot:title>
              <i class="material-icons fix-icon-pos-tab">assessment</i>
              Óleo
            </template>
            <!-- GRAPH:  OIL  -->
            <b-button variant="outline-success" size="sm" @click="reset('chartOilPoil')">Reset Zoom</b-button>
            <b-button
              variant="outline-success"
              size="sm"
              @click="print('chartOilPoil')"
            >Salvar gráfico</b-button>
            <graph
              ref="chartOilPoil"
              class="mb-4"
              :lstpocoinject="lstpocoinject"
              :idwell="idwell"
              :height="180"
              :chart-data="oilPoil"
              :options="chartOptionsOil"
            />
            <!-- GRAPH:  OIL  -->
            <hr class="mt-5 mb-5" />
            <!-- GRAPH:  WATER  -->
            <b-button
              variant="outline-success"
              size="sm"
              @click="reset('chartWaterPoil')"
            >Reset Zoom</b-button>
            <b-button
              variant="outline-success"
              size="sm"
              @click="print('chartWaterPoil')"
            >Salvar gráfico</b-button>
            <graph
              ref="chartWaterPoil"
              :lstpocoinject="lstpocoinject"
              :idwell="idwell"
              :height="180"
              :chart-data="waterPoil"
              :options="chartOptionsWater"
            />
            <!-- GRAPH:  End.: WATER -->
          </b-tab>

          <b-tab title="Gás">
            <template v-slot:title>
              <i class="material-icons fix-icon-pos-tab">assessment</i>
              <strong>Gás</strong>
            </template>

            <!-- GRAPH:  GAS  -->
            <b-button variant="outline-success" size="sm" @click="reset('chartGasPoil')">Reset Zoom</b-button>
            <b-button
              variant="outline-success"
              size="sm"
              @click="print('chartGasPoil')"
            >Salvar gráfico</b-button>
            <graph
              ref="chartGasPoil"
              :lstpocoinject="lstpocoinject"
              :idwell="idwell"
              :height="180"
              :chart-data="gasPoil"
              :options="chartOptionsGas"
            />
            <!-- GRAPH:  End.: GAS -->
            <hr class="mt-5 mb-5" />
            <!-- GRAPH:  RGL  -->
            <b-button variant="outline-success" size="sm" @click="reset('chartrglPoil')">Reset Zoom</b-button>
            <b-button
              variant="outline-success"
              size="sm"
              @click="print('chartrglPoil')"
            >Salvar gráfico</b-button>
            <graph
              ref="chartrglPoil"
              :lstpocoinject="lstpocoinject"
              :idwell="idwell"
              :height="180"
              :chart-data="rglPoil"
              :options="chartOptionsRGL"
            />
            <!-- GRAPH:  End.: RGL -->
          </b-tab>
        </b-tabs>

        <!-- <pre>{{liquidPoil}}</pre> -->
      </b-col>
      <!-- col -->
    </b-row>
    <!-- row -->
    <!-- <loading :show="show" :label="label" :overlay="overlay"></loading> -->
  </div>
</template>

<script>
import Loading from "../node_modules/vue-full-loading/src/Loading";
import { BASE_URL } from "@/services";
import axios from "axios";
import main from "../plugins/main";
import exportCsv from "../plugins/exportCsv";
import ChartAnnotationsPlugin from "chartjs-plugin-annotation";

import Graph from "~/components/Graph.vue";

export default {
  props: ["lstpocoinject", "idwell", "wellInjectFile"],
  components: {
    Graph,
    Loading
  },
  data() {
    return {
      counter: 0,
      show: false,
      label: "Carregando gráficos...",
      timeOut: 11000,
      overlay: true,
      isShowing: false,
      liquidPoil: {},
      oilPoil: {},
      waterPoil: {},
      gasPoil: {}, // new !
      rglPoil: {}, // new !
      chartOptionsLiquid: {},
      chartOptionsOil: {},
      chartOptionsWater: {},
      chartOptionsGas: {}, // new !
      chartOptionsRGL: {}, // new !
      sigma: 2,
      horizon: 18,
      uncertainty: 10,
      wellsExporteds: []
    };
  },

  methods: {
    reset(refGraph) {
      this.$resetGraph(refGraph);
    },

    print(refGraph) {
      this.$print(refGraph);
    },
    igualarTamanhoLista(lstGrande, lstPequena) {
      var lstRetorno = new Array();
      for (const keyG in lstGrande) {
        var itemG = lstGrande[keyG];
        var obj = { date: itemG.date, value: undefined };
        for (const keyP in lstPequena) {
          var itemP = lstPequena[keyP];
          if (itemP.date == itemG.date) {
            obj.value = itemP.value;
            break;
          }
        }
        lstRetorno.push(obj);
      }
      return lstRetorno;
    },
    async generate() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, this.timeOut);
      // Loading

      let poilGraph = this;

      const Poleo = axios.create({
        withCredentials: true
      });
      Poleo.post(`${BASE_URL}/gerenciamento/ModelARPoilTraining`, {
        well_id: this.idwell,
        injection_value: this.lstpocoinject.map(item => item.value),
        injection_wells: this.lstpocoinject.map(item => item.id),
        n_incerteza: parseInt(this.uncertainty),
        sigma: parseInt(this.sigma),
        pred_window_size: parseInt(this.horizon),
        training_id: localStorage.getItem("training_id") + "-" + this.idwell
      })
        .then(response => {
          this.$NotificationSuccess("Gráficos de Póleo foram gerados.");
          this.namePoil = response.data.name;

          this.chartOptionsGas = {
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
                  value: response.data.gas_vertical_date_line,
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
                    labelString: "Vazão (m³/d)"
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
          // End ChartOptionsLiquid

          this.chartOptionsRGL = {
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
                  value: response.data.gas_vertical_date_line,
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
                    labelString: "Fração de Gás"
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
          // End chartOptionsWater

          var lstGas_performance = new Array();
          var lstBigGas = new Array();
          var lstGasPrediction = new Array();
          var lst_gas_uncertainties = new Array();
          var lstWaterUncertainties = new Array();

          lstBigGas = response.data.gas;

          for (const key in response.data.gas_prediction) {
            const element = Object.assign(
              {},
              response.data.gas_prediction[key]
            );
            element.value = undefined;
            lstBigGas.push(element);
          }

          for (const key in response.data.gas_uncertainties) {
            const elements =
              response.data.gas_uncertainties[key].gas_uncertainty;

            for (const k in elements) {
              const elementUncert = Object.assign({}, elements[k]);
              lst_gas_uncertainties.push(Object.assign({}, elements[k]));

              elementUncert.value = undefined;

              var podeAdionar = true;

              for (const keyBO in lstBigGas) {
                var itemGas = lstBigGas[keyBO];
                if (itemGas.date === elementUncert.date) {
                  podeAdionar = false;
                  break;
                }
              }

              if (podeAdionar) lstBigGas.push(elementUncert);
            }
          }

          for (const key in lstBigGas) {
            const element = Object.assign({}, lstBigGas[key]);
            element.value = undefined;

            for (const keyT in response.data.gas_performance) {
              var elementT = response.data.gas_performance[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstGas_performance.push(element);
          }

          for (const key in lstBigGas) {
            const element = Object.assign({}, lstBigGas[key]);
            element.value = undefined;

            for (const keyT in response.data.gas_prediction) {
              var elementT = response.data.gas_prediction[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstGasPrediction.push(element);
          }

          poilGraph.gasPoil = {
            labels: lstBigGas.map(item => item.date),
            datasets: [
              {
                fill: true,
                label: "Vazão de Gás",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: lstBigGas.map(item => item.value)
              },
              {
                fill: true,
                label: "Vazão de Gás (Performance)",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffa500",
                pointBackgroundColor: "#ffa500",
                data: lstGas_performance.map(item => item.value)
              },
              {
                fill: true,
                label: "Previsão",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderDash: [5, 5],
                borderColor: "#944cbc",
                pointBackgroundColor: "#944cbc",
                data: lstGasPrediction.map(item => item.value)
              }
            ]
          };

          for (
            let index = 0;
            index < response.data.gas_uncertainties.length;
            index++
          ) {
            const elements =
              response.data.gas_uncertainties[index].gas_uncertainty;

            var lst = this.igualarTamanhoLista(lstBigGas, elements);

            poilGraph.gasPoil.datasets.push({
              fill: true,
              label: "Incerteza:" + parseInt(index + 1),
              backgroundColor: "rgba(66, 184, 131, 0.0)",
              pointStyle: "line",
              borderWidth: 2,
              borderColor: "#363636",
              pointBackgroundColor: "#363636",
              data: lst.map(item => item.value)
            });
          }

          this.chartOptionsLiquid = {
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
                  value: response.data.liquid_vertical_date_line,
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
                    labelString: "Vazão (m³/d)"
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
          // End ChartOptionsLiquid

          var lstLiquid_performance = new Array();
          var lstLiquidao = new Array();
          var lstLiquidPrediction = new Array();

          lstLiquidao = response.data.liquid;

          for (const key in response.data.liquid_prediction) {
            const element = Object.assign(
              {},
              response.data.liquid_prediction[key]
            );
            element.value = undefined;
            lstLiquidao.push(element);
          }

          for (const key in lstLiquidao) {
            const element = Object.assign({}, lstLiquidao[key]);
            element.value = undefined;

            for (const keyT in response.data.liquid_performance) {
              var elementT = response.data.liquid_performance[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstLiquid_performance.push(element);
          }

          for (const key in lstLiquidao) {
            const element = Object.assign({}, lstLiquidao[key]);
            element.value = undefined;

            for (const keyT in response.data.liquid_prediction) {
              var elementT = response.data.liquid_prediction[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstLiquidPrediction.push(element);
          }
          // For to Graph Liquid Performance

          poilGraph.liquidPoil = {
            labels: lstLiquidao.map(item => item.date),

            datasets: [
              {
                fill: true,
                label: "Vazão Bruta",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: lstLiquidao.map(item => item.value)
              },
              {
                fill: true,
                label: "Performance",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffa500",
                pointBackgroundColor: "#ffa500",
                data: lstLiquid_performance.map(item => item.value)
              },
              {
                fill: true,
                label: "Previsão",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderDash: [5, 5],
                borderColor: "#ffcbdb",
                pointBackgroundColor: "#ffcbdb",
                data: lstLiquidPrediction.map(item => item.value)
              }
            ]
          };
          // End graph Poleo Líquido

          this.chartOptionsOil = {
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
                  value: response.data.oil_vertical_date_line,
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
                    labelString: "Vazão (m³/d)"
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
          // End chartOptionsOil

          var lstOil_performance = new Array();
          var lstBigOil = new Array();
          var lstOilPrediction = new Array();
          var lst_oil_uncertainties = new Array();
          var lstOilUncertainties = new Array();

          lstBigOil = response.data.oil;

          for (const key in response.data.oil_prediction) {
            const element = Object.assign(
              {},
              response.data.oil_prediction[key]
            );
            element.value = undefined;
            lstBigOil.push(element);
          }

          for (const key in response.data.oil_uncertainties) {
            const elements =
              response.data.oil_uncertainties[key].oil_uncertainty;

            for (const k in elements) {
              const elementUncert = Object.assign({}, elements[k]);
              lst_oil_uncertainties.push(Object.assign({}, elements[k]));

              elementUncert.value = undefined;

              var podeAdionar = true;

              for (const keyBO in lstBigOil) {
                var itemOil = lstBigOil[keyBO];
                if (itemOil.date === elementUncert.date) {
                  podeAdionar = false;
                  break;
                }
              }

              if (podeAdionar) lstBigOil.push(elementUncert);
            }
          }

          for (const key in lstBigOil) {
            const element = Object.assign({}, lstBigOil[key]);
            element.value = undefined;

            for (const keyT in response.data.oil_performance) {
              var elementT = response.data.oil_performance[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstOil_performance.push(element);
          }

          for (const key in lstBigOil) {
            const element = Object.assign({}, lstBigOil[key]);
            element.value = undefined;

            for (const keyT in response.data.oil_prediction) {
              var elementT = response.data.oil_prediction[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstOilPrediction.push(element);
          }

          for (const key in lstBigOil) {
            const element = Object.assign({}, lstBigOil[key]);
            element.value = undefined;

            for (const keyT in lst_oil_uncertainties) {
              var elementT = lst_oil_uncertainties[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstOilUncertainties.push(element);
          }

          // var labels = lstBigOil.map(item => item.date);
          poilGraph.oilPoil = {
            labels: lstBigOil.map(item => item.date),

            datasets: [
              {
                fill: true,
                label: "Vazão Óleo",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: lstBigOil.map(item => item.value)
              },
              {
                fill: true,
                label: "Performance",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffa500",
                pointBackgroundColor: "#ffa500",
                data: lstOil_performance.map(item => item.value)
              },
              {
                fill: true,
                label: "Previsão",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderDash: [5, 5],
                borderColor: "#944cbc",
                pointBackgroundColor: "#944cbc",
                data: lstOilPrediction.map(item => item.value)
              }
            ]
          };

          this.chartOptionsRGL = {
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
                  value: response.data.rgl_vertical_date_line,
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
                    labelString: "RGL"
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
          // End chartOptionsWater

          var lstRgl_performance = new Array();
          var lstBigRgl = new Array();
          var lstRglPrediction = new Array();
          var lst_rgl_uncertainties = new Array();
          var lstRglUncertainties = new Array();

          lstBigRgl = response.data.rgl;

          for (const key in response.data.rgl_prediction) {
            const element = Object.assign(
              {},
              response.data.rgl_prediction[key]
            );
            element.value = undefined;
            lstBigRgl.push(element);
          }

          for (const key in response.data.rgl_uncertainties) {
            const elements =
              response.data.rgl_uncertainties[key].rgl_uncertainty;

            for (const k in elements) {
              const elementUncert = Object.assign({}, elements[k]);
              lst_rgl_uncertainties.push(Object.assign({}, elements[k]));

              elementUncert.value = undefined;

              var podeAdionar = true;

              for (const keyBO in lstBigRgl) {
                var itemRgl = lstBigRgl[keyBO];
                if (itemRgl.date === elementUncert.date) {
                  podeAdionar = false;
                  break;
                }
              }

              if (podeAdionar) lstBigRgl.push(elementUncert);
            }
          }

          for (const key in lstBigRgl) {
            const element = Object.assign({}, lstBigRgl[key]);
            element.value = undefined;

            for (const keyT in response.data.rgl_performance) {
              var elementT = response.data.rgl_performance[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstRgl_performance.push(element);
          }

          for (const key in lstBigRgl) {
            const element = Object.assign({}, lstBigRgl[key]);
            element.value = undefined;

            for (const keyT in response.data.rgl_prediction) {
              var elementT = response.data.rgl_prediction[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstRglPrediction.push(element);
          }

          poilGraph.rglPoil = {
            labels: lstBigRgl.map(item => item.date),
            datasets: [
              {
                fill: true,
                label: "RGL",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: lstBigRgl.map(item => item.value)
              },
              {
                fill: true,
                label: "RGL (Performance)",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffa500",
                pointBackgroundColor: "#ffa500",
                data: lstRgl_performance.map(item => item.value)
              },
              {
                fill: true,
                label: "Previsão",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderDash: [5, 5],
                borderColor: "#944cbc",
                pointBackgroundColor: "#944cbc",
                data: lstRglPrediction.map(item => item.value)
              }
            ]
          };

          for (
            let index = 0;
            index < response.data.rgl_uncertainties.length;
            index++
          ) {
            const elements =
              response.data.rgl_uncertainties[index].rgl_uncertainty;

            var lst = this.igualarTamanhoLista(lstBigRgl, elements);

            poilGraph.rglPoil.datasets.push({
              fill: true,
              label: "Incerteza:" + parseInt(index + 1),
              backgroundColor: "rgba(66, 184, 131, 0.0)",
              pointStyle: "line",
              borderWidth: 2,
              borderColor: "#363636",
              pointBackgroundColor: "#363636",
              data: lst.map(item => item.value)
            });
          }

          for (
            let index = 0;
            index < response.data.oil_uncertainties.length;
            index++
          ) {
            const elements =
              response.data.oil_uncertainties[index].oil_uncertainty;

            var lst = this.igualarTamanhoLista(lstBigOil, elements);

            poilGraph.oilPoil.datasets.push({
              fill: true,
              label: "Incerteza:" + parseInt(index + 1),
              backgroundColor: "rgba(66, 184, 131, 0.0)",
              pointStyle: "line",
              borderWidth: 2,
              borderColor: "#363636",
              pointBackgroundColor: "#363636",
              data: lst.map(item => item.value)
            });
          }

          // End graph Poleo Óleo

          this.chartOptionsWater = {
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
                  value: response.data.water_vertical_date_line,
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
                    labelString: "BSW"
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
          // End chartOptionsWater

          var lstWater_performance = new Array();
          var lstBigWater = new Array();
          var lstWaterPrediction = new Array();
          var lst_water_uncertainties = new Array();
          var lstWaterUncertainties = new Array();

          lstBigWater = response.data.water;

          for (const key in response.data.water_prediction) {
            const element = Object.assign(
              {},
              response.data.water_prediction[key]
            );
            element.value = undefined;
            lstBigWater.push(element);
          }

          for (const key in response.data.water_uncertainties) {
            const elements =
              response.data.water_uncertainties[key].water_uncertainty;

            for (const k in elements) {
              const elementUncert = Object.assign({}, elements[k]);
              lst_water_uncertainties.push(Object.assign({}, elements[k]));

              elementUncert.value = undefined;

              var podeAdionar = true;

              for (const keyBO in lstBigWater) {
                var itemWater = lstBigWater[keyBO];
                if (itemWater.date === elementUncert.date) {
                  podeAdionar = false;
                  break;
                }
              }

              if (podeAdionar) lstBigWater.push(elementUncert);
            }
          }

          for (const key in lstBigWater) {
            const element = Object.assign({}, lstBigWater[key]);
            element.value = undefined;

            for (const keyT in response.data.water_performance) {
              var elementT = response.data.water_performance[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstWater_performance.push(element);
          }

          for (const key in lstBigWater) {
            const element = Object.assign({}, lstBigWater[key]);
            element.value = undefined;

            for (const keyT in response.data.water_prediction) {
              var elementT = response.data.water_prediction[keyT];
              if (elementT.date === element.date) {
                element.value = elementT.value;
                break;
              }
            }
            lstWaterPrediction.push(element);
          }

          poilGraph.waterPoil = {
            labels: lstBigWater.map(item => item.date),
            datasets: [
              {
                fill: true,
                label: "BSW",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffdb58",
                pointBackgroundColor: "#ffdb58",
                data: lstBigWater.map(item => item.value)
              },
              {
                fill: true,
                label: "BSW (Performance)",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderColor: "#ffa500",
                pointBackgroundColor: "#ffa500",
                data: lstWater_performance.map(item => item.value)
              },
              {
                fill: true,
                label: "Previsão",
                backgroundColor: "rgba(66, 184, 131, 0.0)",
                borderWidth: 2,
                borderDash: [5, 5],
                borderColor: "#944cbc",
                pointBackgroundColor: "#944cbc",
                data: lstWaterPrediction.map(item => item.value)
              }
            ]
          };

          for (
            let index = 0;
            index < response.data.water_uncertainties.length;
            index++
          ) {
            const elements =
              response.data.water_uncertainties[index].water_uncertainty;

            var lst = this.igualarTamanhoLista(lstBigWater, elements);

            poilGraph.waterPoil.datasets.push({
              fill: true,
              label: "Incerteza:" + parseInt(index + 1),
              backgroundColor: "rgba(66, 184, 131, 0.0)",
              pointStyle: "line",
              borderWidth: 2,
              borderColor: "#363636",
              pointBackgroundColor: "#363636",
              data: lst.map(item => item.value)
            });
          }
          // End graph Poleo ÁGua
          this.$counter();
          // function for don't repeat graph Poleo
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    },
    async exportGraph() {
      let exportWellId = new Array();
      let exportTrainingId = new Array();

      exportWellId.push(this.idwell);
      exportTrainingId.push(
        localStorage.getItem("training_id") + "-" + this.idwell
      );

      const exportPoil = axios.create({
        withCredentials: true
      });
      await exportPoil
        .post(`${BASE_URL}/gerenciamento/ModelARExport`, {
          well_ids: exportWellId,
          training_ids: exportTrainingId
        })
        .then(response => {
          this.wellsExporteds = response.data;

          var that = this;

          window["export"] = that;

          setTimeout(function() {
            window["export"].$refs.generator.generate();
          }, 2000);
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.head-prediction {
  margin-top: 9px;
  margin-bottom: 30px;
}

.head-injectors {
  margin-bottom: 20px;
}

.selected-injectors {
  overflow-y: scroll;
  height: 140px;
}

.btn {
  cursor: pointer;
}
</style>
