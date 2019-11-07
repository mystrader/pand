<template>
  <div>
    <header-bar />
    <b-container>
      <sidebar class="hidden-sm-down" />
      <b-row class="mt-5">
        <b-col sm="12">
          <nuxt />
        </b-col>
      </b-row>
    </b-container>
    <!-- .container -->
  </div>
</template>

<script>
import Sidebar from "~/components/Sidebar.vue";
import HeaderBar from "~/components/HeaderBar.vue";

export default {
  components: {
    Sidebar,
    HeaderBar
  },
  methods: {
    teste() {
      console.log("variável de ambiente é", process.env.BASE_URL);
    }
  },
  created() {
    this.teste();
  }
};
</script>


