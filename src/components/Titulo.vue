<template>
  <div class="row">
    {{nome}}
    <h2 @click="clicke">Campeonato Brasileiro - Série A - 2018</h2>
  </div>
</template>

<script>
export default {
  props: ["teste"],
  data() {
    return {
      nome: "luciano",
      variavel: null,
    };
  },
  beforeCreate() {
    //criar coisa no this
    //verificar se o usuario está autenticado pra definir configuracoes
    //verificar informacoes no localstorage
    console.log(Object.assign({}, this), "beforeCreate");
  },
  created() {
    //this.variavel = new Date();
    console.log(Object.assign({}, this), "create");
  },
  beforeMount() {
    //this.$attrs['']
    // aqui já tem attrs
    console.log(Object.assign({}, this), "beforeMount");
  },
  mounted() {
    console.log(Object.assign({}, this), "mounted");
  },
  beforeUpdate() {
    console.log(Object.assign({}, this), "beforeUpdate");
  },
  updated() {
    console.log(Object.assign({}, this), "updated");
  },
  beforeDestroy() {
    console.log(Object.assign({}, this), "beforeDestroy");
  },
  destroyed() {
    console.log(Object.assign({}, this), "destroyed");
  },
  methods: {
    clicke() {
      this.nome = "lcvn";
      console.log(this.$parent.visao);
    },
  },
};
</script>