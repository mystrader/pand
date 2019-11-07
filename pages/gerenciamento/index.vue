<template>
  <div>
    <h1 class="green mt-5">Gerenciamento</h1>
    <p class="mb-5">Estudo de previsão de curva de óleo por poço.</p>
    <step-bar step-number="looks_one" step-name="Escolha os poços"></step-bar>
    <section id="well-select" class="mb-4">
      <b-form-row>
        <b-col sm="5">
          <label for="select-field">Campo</label>

          <b-form-select id="select-field" v-model="selectedFields">
            <option disabled selected value>Escolha um campo</option>
            <option v-for="field in fields" :key="field.id" :value="field.id">{{ field.name }}</option>
          </b-form-select>
        </b-col>
        <!-- col -->
        <b-col sm="7">
          <label for="select-well">Poço produtor</label>
          <div>
            <multiselect
              @tag="addTag"
              v-model="wellSelectName"
              selectLabel="Pressione 'Enter' para selecionar"
              selectedLabel="Selecionado"
              deselectLabel="Pressione 'Enter' para remover"
              placeholder="Procurar poços"
              label="name"
              :searchable="true"
              track-by="name"
              :options="options"
              :multiple="true"
              :taggable="false"
            >
              <span slot="noResult">Oops! Nenhum elemento encontrado.</span>
              <span slot="noOptions">Oops! Lista vazia.</span>
            </multiselect>
          </div>
        </b-col>
        <!-- col -->
      </b-form-row>
      <!-- row -->
      <b-form inline></b-form>
    </section>
    <!-- /#well-select -->
    <step-bar step-number="looks_two" step-name="Listagem de poços"></step-bar>
    <section id="well-list">
      <b-card no-body class="mb-3" v-for="(card, index) in wellSelectName" :key="card.id">
        <b-card-header
          header-tag="header"
          class="p-4 d-flex align-items-center justify-content-between"
          role="tab"
        >
          <h5 class="well-name green" v-b-toggle="card.name">{{card.name}}</h5>
          <i class="material-icons green well-delete" @click="deleteCard(index)">delete</i>
        </b-card-header>
        <!-- b-card-header -->
        <b-collapse :id="card.name" role="tabpanel">
          <b-card-body>
            <list-inject :idField="card.field_id" @CustomEventInputChanged="doSomenthing" />
            <h4 class="mt-1 mb-4">Treinamento</h4>
            <b-tabs content-class="mt-5 mb-5" align="left">
              <b-tab title="Vazão Bruta" active>
                <training-graph
                  :idwell="card.id"
                  :oilshow="false"
                  :inject-wells="pocosInjetoresSelecionados"
                />
              </b-tab>
              <b-tab title="Vazão de Óleo">
                <training-graph
                  :idwell="card.id"
                  :oilshow="true"
                  :inject-wells="pocosInjetoresSelecionados"
                />
              </b-tab>
            </b-tabs>
            <!--training -->
            <hr class="my-4" />
            <poleo :idwell="card.id" class="mt-4" :lstpocoinject="pocosInjetoresSelecionados"></poleo>
            <!--poleo -->
          </b-card-body>
          <!-- b-card-body -->
        </b-collapse>
        <!-- b-collaps -->
      </b-card>
      <!-- b-card -->
    </section>
    <!-- /#well-list -->
    <button
      type="button"
      class="btn btn-success d-block mx-auto mt-3 mb-5"
      @click="exportAll"
    >Exportar Todos Poços</button>
    <!-- <button type="button" @click="teste">teste clean</button> -->
    <download-csv
      ref="generator"
      :data="exportAllWellSelected"
      name="Lista Todos os Poços.csv"
      style="display: none"
    >Exportar Todos Poços</download-csv>

    <notifications group="group-default" position="bottom right" width="500" />
  </div>
</template>

<script>
import { BASE_URL, api } from "@/services";
import axios from "axios";
import main from "../../plugins/main";
import exportCsv from "../../plugins/exportCsv";
import Notifications from "vue-notification";

