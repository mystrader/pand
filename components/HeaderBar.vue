<template>
  <header class="header_bar d-flex justify-content-between align-items-center">
    <a class="header_link" href="/">
      <img src="~/assets/img/logo_pandora.svg" alt="Logo Pandora" />
    </a>
    <img class="header_link img-fluid" src="~/assets/img/logo_petro.svg" alt="Logo Petrobras" />
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header_bar {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 10px 15px;
  z-index: 1000;

  .header_link {
    &:last-child {
      width: 10%;
    }
  }
}
</style>