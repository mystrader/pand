<template>
  <div>
    <b-row align-v="center">
      <b-col>
        <h6 class="font-weight-bold green">Intervalo de treinamento</h6>
        <b-form-row>
          <b-col sm="4">
            <label for="date-start">Data início</label>
            <b-input id="date-start" class="mb-2 mr-sm-2 mb-sm-0" type="date"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="date-end">Data fim</label>
            <b-input id="date-end" class="mb-2 mr-sm-2 mb-sm-0" type="date"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="3">
            <label for="valitadion">
              Validação
              <small>(Meses)</small>
            </label>
            <b-input id="valitadion" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
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
            <b-input id="simulation" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="3">
            <label for="interval">Intervalo</label>
            <b-input id="interval" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
          </b-col>
          <!-- col -->
        </b-form-row>
        <!-- form-row -->
      </b-col>
      <button class="btn btn-success mt-5 mr-2 px-5" type="submit">Treinar</button>
    </b-row>
    <!-- row -->
    <b-row>
      <b-col sm="12">
        <div class>
          <graph id="chart" :height="180" :chart-data="data" :options="chartOptions" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

import Graph from "~/components/Graph.vue";

export default {
  components: {
    Graph
  },
  data() {
    return {
      data: {},
      chartOptions: {}
    };
  },

  created() {
    this.fillData();
  },

  methods: {
    fillData() {
      axios
        .get("http://www.json-generator.com/api/json/get/cesoEzIUGG?indent=2")
        .then(response => {
          const responseData = response.data;

          this.data = {
            labels: responseData[0].oil.map(item => item.date),

            datasets: [
              {
                fill: true,
                backgroundColor: "rgba(72,72,176,0.2)",
                borderWidth: 2,
                borderColor: "#fd5d93",
                pointBackgroundColor: "#fd5d93",
                data: responseData[0].oil.map(item => item.value)
              }
            ]
          };

          // borderColor: config.colors.danger,
          //     borderWidth: 2,
          //     borderDash: [],
          //     borderDashOffset: 0.0,
          //     pointBackgroundColor: config.colors.danger,
          //     pointBorderColor: 'rgba(255,255,255,0)',
          //     pointHoverBackgroundColor: config.colors.danger,
          //     pointBorderWidth: 20,
          //     pointHoverRadius: 4,
          //     pointHoverBorderWidth: 15,
          //     pointRadius: 4,

          // console.log(responseData[0].oil.map(item => item.value))
          this.chartOptions = {
            // responsive: true,
            // maintainAspectRatio: false,
            title: {
              display: true,
              text: responseData.map(item => item.name)
            }
          };
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>