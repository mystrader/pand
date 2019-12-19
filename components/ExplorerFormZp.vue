<template>
  <div>
    <section id="one_param_search" class="mb-4">
      <b-form>
        <b-row>
          <b-col class="mb-2">
            <b-card-group deck>
              <b-card header="Geologia">
                <b-form-group id="GeologiaGroup">
                  <label for="input-live">Litologia: *</label>
                  <b-form-select
                    v-model="form.litologia"
                    :options="lst_litologia"
                    :state="validation"
                    required
                  ></b-form-select>

                  <label for="input-live">Sistema Deposicional: *</label>
                  <b-form-select
                    v-model="form.sistema_deposicional"
                    :options="lst_sistema_deposicional"
                    required
                    :state="validation"
                  ></b-form-select>

                  <label for="input-live">Formação: *</label>
                  <b-form-select
                    v-model="form.formacao"
                    :state="validation"
                    :options="lst_formacao"
                    required
                  ></b-form-select>

                  <label for="input-live">Idade Geológica: *</label>
                  <b-form-select
                    v-model="form.idade_geologica"
                    :options="lst_idade_geologica"
                    required
                    :state="validation"
                  ></b-form-select>
                </b-form-group>
                <!-- #GeologiaGroup -->
              </b-card>
            </b-card-group>
            <!-- b-card-group / Geologia  -->
          </b-col>
          <!-- col -->

          <b-col sm="12" md="4" class="mb-2">
            <b-card-group deck>
              <b-card header="Reservatório">
                <b-form-group id="reservatorio">
                  <label for="permeabilidade">
                    Permeabilidade (mD):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="Valores entre 0 a 5000"
                    >help</i>
                  </label>
                  <b-form-input
                    id="permeabilidade"
                    v-model="form.permeabilidade"
                    type="number"
                    min="0"
                  ></b-form-input>

                  <label for="porosidade">
                    Porosidade da Zona do Hidrocaborneto (%):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="Valores entre 0 a 50"
                    >help</i>
                  </label>
                  <b-form-input
                    id="porosidade"
                    v-model="form.porosidade"
                    type="number"
                    min="0"
                    max="50"
                  ></b-form-input>

                  <label for="soterramento">
                    Profundidade Soterramento (m):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="Valores entre 0 a 4000"
                    >help</i>
                  </label>
                  <b-form-input
                    id="soterramento"
                    v-model="form.soterramento"
                    type="number"
                    min="0"
                    max="4000"
                  ></b-form-input>

                  <label for="espessura_vertical">
                    Espessura Vertical Óleo (m):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="Valores entre 0 a 380"
                    >help</i>
                  </label>
                  <b-form-input
                    id="espessura_vertical"
                    v-model="form.espessura_vertical"
                    type="number"
                    min="0"
                    max="380"
                  ></b-form-input>

                  <label for="lamina_agua">
                    Lâmina de Água (m):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="Valores entre 0 e 2100"
                    >help</i>
                  </label>
                  <b-form-input
                    id="lamina_agua"
                    v-model="form.lamina_agua"
                    type="number"
                    min="0"
                    max="2100"
                  ></b-form-input>

                  <label for="volume_rocha">
                    Volume Rocha (Milhão m3):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="valores entre 0 e 13000"
                    >help</i>
                  </label>
                  <b-form-input
                    id="volume_rocha"
                    v-model="form.volume_rocha"
                    type="number"
                    min="0"
                    max="13000"
                  ></b-form-input>
                </b-form-group>
              </b-card>
            </b-card-group>
            <!-- b-card-group / Reservatorio  -->
          </b-col>
          <!-- col / Reservatorio -->

          <b-col sm="12" md="4" class="mb-2">
            <b-card-group deck>
              <b-card header="Fluído">
                <b-form-group id="fluido">
                  <label for="input-live">Fluido Principal:</label>
                  <b-form-input id="fluido" v-model="form.fluido" type="text" disabled min="0"></b-form-input>
                  <!-- de inicio seria uma lista mas como só vem um coloquei como o input
                  <b-form-select v-model="form.fluido" :options="lst_fluido_principal"></b-form-select>-->

                  <label for="api">
                    API (gAPI):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="valores entre 10 e 45"
                    >help</i>
                  </label>
                  <b-form-input id="api" v-model="form.api" type="number" min="10" max="45"></b-form-input>

                  <label for="bo_saturacao">
                    Bo Saturação (m3/m3):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="valores entre 1.0 e 2.0"
                    >help</i>
                  </label>
                  <b-form-input id="bo_saturacao" v-model="form.bo_saturacao" type="number" min="0"></b-form-input>

                  <label for="razao_solubilidade">
                    Razão de Solubilidade (m3/m3):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="valores entre 1.0 e 2.0"
                    >help</i>
                  </label>
                  <b-form-input
                    id="razao_solubilidade"
                    v-model="form.razao_solubilidade"
                    type="number"
                    min="0"
                  ></b-form-input>

                  <label for="viscosidade_oleo">
                    Viscosidade do óleo na Psat (cP):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="valores entre 0 e 320"
                    >help</i>
                  </label>
                  <b-form-input
                    id="viscosidade_oleo"
                    v-model="form.viscosidade_oleo"
                    type="number"
                    min="0"
                    max="320"
                  ></b-form-input>

                  <label for="temperatura">
                    Temperatura (ºC):
                    <i
                      class="material-icons system-tips"
                      v-b-tooltip.hover
                      title="valores entre 0 e 250"
                    >help</i>
                  </label>
                  <b-form-input
                    id="temperatura"
                    v-model="form.temperatura"
                    type="number"
                    min="0"
                    max="250"
                  ></b-form-input>
                </b-form-group>
              </b-card>
            </b-card-group>
            <!-- b-card-group / Fluido  -->
          </b-col>
          <!-- col / Fluido -->

          <b-col class="d-flex justify-content-center mt-4 mb-5" md="12">
            <b-button type="submit" @click="onFindZps" variant="success">Buscar ZPs</b-button>
          </b-col>
        </b-row>
      </b-form>
    </section>
    <!-- /#one_param_search -->
  </div>
