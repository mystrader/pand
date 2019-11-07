<template>
  <div class="home">
    <main class="home_main">
      <h1 class="home_title mb-5 green">Bem-vindos</h1>
      <div class="row mb-5">
        <div class="col-12 col-md-8">
          <p>
            Acesse agora o sistema Pandora,
            <strong>sistema gerador de curvas de produção</strong>, esse sistema tem o objetivo de maximizar a rentabilidade dos ativos, suportando a otimização de projetos e promovendo insights para a geração de novas oportunidades.
          </p>
        </div>
        <!-- /.col-12 col-md-8 -->
      </div>
      <!-- /.row -->
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-5" v-for="link in links" :key="link.id">
          <a :href="link.link" class="home_box">
            <div class="home_box_head d-flex align-items-center mb-4 flex-column">
              <img :src="link.img" :alt="link.title" />
              <h3 class="mb-0">{{ link.title }}</h3>
            </div>
            <!-- /.home_box_head -->
            <ul class="pl-3">
              <li class="mb-3" v-for="item in link.items" :key="item.text">{{ item.text }}</li>
            </ul>
          </a>
          <!-- /.home_box -->
        </div>
        <!-- /.col-12 col-md-4 -->
      </div>
      <!-- /.row -->
    </main>
    <!-- /.home_main -->
  </div>
  <!-- .home_bg -->
</template>

<script>
export default {
  layout: "home",

  data() {
    return {
      links: [
        {
          link: "/exploracao",
          img: require("~/assets/img/ico_explorer.svg"),
          title: "Exploração",
          items: [
            { text: "Busca e ranqueamento de zonas de produção" },
            { text: "Geração de curva de longo prazo" }
            // { text: "Análise Econômica" },
            // { text: "Painel de Métricas" }
          ]
        },

        {
          link: "/gerenciamento",
          img: require("~/assets/img/ico_gerenciamento.svg"),
          title: "Gerenciamento",
          items: [{ text: "Geração de curva de curto prazo P_oleo" }]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base.scss";

.home {
  margin-top: 120px;

  &_box {
    display: block;
    background: linear-gradient(180deg, #007d5d 0%, #003f2f 100%);
    padding: 30px 25px;
    border-radius: 5px;
    transition: all ease-in 0.15s;
    border-left: 8px solid #fdc82f;
    min-height: 250px;
    color: white;
    transform: translateY(0);
    @include box-shadow(0px, 0px, 0px, 0px, rgba(0, 0, 0, 0.15));

    &:hover {
      opacity: 0.95;
      transform: translateY(-3px);
      box-shadow: 0px 4px 27px 0 rgba(0, 0, 0, 0.5);
    }
  }

  &_box_head {
    img {
      width: 12%;
    }
  }
}
</style>