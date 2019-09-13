
<script>
// import VueCharts from "vue-chartjs";
import { Line, mixins } from "vue-chartjs";
import axios from "axios";

import graphapi from "~/plugins/graphapi";

export default {
  mixins: [mixins.reactiveProp],
  extends: Line,
  props: ["chartData", "options"],

  async mounted() {
    // await this.renderChart(this.chartData, this.options);

    await this.$watch(
      "chartData",
      (newVal, oldVal) => {
        if (!oldVal) {
          this.renderChart(this.chartData, this.options);
        }
      },
      { immediate: true }
    );
  },
  watch: {
    async chartData() {
      await this.$data._chart.update();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>