</template>

<script>
import barramento from "@/barramento";
import axios from "axios";
import main from "../plugins/main";
import { BASE_URL, api } from "@/services";

export default {
  data() {
    return {
      form: {
        litologia: "ARENITO",
        sistema_deposicional: "Turbidítico",
        formacao: "NAMORADO",
        idade_geologica: "",
        permeabilidade: "",
        porosidade: "",
        soterramento: "",
        espessura_vertical: "",
        lamina_agua: "",
        volume_rocha: "",
        fluido: "",
        api: "",
        bo_saturacao: "",
        razao_solubilidade: "",
        viscosidade_oleo: "",
        temperatura: "",
        sigla_zp: []
      },
      lst_litologia: [],
      lst_sistema_deposicional: [],
      lst_fluido: [],
      lst_formacao: [],
      lst_idade_geologica: [],
      listazps: "",
      loadProducts: []
    };
  },
  computed: {
    validation() {
      //return this.form.sistema_deposicional !== "";
      // return this.form.idade_geologica === null || "";
      // return this.form.formacao === null || "";
      // return this.form.litologia === null || "";
    }
    //ISSUE: data for POST :: sendTo
    // emit_formzp() {
    //   barramento.$emit("formZpAll_published", this.form);
    // }
  },
  mounted() {
    this.getFormPrimary();
  },
  created() {
    barramento.$on("onRecalculate__Param_published", lst_recalculatePost => {
      let temp = lst_recalculatePost;
      let lst_formZpAll = this.form;
      // let lst_histogram = temp[0].histograma;
      let lst_rankingzp = temp[1].ranking_zp;
      let lst_formularioalvo = temp[2].formulario_alvo;
      let lst_expcurvatipo = temp[3].exp_curva_tipo;
      let lst_propriedades = temp[4].exp_propriedades;

      //    barramento.$emit("Histogram_published", lst_histogram); // SendTo >  ExplorerCodeQuality.vue
      barramento.$emit("Rankingzp_published", lst_rankingzp); // SendTo > ExplorerRankingZp.vue
      barramento.$emit("Formalvo_published", lst_formularioalvo); // SendTo > Index.vue
      barramento.$emit("Expcurvatipo_published", lst_expcurvatipo); // SendTo > INDEX --> trigger Export button!
      barramento.$emit("Propriedades_published", lst_propriedades); // SendTo > INDEX --> trigger Export button!
      barramento.$emit("formZpAll_published", lst_formZpAll); // SendTo > ExplorerTypeCurve | ISSUE, arguments for post recalculate button!
    });
  },
  methods: {
    getFormPrimary() {
      api
        .getPrimaryDataForm(`${BASE_URL}/exploracao/ListarZp`)
        .then(r => {
          const responseData = r.data;
          //Get List for Form options

          this.lst_litologia = responseData[0].litologia;
          this.lst_sistema_deposicional = responseData[0].deposicional;
          this.form.fluido = responseData[0].fluid;
          this.lst_formacao = responseData[0].formacao;

          this.lst_idade_geologica = responseData[0].idade_geologica.map(
            elem => ({ value: elem.age, text: elem.name })
          );
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    },
    onFindZps(evt) {
      evt.preventDefault();

      axios
        .post(`${BASE_URL}/exploracao/EnviarParametros`, {
          litologia: this.form.litologia,
          sistema_deposicional: this.form.sistema_deposicional,
          formacao: this.form.formacao,
          idade_geologica: parseFloat(this.form.idade_geologica),

          permeabilidade:
            this.form.permeabilidade === ""
              ? 0
              : parseFloat(this.form.permeabilidade),
          porosidade:
            this.form.porosidade === "" ? 0 : parseFloat(this.form.porosidade),
          soterramento:
            this.form.soterramento === ""
              ? 0
              : parseFloat(this.form.soterramento),
          espessura_vertical:
            this.form.espessura_vertical === ""
              ? 0
              : parseFloat(this.form.espessura_vertical),
          lamina_agua:
            this.form.lamina_agua === ""
              ? 0
              : parseFloat(this.form.lamina_agua),
          volume_rocha:
            this.form.volume_rocha === ""
              ? 0
              : parseFloat(this.form.volume_rocha),
          fluido: this.form.fluido,
          api: this.form.api === "" ? 0 : parseFloat(this.form.api),
          bo_saturacao:
            this.form.bo_saturacao === ""
              ? 0
              : parseFloat(this.form.bo_saturacao),
          razao_solubilidade:
            this.form.razao_solubilidade === ""
              ? 0
              : parseFloat(this.form.razao_solubilidade),
          viscosidade_oleo:
            this.form.viscosidade_oleo === ""
              ? 0
              : parseFloat(this.form.viscosidade_oleo),
          temperatura:
            this.form.temperatura === ""
              ? 0
              : parseFloat(this.form.temperatura),
          sigla_zp: this.form.sigla_zp
        })
        .then(response => {
          this.$NotificationSuccess("Parâmetros Enviados com sucesso");
          debugger;
          // SEND lists to other components
          let lst_formZpAll = this.form;
          let lst_histogram = response.data[0].histograma;
          let lst_rankingzp = response.data[1].ranking_zp;
          let lst_formularioalvo = response.data[2].formulario_alvo;
          let lst_expcurvatipo = response.data[3].exp_curva_tipo;
          let lst_propriedades = response.data[4].exp_propriedades;

          barramento.$emit("Histogram_published", lst_histogram); // SendTo >  ExplorerCodeQuality.vue
          barramento.$emit("Rankingzp_published", lst_rankingzp); // SendTo > ExplorerRankingZp.vue
          barramento.$emit("Formalvo_published", lst_formularioalvo); // SendTo > Index.vue
          barramento.$emit("Expcurvatipo_published", lst_expcurvatipo); // SendTo > INDEX --> trigger Export button!
          barramento.$emit("Propriedades_published", lst_propriedades); // SendTo > INDEX --> trigger Export button!
          barramento.$emit("formZpAll_published", lst_formZpAll); // SendTo > ExplorerTypeCurve | ISSUE, arguments for post recalculate button!
        })
        .catch(error => {
          this.$NotificationError(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base.scss";

#one_param_search {
  input,
  select {
    margin-bottom: 1.1rem;
  }
}
</style>