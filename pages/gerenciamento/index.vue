<template>
  <div>
    <h1 class="green mt-5">Gerenciamento</h1>
    <p class="mb-5">Estudo de previsão de curva de óleo por poço.</p>

    <step-bar step-number="folder_open" step-name="Carregar poços (opcional)"></step-bar>
    <b-row class="mb-4 loadfile" align-v="center">
      <b-col cols="5">
        <input ref="myFile" type="file" id="files" name="files" v-on:change="parse" />
      </b-col>

      <b-col cols="1" align-v="center">
        <svg
          width="25"
          height="90"
          viewBox="0 0 25 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L23 45L1 89" stroke="#00562B" stroke-opacity="0.3" stroke-width="2" />
        </svg>
      </b-col>

      <b-col cols="6" align-v="center">
        <div v-if="fileReadResult">
          <label>
            Nome:
            <br />
            <h5>{{ fileReadResult.study_name }}</h5>
          </label>

          <label>
            Data:
            <br />
            <h5>{{ fileReadResult.export_date }}</h5>
          </label>

          <label md="12">
            Descrição:
            <br />
            <h5>{{ fileReadResult.description }}</h5>
          </label>
          <b-button variant="success" @click="postLoadStudy" block>Carregar Estudo</b-button>
        </div>
        <div v-else>
          <svg
            width="520"
            height="129"
            viewBox="0 0 520 129"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="51" height="20" fill="#ECECEC" />
            <rect y="24" width="208" height="26" fill="#ECECEC" />
            <rect x="225" width="51" height="20" fill="#ECECEC" />
            <rect x="225" y="24" width="208" height="26" fill="#ECECEC" />
            <rect y="64" width="73" height="20" fill="#ECECEC" />
            <rect y="88" width="520" height="41" fill="#ECECEC" />
          </svg>
        </div>
      </b-col>
    </b-row>

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

    <!-- <pre>
      {{wellSelectName}}
    </pre>-->

    <section id="well-list">
      <b-card no-body class="mb-3" v-for="(card, index) in wellSelectName" :key="card.id">
        <b-card-header
          header-tag="header"
          class="p-4 d-flex align-items-center justify-content-between"
          role="tab"
        >
          <h5 class="well-name green" v-b-toggle="card.name">{{ card.name }}</h5>
          <i class="material-icons green well-delete" @click="deleteCard(index)">delete</i>
        </b-card-header>
        <!-- b-card-header -->
        <b-collapse :id="card.name" role="tabpanel">
          <b-card-body>
            <list-inject
              :idField="card.field_id"
              @CustomEventInputChanged="doSomenthing"
              :wellInjectFile="card.inject_wells_file"
            />
            <h4 class="mt-1 mb-4">Treinamento de Vazão</h4>
            <b-tabs content-class="mt-5 mb-5" align="left">
              <b-tab title="Bruta" active>
                <template v-slot:title>
                  <i class="material-icons fix-icon-pos-tab">insert_chart_outlined</i>
                  <strong>Bruta</strong>
                </template>
                <training-graph
                  :idwell="card.id"
                  :idField="card.field_id"
                  :type="1"
                  :inject-wells="pocosInjetoresSelecionados"
                  :liquid_file="card.liquid"
                />
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <i class="material-icons fix-icon-pos-tab">insert_chart_outlined</i>
                  <strong>Óleo</strong>
                </template>
                <training-graph
                  :idwell="card.id"
                  :idField="card.field_id"
                  :type="2"
                  :inject-wells="pocosInjetoresSelecionados"
                  :oil_file="card.oil"
                />
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <i class="material-icons fix-icon-pos-tab">insert_chart_outlined</i>
                  <strong>Gás</strong>
                </template>
                <training-graph
                  :idwell="card.id"
                  :idField="card.field_id"
                  :type="3"
                  :inject-wells="pocosInjetoresSelecionados"
                  :gas_file="card.gas"
                />
              </b-tab>
            </b-tabs>
            <!--training -->
            <hr class="my-4" />
            <!-- usei o oil como prop mas poderia ser qualquer outro para preencher os dados internos  -->
            <poleo
              :idwell="card.id"
              class="mt-4"
              :lstpocoinject="pocosInjetoresSelecionados"
              :wellInjectFile="card.inject_wells_file"
            ></poleo>
            <!--poleo -->
          </b-card-body>
          <!-- b-card-body -->
        </b-collapse>
        <!-- b-collaps -->
      </b-card>
      <!-- b-card -->
    </section>
    <!-- /#well-list -->

    <b-row>
      <b-col class="d-flex justify-content-center mt-4 mb-5">
        <b-button
          v-b-modal.modal
          @click="fillInfoWells"
          variant="success"
          class="mr-3"
        >Salvar Estudo</b-button>
        <b-modal
          id="modal"
          ok-title="Salvar Estudo"
          cancel-title="Cancelar"
          hide-header
          @ok="postStudy"
        >
          <b-form>
            <b-form-group id="input-group-2" label="Nome do Arquivo" label-for="input-2">
              <b-form-input id="study_name" v-model="form_study.study_name" required></b-form-input>
            </b-form-group>
            <b-form-group class="mb-0" label="Descrição">
              <b-form-textarea id="descr_estudy" v-model="form_study.description" required></b-form-textarea>
            </b-form-group>
          </b-form>
        </b-modal>
        <!-- End: Save Study -->

        <download-csv
          ref="generator"
          :data="exportAllWellSelected"
          name="Lista Todos os Poços.csv"
          style="display: none"
        >Exportar Todos Poços</download-csv>
        <b-button variant="success" @click="exportAll">Exportar Todos Poços</b-button>

        <!-- End: export All -->
      </b-col>
    </b-row>
    <notifications group="group-default" position="bottom right" width="500" />
  </div>
