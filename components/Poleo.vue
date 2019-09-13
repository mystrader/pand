<template>
  <div>
    <h4>Póleo</h4>
    <b-row>
      <b-col>
        <h6 class="head-prediction font-weight-bold green">Parâmetros de predição</h6>
        <b-form-row>
          <b-col sm="4">
            <label for="horizon">Horizonte (Meses)</label>
            <b-input id="horizon" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="curven">Curva de incerteza: N</label>
            <b-input id="curven" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
          </b-col>
          <!-- col -->
          <b-col sm="4">
            <label for="curvesigma">Curva de incerteza: Sigma</label>
            <b-input id="curvesigma" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
          </b-col>
          <!-- col -->
        </b-form-row>
        <!-- form-row -->
      </b-col>
      <!-- col -->
      <b-col>
        <div class="head-injectors d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bold green mb-0">
            Injetores
            <small>(m³/d)</small>
          </h6>
          <div>
            <b-input
              id="inject"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="number"
              placeholder="Selecione os injetores"
            ></b-input>
          </div>
        </div>
        <!-- head-injectors -->
        <b-form-row class="selected-injectors">
          <b-col sm="3" v-for="(item,i) in 10" :key="i">
            <label for="inject">7-NA-12-RJS</label>
            <b-input id="inject" class="mb-2 mr-sm-2 mb-sm-0" type="number"></b-input>
          </b-col>
        </b-form-row>
        <!-- selected-injectors -->
      </b-col>
      <!-- col -->
    </b-row>
    <!-- row -->
    <div class="d-flex justify-content-center">
      <button class="btn btn-success mt-4 mr-2" type="submit">Gerar Póleo</button>
      <button class="btn btn-success mt-4 mr-2" type="submit">Exportar Póleo</button>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>