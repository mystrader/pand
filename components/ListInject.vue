<template>
  <div>
    <h4 class="mt-3 mb-4">Adição de Injetores</h4>

    <b-row>
      <b-col>
        <div class="head-injectors d-flex justify-content-between align-items-center mt-2 mb-4">
          <b-col sm="12">
            <!-- <h6 class="font-weight-bold green mt-3 mb-4">Injetores (m³/d)</h6> -->
            <div>
              <!-- <label>Listagem dos Injetores (m³/d)</label> -->
              <multiselect
                @tag="addTag"
                @input="selecionarInput"
                @select="selecionarInput"
                v-model="value"
                selectLabel="Pressione 'Enter' para selecionar"
                selectedLabel="Selecionado"
                deselectLabel="Pressione 'Enter' para remover"
                placeholder="Procurar poços injetores"
                label="name"
                :searchable="true"
                track-by="name"
                :options="options"
                :multiple="true"
                :taggable="false"
                :limit="6"
                :limit-text="limitText"
              >
                <span slot="noResult">Oops! Nenhum elemento encontrado.</span>
                <span slot="noOptions">Oops! Lista vazia.</span>
              </multiselect>
            </div>
          </b-col>
        </div>
        <!-- head-injectors -->
      </b-col>
      <!-- col -->
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import main from "../plugins/main";
import { BASE_URL, api } from "@/services";
import Multiselect from "vue-multiselect";
import Vue from "vue";
import Graph from "~/components/Graph.vue";

export default {
  props: {
    idField: [Number, Array, String, Object],
    wellInjectFile: [Number, Array, String, Object]
  },
  components: {
    Multiselect
  },
  data() {
    return {
      options: [],
      value: [],
      wellSelectName: [],
      wellInjectList: []
    };
  },
  mounted() {
    if (this.wellInjectFile) {
      this.value = this.wellInjectFile;
      // this.$parent.$parent.$data.pocosInjetoresSelecionados = this.wellInjectFile;
    } else {
      const WellsInjectById =
        `${BASE_URL}/gerenciamento/ListarPocosInjetores/` + this.idField;

      api.getWellInjectors(WellsInjectById).then(r => {
        this.options = r.data;
      });
    }
  },
  methods: {
    selecionarInput(value, id) {
      var new_value = this.value.map(obj => ({ ...obj, ["value"]: "2000" }));
      this.$parent.$parent.$data.pocosInjetoresSelecionados = new_value;
    },

    limitText(count) {
      return `mais  ${count} poço(s)`;
    },
    addTag(newTag) {
      // return  name for listFiltered
      const tag = {
        id: newTag,
        name: newTag,
        value: newTag
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  },
  watch: {
    // Action.: Listwells by fields
    selectedFields(value) {
      //this.wells = this.wells_productors.filter(x => x.field_id === value);

      // newObj: Major List filtered by well, return name.
      this.options = wellInjectList.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });
    }
  }
};
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
  height: auto;
  padding-left: 20px;
  label {
    color: #008542;
    font-weight: 500;
    font-size: 13px;
  }
  input {
    width: 110px;
  }
}
.selected-injectors::-webkit-scrollbar {
  width: 5px;
}
.selected-injectors::-webkit-scrollbar-track {
  background: #cccccc;
  border-radius: 15px;
}
.selected-injectors::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 15px;
}
</style>