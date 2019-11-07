
<script>
// import VueCharts from "vue-chartjs";
import { Bar, Line, mixins } from "vue-chartjs";
import axios from "axios";
import main from "../plugins/main";
import zoom from "chartjs-plugin-zoom";

import graphapi from "~/plugins/graphapi";

export default {
  mixins: [mixins.reactiveProp],
  extends: Bar,
  props: ["chartData", "options"],

  async mounted() {
    // await this.renderChart(this.chartData, this.options);

    this.addPlugin(zoom);
    //this.resetZoom(zoom);

    await this.$watch(
      "chartData",
      (newVal, oldVal) => {
        if (this.chartData)
          this.renderChart(newVal || this.chartData, this.options);
        // if (!oldVal) { }
      },
      { immediate: true }
    );
  }
};
</script>

<style lang="scss" scoped>
</style>