import Multiselect from "vue-multiselect";
import StepBar from "~/components/StepBar.vue";
import TrainingGraph from "~/components/TrainingGraph.vue";
import Poleo from "~/components/Poleo.vue";
import ListInject from "~/components/ListInject";
// import Vue from "vue";

export default {
  components: {
    StepBar,
    TrainingGraph,
    Poleo,
    Multiselect,
    ListInject
    // downloadCsv
  },
  data() {
    return {
      selectedFields: "",
      fields: {},
      wells: {},
      wellSelectName: [],
      options: [],
      wells_productors: [],
      pocosSelecionados: [],
      pocosInjetoresSelecionados: [],
      fieldIdSelect: {},
      exportAllWellSelected: []
    };
  },
  methods: {
    doSomenthing(data) {
      this.pocosInjetoresSelecionados = data;
    },

    deleteCard(index) {
      var id = this.wellSelectName[index].id;
      this.wellSelectName.splice(index, 1);
      // for (let i = 0; i < this.wellSelectNam.length; i++) {
      //   var el = this.wellSelectNam[i];
      //   if(i == index)
      //   {
      //     id = el.id;
      //     break;
      //   }
      // }

      const CleanSession = axios.create({
        withCredentials: true
      });

      CleanSession.get(`${BASE_URL}/gerenciamento/CleanSessionWell/` + id).then(
        r => {
          console.log(this.CleanSessionWell);
        }
      );

      // TO DO deletar session por id
    },
    selecionarPocoProdutor(data) {
      const urlListarPocosProdutoresTodos = `${BASE_URL}/gerenciamento/ListarGraficos/`;

      var obj = { id: data.id, pocos: null };
      var that = this;

      api
        .listarPocosProdutores(urlListarPocosProdutoresTodos + data.id)
        // .listarPocosProdutores(CleanSessionWell + data.id)
        .then(r => {
          obj["pocos"] = r.data;
          that.pocosSelecionados.push(obj);
        });
    },
    addTag(newTag) {
      const tag = {
        id: newTag,
        name: newTag
      };
      this.options.push(tag);
      this.value.push(tag);
    },

    async exportAll() {
      // Exportar todos os poços
      let exportAllWell = new Array();

      for (const key in this.wellSelectName) {
        if (this.wellSelectName.hasOwnProperty(key)) {
          const element = this.wellSelectName[key];
          exportAllWell.push(element.id);
        }
      }
      const exportAllWellId = axios.create({
        withCredentials: true
      });
      await exportAllWellId
        .post(`${BASE_URL}/gerenciamento/ExportarPoleo`, {
          well_ids: exportAllWell
        })
        .then(response => {
          // Exportar Todos Poços
          this.exportAllWellSelected = response.data;

          var that = this;

          window["export"] = that;

          setTimeout(function() {
            window["export"].$refs.generator.generate();
          }, 2000);
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    }
  },

  mounted() {
    //  Fetch all primary data
    const allfields = `${BASE_URL}/gerenciamento/ListarCampos/`;
    api.getAllFields(allfields).then(r => {
      this.fields = r.data.fields;
    });
  },
  watch: {
    // Action.: Listwells by fields
    selectedFields(value) {
      const prodwells_by_fields =
        `${BASE_URL}/gerenciamento/ListarPocosProdutores/` + value;
      api.prodwells_by_fields(prodwells_by_fields).then(r => {
        this.wells_productors = r.data;
        this.wells = this.wells_productors.filter(x => x.field_id === value);

        this.options = this.wells.map(item => {
          return {
            field_id: item.field_id,
            id: item.id,
            name: item.name
          };
        });
      });

      // // newObj: Major List filtered by well, return name.
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/base.scss";

.nav-item {
  font-size: 1.4rem;
  font-weight: 400;
  margin-right: 21px;
  &.a {
    padding-bottom: 5px;
  }
}

#well-list {
  .well-name {
    cursor: pointer;
  }
  .well-delete {
    cursor: pointer;
  }
}
</style>