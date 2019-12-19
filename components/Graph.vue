
<script>
import { Line, mixins } from "vue-chartjs";
import axios from "axios";

import zoom from "chartjs-plugin-zoom";

import graphapi from "~/plugins/graphapi";
import ChartAnnotationsPlugin from "chartjs-plugin-annotation";

export default {
  mixins: [mixins.reactiveProp],
  extends: Line,
  props: ["chartData", "options", "vertical"],
  async mounted() {
    this.addPlugin(zoom);

    await this.$watch(
      "chartData",
      (newVal, oldVal) => {
        if (this.chartData)
          this.renderChart(newVal || this.chartData, this.options);
      },
      { immediate: true }
    );
  }
};
</script>

<style lang="scss" scoped>
</style>