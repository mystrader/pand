<template>
  <div class="sidebar">
    <ul class="sidebar_menu">
      <li v-for="list in lists" :key="list.link">
        <a :href="list.link" :class="{ active: list.isActive}">
          <img :src="list.img" :alt="list.alt" />
          <span class="sidebar_text">{{ list.text }}</span>
        </a>
      </li>
    </ul>
  </div>
  <!-- /.sidebar -->
</template>

<script>
import { BASE_URL } from "@/services";

export default {
  data() {
    return {
      lists: [
        {
          link: "/exploracao",
          img: require("~/assets/img/ico_explorer.svg"),
          alt: "Seção de Exploração",
          text: "Exploração",
          isActive: false
        },
        {
          link: "/gerenciamento",
          img: require("~/assets/img/ico_gerenciamento.svg"),
          alt: "Seção de Gerenciamento",
          text: "Gerenciamento",
          isActive: false
        }
      ]
    };
  },
  methods: {
    setActive(e) {
      let currentPath = this.$route.fullPath.replace("/", "");
      let navLinks = Array.from(this.lists);

      if (currentPath == "exploracao") {
        navLinks[0].isActive = true;
        navLinks[1].isActive = false;
      } else if (currentPath == "gerenciamento") {
        navLinks[0].isActive = false;
        navLinks[1].isActive = true;
      }
    }
  },
  mounted() {
    this.setActive();
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/base.scss";

.sidebar {
  position: fixed;
  left: 0;
  margin-top: 7px;
  height: 100%;
  width: 110px;
  background: linear-gradient(180deg, #007d5d 0%, #003f2f 100%);
  text-align: center;

  &_menu {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    display: flex;
    flex-flow: column nowrap;

    li {
      a {
        display: block;
        width: 100%;
        padding: 15px 0px;
        -webkit-transition: background 400ms ease-in-out;
        -moz-transition: background 400ms ease-in-out;
        -ms-transition: background 400ms ease-in-out;
        -o-transition: background 400ms ease-in-out;
        transition: background 400ms ease-in-out;

        &:hover {
          background-color: $dark-green;
        }
        &.active {
          background-color: #00562b;
        }
      }

      .sidebar_text {
        color: white;
        margin-top: 11px;
        display: block;
        font-size: 0.813rem;
      }

      img {
        width: 25%;
      }

      &:first-child {
        margin-top: 20px;
      }
    }
  }
}
</style>