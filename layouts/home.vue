<template>
  <div class="wrapper-bg">
    <img class="bg" src="../assets/img/bg_home.png" alt />
    <header-bar />
    <b-container>
      <b-row>
        <b-col sm="12">
          <nuxt />
        </b-col>
      </b-row>
    </b-container>
    <!-- .container -->
  </div>
</template>

<script>
import HeaderBar from "~/components/HeaderBar.vue";

export default {
  components: {
    HeaderBar
  }
};
</script>

<style lang="scss" scoped>
// @import "~/assets/scss/base.scss";

// html,
// #__nuxt,
// #__layout,
// body,
// .bg {
//   width: 100%;
//   height: 100%;
// }

.wrapper-bg {
  position: relative;

  .bg {
    position: fixed;
    right: 0;
  }
  // background-image: url("../assets/img/bg_home.png");
  // background-repeat: no-repeat;
  // background-position: center right;
}
</style>