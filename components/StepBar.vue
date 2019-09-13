<template>
  <div class="titlebar">
    <h5 class="mb-0">
      <i class="material-icons">{{ stepNumber }}</i>
      {{ stepName }}
    </h5>
  </div>
</template>

<script>
export default {
  props: ["stepNumber", "stepName"]
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base.scss";

.titlebar {
  padding: 15px;
  background-color: $dark-green;
  margin-bottom: 30px;
  border-radius: 6px;

  h5 {
    color: white;
    font-weight: 500;
  }

  i {
    color: white;
    position: relative;
    top: 5px;
  }
}
</style>