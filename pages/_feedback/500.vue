<template>
  <div>
    <section class="animated animatedFadeInUp fadeInUp">
      <div class="container pos-vertical-center">
        <div class="row mt-5">
          <div class="col-md-8 mt-5 feedbackpage">
            <img :src="require(`@/assets/img/500.svg`)" />
          </div>

          <div class="col-md-4">
            <h1 class="h1--large mt-2">500</h1>
            <p class="lead">Ocorreu um erro inesperado impedindo o carregamento da página</p>

            <button class="btn btn-success btn-lg mt-4" @click.prevent="handleBack('@/')">
              <!-- <i class="material-icons">keyboard_arrow_left</i> -->
              <span>Voltar para página</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { BASE_URL } from "@/services";
export default {
  methods: {
    handleBack(fallback) {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.feedbackpage {
  margin-top: 153px;
  text-align: center;
}
h1 {
  font-size: 10rem;
  color: #008542;
}
.lead {
  font-size: 2rem;
}
section {
  margin-top: 166px;
}

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: both;
}

.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}
</style>