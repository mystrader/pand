<template>
  <div>
    <h4 class="mb-4">Curva Poço-Tipo</h4>
    <b-alert show variant="warning">
      Escolha as opções abaixo para
      <strong>recalculo de Parâmetros.</strong>
    </b-alert>
    <div class="d-flex justify-content-start mt-2 mb-2">
      <b-button class="btn-sm" variant="success" @click="onRecalculate__Param">Recalcular Parâmetros</b-button>
      <b-button
        class="ml-3 btn-sm"
        variant="success"
        @click="onRecalculate__CurveLine"
      >Gerar Curva Tipo</b-button>
    </div>
    <graph :height="430" :chart-data="rendergraph_curvetype" :options="chartOptions" class="mt-3" />
  </div>
</template>

<script>
import barramento from "@/barramento";
import main from "../plugins/main";
import { BASE_URL, api } from "@/services";
import axios from "axios";
import Graph from "~/components/Graph.vue";
export default {
  props: ["alvo_properties"],
  components: {
    Graph
  },
  data() {
    return {
      result_full: [],
      rendergraph_curvetype: {},
      chartOptions: {},
      datasets: [],
      values_datasets: null,
      values_labels: null,
      lst_new_expcurvatipo_full: null,
      lst_formZpAll: [],
      lst_selectedTableZp: [],
      lst_new_curveLine: {},
      lst_rankingzp: []
    };
  },
  methods: {
    mountDataSet(api_result_full, newCurveLine) {
      let _datasets = new Array();
      let _labels = new Array();
      let _arrayfill = new Array(300);

      let colorborder = "";
      // let bgColor = "";

      //loop for datasets X
      for (const key in api_result_full) {
        _labels.push(
          api_result_full[key].grafico.x === undefined
            ? [...Array(300).keys()]
            : api_result_full[key].grafico.x
        );
      }

      for (const key in api_result_full) {
        if (api_result_full[key].grafico.y === undefined) {
          colorborder = "rgba(222,222,222,0.3)";
          // bgColor = "rgba(0,0,0,0)";
        } else {
          if (api_result_full[key].sigla_zp === "ZP Alvo") {
            colorborder = "#ff0000";
            // bgColor = "#ff0000";
          } else {
            colorborder = "#28a745";
            // bgColor = "#28a745";
          }
        }

        _datasets.push({
          fill: true,
          label: api_result_full[key].sigla_zp,
          backgroundColor: "rgba(66, 184, 131, 0.0)",
          borderWidth: 1,
          borderColor: colorborder,
          pointBackgroundColor: colorborder,
          data:
            api_result_full[key].grafico.y === undefined
              ? _arrayfill.fill(0)
              : api_result_full[key].grafico.y
        });
      }

      // Make NewCurve
      if (newCurveLine === undefined) {
        _datasets;
      } else {
        const { y } = newCurveLine;
        var newCurveDone = {
          fill: true,
          label: "ZP ALVO",
          backgroundColor: "rgba(105, 3, 88, 0.1)",
          borderWidth: 1,
          borderColor: "#ff0000",
          pointBackgroundColor: "#ff0000",
          data: y
        };
        _datasets.pop();
        _datasets.push(newCurveDone);
      }
      this.fillData(_labels, _datasets);
    },
    fillData(_labels, _datasets) {
      this.rendergraph_curvetype = {
        labels: _labels[0],
        datasets: _datasets
      };

      this.chartOptions = {
        // legend: {
        //   display: true
        // },

        // tooltips: {
        //   callbacks: {}
        // },
        responsive: true,
        title: {
          display: false
        },
        pan: {
          enabled: true,
          mode: "xy"
        },

        zoom: {
          enabled: true,
          mode: "xy"
        },

        scales: {
          yAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
      // end.: chartOptions
    },
    // button::  Post CurveLine
    onRecalculate__CurveLine(evt) {
      evt.preventDefault();
      axios
        .post(`${BASE_URL}/exploracao/RecalcularCurvaTipo`, {
          qoi: parseFloat(this.alvo_properties.input_qoi),
          tx: this.alvo_properties.input_tinput_qoix,
          tempo: this.alvo_properties.input_tempo
        })
        .then(response => {
          this.lst_new_curveLine = response.data;
          this.mountDataSet(this.lst_rankingzp, this.lst_new_curveLine);
          this.$NotificationSuccess("Nova curva tipo gerada com sucesso");
        })
        .catch(error => {
          console.error("ERRO NO POST >> RecalcularCurvaTipo", error);
          this.$NotificationError(error);
        });
    },
    // button::  Post RecalculateParam
    onRecalculate__Param(evt) {
      evt.preventDefault();
      axios
        .post(`${BASE_URL}/exploracao/EnviarParametros`, {
          litologia: this.lst_formZpAll.litologia,
          sistema_deposicional: this.lst_formZpAll.sistema_deposicional,
          formacao: this.lst_formZpAll.formacao,
          idade_geologica: parseFloat(this.lst_formZpAll.idade_geologica),

          permeabilidade:
            this.lst_formZpAll.permeabilidade === ""
              ? 0
              : parseFloat(this.lst_formZpAll.permeabilidade),
          porosidade:
            this.lst_formZpAll.porosidade === ""
              ? 0
              : parseFloat(this.lst_formZpAll.porosidade),
          soterramento:
            this.lst_formZpAll.soterramento === ""
              ? 0
              : parseFloat(this.lst_formZpAll.soterramento),
          espessura_vertical:
            this.lst_formZpAll.espessura_vertical === ""
              ? 0
              : parseFloat(this.lst_formZpAll.espessura_vertical),
          lamina_agua:
            this.lst_formZpAll.lamina_agua === ""
              ? 0
              : parseFloat(this.lst_formZpAll.lamina_agua),
          volume_rocha:
            this.lst_formZpAll.volume_rocha === ""
              ? 0
              : parseFloat(this.lst_formZpAll.volume_rocha),
          fluido: this.lst_formZpAll.fluido,
          api:
            this.lst_formZpAll.api === ""
              ? 0
              : parseFloat(this.lst_formZpAll.api),
          bo_saturacao:
            this.lst_formZpAll.bo_saturacao === ""
              ? 0
              : parseFloat(this.lst_formZpAll.bo_saturacao),
          razao_solubilidade:
            this.lst_formZpAll.razao_solubilidade === ""
              ? 0
              : parseFloat(this.lst_formZpAll.razao_solubilidade),
          viscosidade_oleo:
            this.lst_formZpAll.viscosidade_oleo === ""
              ? 0
              : parseFloat(this.lst_formZpAll.viscosidade_oleo),
          temperatura:
            this.lst_formZpAll.temperatura === ""
              ? 0
              : parseFloat(this.lst_formZpAll.temperatura),
          sigla_zp: this.lst_selectedTableZp
        })
        .then(response => {
          this.$NotificationSuccess("Parâmetros recalculados com sucesso!");

          let lst_recalculatePost = response.data;
          barramento.$emit(
            "onRecalculate__Param_published",
            lst_recalculatePost
          ); // Send to COMPONENT___> ExplorerFormZp
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    }
  },
  created() {
    barramento.$on("Rankingzp_published", lst_rankingzp => {
      this.lst_rankingzp = lst_rankingzp;
      this.mountDataSet(this.lst_rankingzp);
    }),
      // Info for POST RECALCULATE
      barramento.$on("formZpAll_published", lst_formZpAll => {
        this.lst_formZpAll = lst_formZpAll; // console.log("CHEGOUUUUUU >", lst_formZpAll);
      }),
      barramento.$on("selected_tablezp_published", lst_selectedTableZp => {
        this.lst_selectedTableZp = lst_selectedTableZp;
        //console.log("LIST FROM TABLERANK SUCCESS!! >", lst_selectedTableZp);
      });
  },
  beforeDestroy() {
    barramento.$off("Rankingzp_published");
    barramento.$off("NewAlvoZp_published");
    barramento.$off("formZpAll_published");
    barramento.$off("selected_tablezp_published");
  }
};
</script>

<style lang="scss" scoped>
</style>