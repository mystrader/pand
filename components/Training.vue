<template>
  <div>
    <h4>Treinamento</h4>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="Treinar Vazão de Líquidos" active>
        <training-graph />
      </b-tab>
      <b-tab title="Treinar Vazão de Óleo">
        <training-graph />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import TrainingGraph from "~/components/TrainingGraph.vue";

export default {
  components: {
    TrainingGraph
  }
};
</script>

<style lang="scss" scoped>
</style>