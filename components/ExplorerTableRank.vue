<template>
  <div>
    <h4 class="mb-4">Tabela</h4>
    <b-alert show variant="warning">
      Escolha as opções abaixo para
      <strong>recalculo de Parâmetros.</strong>
    </b-alert>
    <!-- b-alert -->
    <p class="justify-content-end">
      <b-button variant="outline-success" size="sm" @click="selectAllRows">Selecionar tudo</b-button>
      <b-button variant="outline-success" size="sm" @click="clearSelected">Limpar</b-button>
    </p>
    <!-- selectable -->
    <b-table
    ref="selectableTable"
    selectable
    selected-variant="success"
    @row-selected="onRowSelected"
    responsive="sm"
    filterByFormatted: true
    :select-mode="selectMode"
    :items="items"
    :fields="fields"
    />
  </div>
</template>

<script>
import barramento from "@/barramento";
export default {
  data() {
    // var itemsData = { Sigla_ZP: "156", FR: "40", Similaridade: "Macdonald" };
    // itemsData["Qoi (m³/d)"] = "teste";
    return {
      result_to_table: [],
      fields: ["sigla_zp", "fr", "qoi", "similaridade"],
      items: [],
      selectMode: "multi",
      selected: [],
      result_full: [],
      statusPost: 0
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items.map(x => x.sigla_zp);
      let lst_selectedTableZp = this.selected;
      // SendTo >  ExplorerTypeCurve.vue | ISSUE.:  data for button "recalcular parametros"
      barramento.$emit("selected_tablezp_published", lst_selectedTableZp);
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    MountableHead(api_result_full) {
      let result_to_table = [];
      let obj = new Array();

      for (const key in api_result_full) {
        if (api_result_full[key].sigla_zp !== "ZP Alvo") {
          obj.push({
            sigla_zp: api_result_full[key].sigla_zp,
            fr: parseFloat(api_result_full[key].fr).toFixed(3),
            qoi: parseFloat(api_result_full[key].qoi).toFixed(3),
            similaridade: parseFloat(api_result_full[key].similaridade).toFixed(
              3
            )
          });
        }
      }
      this.items = obj;
    }
  },
  updated: function() {
    if (this.statusPost === 0) {
      this.$refs.selectableTable.selectAllRows();
      this.statusPost = 1;
    } else {
    }
  },
  created() {
    this.isBusy = true;
    //Populate input with data filtered of api
    let data = [];
    barramento.$on("Rankingzp_published", lst_rankingzp => {
      this.isBusy = false;
      this.result_full = lst_rankingzp;
      this.MountableHead(this.result_full);
    });
    //graph render
  },
  beforeDestroy() {
    barramento.$off("Rankingzp_published");
  }
  // destroyed() {
  //   this.$refs.selectableTable.selectAllRows();
  // }
};
</script>

<style lang="scss" scoped>
//@import "~/assets/scss/base.scss";
.b-table-row-selected {
  background-color: yellow !important;
}
</style>