</template>

<script>
import { BASE_URL, api } from "@/services";
import axios from "axios";

import main from "../../plugins/main";
import exportCsv from "../../plugins/exportCsv";
import Notifications from "vue-notification";
import { uuid } from "vue-uuid";

import { saveAs } from "file-saver";

import Multiselect from "vue-multiselect";
import StepBar from "~/components/StepBar.vue";
import TrainingGraph from "~/components/TrainingGraph.vue";
import Poleo from "~/components/Poleo.vue";
import ListInject from "~/components/ListInject";
import barramento from "@/barramento";
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
      exportAllWellSelected: [],
      uuid: uuid.v1(),
      form_study: {
        well_ids: [],
        training_ids: [],
        study_name: "",
        description: "",
        export_date: this.makeDate()
      },
      fileReadResult: "",
      showObject: ""
    };
  },
  methods: {
    parse() {
      var reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(this.$refs.myFile.files[0]);
    },
    onReaderLoad(event) {
      this.fileReadResult = JSON.parse(event.target.result);
    },
    makeDate() {
      var date = new Date();
      var dia = date.getDate();
      var mes = date.getMonth();
      var ano4 = date.getFullYear();
      var str_data = ano4 + "-" + (mes + 1) + "-" + dia;
      return str_data;
    },
    doSomenthing(param) {
      this.pocosInjetoresSelecionados = param;
    },
    deleteCard(index) {
      var id = this.wellSelectName[index].id;
      this.wellSelectName.splice(index, 1);
      const CleanSession = axios.create({
        withCredentials: true
      });

      CleanSession.get(
        `${BASE_URL}/gerenciamento/ClearSession/` +
          localStorage.getItem("training_id") +
          "-" +
          id
      ).then(r => {});
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
    makeInfoWells() {
      let exportAllWell = new Array();
      let exportAllWellTrainingId = new Array();
      let trainingId = localStorage.getItem("training_id");

      for (const key in this.wellSelectName) {
        if (this.wellSelectName.hasOwnProperty(key)) {
          const element = this.wellSelectName[key];
          exportAllWell.push(element.id);
          exportAllWellTrainingId.push(trainingId + "-" + element.id);
        }
      }
      this.form_study.well_ids = exportAllWell;
      this.form_study.training_ids = exportAllWellTrainingId;
    },
    fillInfoWells() {
      //fill object with: well_ids and training_ids to post -> saveStudy
      this.makeInfoWells();
    },
    exportToJsonFile(obj) {
      var FileSaver = require("file-saver");
      let dataStr = JSON.stringify(obj);
      let name_file = this.form_study.study_name + ".study";
      var blob = new Blob([dataStr], {
        type: "data:application/json;charset=utf-8"
      });
      FileSaver.saveAs(blob, name_file);
    },
    postStudy(bvModalEvt) {
      bvModalEvt.preventDefault();
      //this.exportToJsonFile();
      const ModelARSaveWorkout = axios.create({
        withCredentials: true
      });
      ModelARSaveWorkout.post(`${BASE_URL}/gerenciamento/ModelARSaveWorkout`, {
        well_ids: this.form_study.well_ids,
        training_ids: this.form_study.training_ids,
        study_name: this.form_study.study_name,
        description: this.form_study.description,
        export_date: this.form_study.export_date
      })
        .then(response => {
          this.exportToJsonFile(response.data);
          this.$NotificationSuccess("Arquivo Salvo na sua máquina");
          // this.$refs.modal.hide();
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    },
    postLoadStudy() {
      //console.log(this.fileReadResult.studies)

      // SET NEW UID FROM FILE
      var NEW_UID = String(
        Object.keys(this.fileReadResult.studies[0])
      ).substring(0, 36);
      localStorage.setItem("training_id", NEW_UID);

      const ModelARLoadWorkout = axios.create({
        withCredentials: true
      });
      ModelARLoadWorkout.post(`${BASE_URL}/gerenciamento/ModelARLoadWorkout`, {
        //@TODO: Atributos que vou pegar do arquivo ...
        study_name: this.fileReadResult.study_name,
        export_date: this.fileReadResult.export_date,
        description: this.fileReadResult.description,
        studies: this.fileReadResult.studies
      })
        .then(response => {
          this.showObject = response;
          this.$NotificationSuccess("Estudo Carregado com sucesso");
          this.fileReadResult.studies;

          // var filePost = "marcus";
          // barramento.$emit("filePost", filePost); // SendTo > trainingGraph.vue

          //ROUTER to load data from upload file.
          this.wellSelectName = response.data.wells.map(function(elem, index) {
            return {
              id: elem.id,
              name: elem.name,
              inject_wells_file: elem.injection_wells,
              liquid: elem.liquid,
              oil: elem.oil,
              gas: elem.gas
            };
          });
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    },
    async exportAll() {
      this.makeInfoWells();
      const exportAllWellId = axios.create({
        withCredentials: true
      });
      // Exportar todos os poços
      await exportAllWellId
        .post(`${BASE_URL}/gerenciamento/ModelARExport`, {
          well_ids: this.form_study.well_ids,
          training_ids: this.form_study.training_ids
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
    this.$KillLocalStorageTraining("training_id");
    localStorage.setItem("training_id", this.uuid);
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

        // populate
        this.options = this.wells.map(item => {
          return {
            field_id: item.field_id,
            id: item.id,
            name: item.name
          };
        });

        //BACKUP: training_id: this.uuid + "-" + item.id

        // Set value for create training unique id.
        //   localStorage.setItem("training_id", this.options[1].training_id);
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

.loadfile input[type="button"] {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

.loadfile label {
  margin-right: 25px;
}
</style>
