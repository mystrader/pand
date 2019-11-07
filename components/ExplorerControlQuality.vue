<template>
  <div class="shared_graph_properties">
    <b-form>
      <b-col sm="12">
        <b-form-select
          id="graph_one_properties"
          v-model="lst_graphs_selected"
          :options="result"
          class="mb-3 select-graph"
          @change="filter_by_name"
        >
          <template v-slot:first>
            <option value disabled>-- Selecione uma Opção --</option>
          </template>
        </b-form-select>
        <!-- <graph-bar-line :height="310" :chart-data="rendergraph" :options="chartOptions" /> -->

        <Plotly :data="data" :display-mode-bar="true"></Plotly>
      </b-col>
    </b-form>
  </div>
</template>

<script>
import { Plotly } from "vue-plotly";

import barramento from "@/barramento";
import GraphBarLine from "~/components/GraphBarLine.vue";
export default {
  components: {
    GraphBarLine,
    Plotly
  },
  data() {
    return {
      lst_histogram: [],
      result_full: [],
      result: [],
      xygraph: [],
      rendergraph: {},
      x_value: [],
      y_value: [],
      chartOptions: {},
      lst_graphs_selected: [],
      histogram: {},
      curve: {},
      target: {},
      analogs: {},
      data: []
    };
  },
  methods: {
    //Filter listfull to get data xyz
    filter_by_name(selectedValue) {
      var xygraph = null;
      for (const key in this.result_full) {
        const element = this.result_full[key];
        if (element.hasOwnProperty(selectedValue)) {
          this.xygraph = element;
          this.histogram = {
            x: element[selectedValue][0].histograma,
            name: "Histograma",
            type: "histogram",
            marker: {
              color: "#4547ab"
            }
          };

          this.curve = {
            x: element[selectedValue][1].y_curva,
            y: element[selectedValue][1].x_curva,
            name: "Curva Alvo",
            // text: element,
            // hoverinfo: "text",
            mode: "line",
            line: { shape: "spline" },
            type: "scatter",
            marker: {
              color: "#07078e"
            }
          };

          this.analogs = {
            x: element[selectedValue][2].x_analogos,
            y: element[selectedValue][2].y_analogos,
            name: "Análogos",
            text: element[selectedValue][2].nome_analogos,
            hoverinfo: "text",
            mode: "markers",
            marker: {
              color: "#ab63fa",
              size: 12
            }
          };

          this.target = {
            x: element[selectedValue][3].x_alvo,
            y: element[selectedValue][3].y_alvo,
            name: "Alvo",
            text: element[selectedValue][3].nome_alvo,
            hoverinfo: "text",
            mode: "markers",
            marker: {
              symbol: "cross",
              color: "#ffa500",
              size: 12
            }
          };

          this.data = [];
          this.data.push(this.histogram);
          this.data.push(this.curve);
          this.data.push(this.target);
          this.data.push(this.analogs);
        }
      }
    },
    fillData(x) {}
  },
  created() {
    //Populate input with data filtered of api
    let data = [];
    barramento.$on("Histogram_published", lst_histogram => {
      var lstGlossario = lst_histogram[1].glossario;

      this.result_full = lst_histogram[0];
      this.lst_histogram = lst_histogram[0].map(item => {
        data.push(Object.entries(item)[0]);
      });

      for (const glossario in lstGlossario) {
        const element = lstGlossario[glossario];
        var obj = { value: "", text: "" };
        obj.value = glossario;
        obj.text = element;

        this.result.push(obj);
      }
    });
    //graph render
  },
  beforeDestroy() {
    barramento.$off("Histogram_published");
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base.scss";
.select-graph {
  font-weight: 600;
  font-size: 1.5rem;
  color: $dark-green;
}
</style>