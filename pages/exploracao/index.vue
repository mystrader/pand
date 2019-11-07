<template>
  <div>
    <h1 class="green mt-5">Exploração</h1>
    <p
      class="mb-5"
    >Ferramenta gera curva de produção de longo prazo por meio de declínio exponencial. O perfil da curva é definido utilizando parâmetros de reservatórios análogos</p>
    <step-bar step-number="looks_one" step-name="Parâmetros de busca"></step-bar>

    <section id="explorer-form-zp">
      <explorer-form-zp></explorer-form-zp>
    </section>
    <!-- #explorer-form-zp -->

    <transition name="fade">
      <section id="control-quality" v-show="isShowing">
        <step-bar step-number="looks_two" step-name="Controle de Qualidade"></step-bar>
        <b-card-group deck>
          <b-card header="Distribuição das Propriedades" header-tag="header" class="mb-5">
            <b-row>
              <b-col sm="12" md="6">
                <explorer-control-quality></explorer-control-quality>
              </b-col>
              <b-col sm="12" md="6">
                <explorer-control-quality></explorer-control-quality>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
      </section>
    </transition>

    <!-- #control-quality -->
    <transition name="fade">
      <section id="ExplorerSelectWellProd" v-show="isShowing">
        <step-bar step-number="looks_3" step-name=" Seleção de Zonas de Produção"></step-bar>
        <b-card-group deck>
          <b-card header="Distribuição das Propriedades" header-tag="header" class="mb-5">
            <b-row>
              <b-col sm="12" md="6" class="mb-1">
                <explorer-table-rank></explorer-table-rank>
              </b-col>
              <b-col sm="12" md="6">
                <explorer-type-curve :alvo_properties="formalvo"></explorer-type-curve>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col sm="12">
                <h4 class="mb-3">Alvo</h4>
                <b-row>
                  <b-col sm="2">
                    <label for="qoi">Qoi (m³/d)</label>
                    <b-form-input id="qoi" type="number" v-model="formalvo.input_qoi"></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <label for="tx_declinio">Tx. de declínio</label>
                    <b-form-input
                      id="tx_declinio"
                      type="number"
                      v-model="formalvo.input_tinput_qoix"
                    ></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <label for="tempo">Tempo (anos)</label>
                    <b-form-input id="tempo" type="number" v-model="formalvo.input_tempo"></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <label for="fr">FR (%)</label>
                    <b-form-input disabled id="fr" type="number" v-model="formalvo_static.input_fr"></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <label for="np_poco">NP_Poço</label>
                    <b-form-input
                      disabled
                      id="np_poco"
                      type="number"
                      v-model="formalvo_static.input_np"
                    ></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <label for="poco_injetor">Produtor Injetor</label>
                    <b-form-input
                      disabled
                      id="poco_injetor"
                      type="number"
                      v-model="formalvo_static.input_wellinjetor"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <div class="d-flex justify-content-end mt-5 mb-3">
                  <!-- buttons -->
                  <download-csv
                    class="btn btn-success"
                    :data="lst_expcurvatipo_full"
                    name="Exportar_Curva_Tipo.csv"
                  >Exportar Curva Tipo</download-csv>
                  <download-csv
                    class="btn btn-success ml-3"
                    :data="lst_expcurvatipo_full"
                    name="Exportar_Propriedades.csv"
                  >Exportar Propriedades</download-csv>
                  <!-- buttons -->
                </div>
              </b-col>
            </b-row>
          </b-card>
          <!-- b-card  -->
        </b-card-group>
        <!-- b-card-group  -->
      </section>
      <!-- /#ExplorerSelectWellProd -->
    </transition>
    <notifications group="group-default" position="bottom right" width="500" />
  </div>
</template>

<script>
import Notifications from "vue-notification";

import barramento from "@/barramento";
import { BASE_URL, api } from "@/services";
import StepBar from "~/components/StepBar.vue";

// import exportCsv from "../plugins/exportCsv";
import exportCsv from "../../plugins/exportCsv";

// 1. Parâmetros de busca
import ExplorerFormZp from "~/components/ExplorerFormZp.vue";

// 2. Controle de Qualidade
import ExplorerControlQuality from "~/components/ExplorerControlQuality.vue";

// 3. Seleção de Zonas de Produção
import ExplorerTableRank from "~/components/ExplorerTableRank.vue";
import ExplorerTypeCurve from "~/components/ExplorerTypeCurve.vue";

export default {
  components: {
    StepBar,
    ExplorerFormZp,
    ExplorerControlQuality,
    ExplorerTableRank,
    ExplorerTypeCurve
  },
  data() {
    return {
      isShowing: false,
      listazps: {},
      lst_expcurvatipo_full: [],
      lst_propriedades_full: [],
      lst_formularioalvo: [],
      //values send to Post at componente: ExplorerTypeCurve
      formalvo: {
        input_qoi: "",
        input_tinput_qoix: "",
        input_tempo: ""
      },
      //dont need send values, just show
      formalvo_static: {
        input_fr: "",
        input_np: "",
        input_wellinjetor: ""
      }
    };
  },
  methods: {},
  created() {
    // GET VALUES FROM POST , Component >  ExplorerFromZp.vue
    barramento.$on("Formalvo_published", lst_formularioalvo => {
      // Alvo input values
      this.formalvo.input_qoi = lst_formularioalvo.qoi;
      this.formalvo.input_tinput_qoix = lst_formularioalvo.tx;
      this.formalvo.input_tempo = lst_formularioalvo.tempo;

      this.formalvo_static.input_fr = lst_formularioalvo.fr;
      this.formalvo_static.input_np = lst_formularioalvo.np;
      this.formalvo_static.input_wellinjetor =
        lst_formularioalvo.produtor_injetor;

      // Show the rest of the page after first Post
      if (lst_formularioalvo) {
        this.isShowing = true;
      }
    }),
      //List BUTTON > Export Type Curve
      barramento.$on("Expcurvatipo_published", lst_expcurvatipo => {
        this.lst_expcurvatipo_full = lst_expcurvatipo;
      }),
      //List BUTTON > export Properties
      barramento.$on("Propriedades_published", lst_propriedades => {
        this.lst_propriedades_full = lst_propriedades;
      });
    //graph render
  },
  beforeDestroy() {
    barramento.$off("Formalvo_published");
    barramento.$off("Expcurvatipo_published");
    barramento.$off("Propriedades_published");
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/base.scss";

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>