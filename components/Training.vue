<template>
  <div>
    <h4>Treinamento</h4>
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="Treinar Vazão de Líquidos" active>
        <training-graph  v-on:popularGraficos="receberGraficos" />
      </b-tab>
      <b-tab title="Treinar Vazão de Óleo">
        <training-graph v-on:popularGraficos="receberGraficos" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import TrainingGraph from "~/components/TrainingGraph.vue";

export default {
  components: {
    TrainingGraph
  },
  methods: {
      receberGraficos(data) {
          console.log(data);
      }
  }
};
</script>

<style lang="scss" scoped>
</style>