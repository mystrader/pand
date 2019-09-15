<template>
  <div>
    <h2 class="green">Gerenciamento</h2>
    <p>Estudo de previsao de curva de oleo por poço.</p>
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
			  @select="selecionarPocoProdutor"
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
      <b-card no-body class="mb-3" v-for="(card, index) in  wellSelectName" :key="card.id">
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
            <training v-on:popularGraficos="receberGraficos"></training>
            <!--training -->
            <hr class="my-4" />
            <poleo class="mt-4"></poleo>
            <!--poleo -->
          </b-card-body>
          <!-- b-card-body -->
        </b-collapse>
        <!-- b-collaps -->
      </b-card>
      <!-- b-card -->
    </section>
    <!-- /#well-list -->
  </div>
</template>

<script>
import { api } from "@/services";

import Multiselect from "vue-multiselect";
import StepBar from "~/components/StepBar.vue";
import Training from "~/components/Training.vue";
import Poleo from "~/components/Poleo.vue";

export default {
  components: {
    StepBar,
    Training,
    Poleo,
    Multiselect
  },
  events: {
    receberGraficos(x,y,z) {
      console.log("x:");
      console.log(x);
      console.log("y:");
      console.log(y);
      console.log("z:");
      console.log(z);
    }
  },
  data() {
    return {
      selectedFields: "",
      fields: {},
      wells: {},
      value: [],
      wellSelectName: [],
      options: [],
	  wells_productors: {},
	  pocosSelecionados:[]
    };
  },
  methods: {
    deleteCard(index) {
      this.wellSelectName.splice(index, 1);
	},
	selecionarPocoProdutor(data) {
		const urlListarPocosProdutoresTodos = "http://localhost:8000/gerenciamento/ListarGraficos/";

		var obj = { id: data.id, pocos:null };

		var that = this;

		api.listarPocosProdutores(urlListarPocosProdutoresTodos + data.id).then(r => {
				obj["pocos"] = r.data;
				that.pocosSelecionados.push(obj);				
				console.log("Emitir o Evento popularGraficos");
				that.$emit("popularGraficos",obj);
		});
	},
    addTag(newTag) {
      // return  name for listFiltered
      const tag = {
        id: newTag,
        name: newTag
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  },
  mounted() {
    //  Fetch all primary data
    const allfields =
      "http://www.json-generator.com/api/json/get/cjUVYnbvNe?indent=2";
    const prodwells_by_fields =
      "http://www.json-generator.com/api/json/get/ceKPoEkdCG?indent=2";

    api.getAllFields(allfields).then(r => {
      this.fields = r.data.fields;
    });

    api.prodwells_by_fields(prodwells_by_fields).then(r => {
      this.wells_productors = r.data;
    });
  },
  watch: {
    // Action.: Listwells by fields
    selectedFields(value) {
      this.wells = this.wells_productors.filter(x => x.field_id === value);

      // newObj: Major List filtered by well, return name.
      this.options = this.wells.map(item => {
        return {
          field_id: item.field_id,
          id: item.id,
          name: item.name
        };
      });
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/base.scss";

#well-list {
  .well-name {
    cursor: pointer;
  }
  .well-delete {
    cursor: pointer;
  }
}
</style>