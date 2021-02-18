<template>
  <div class="container">
    <titulo></titulo>

    <div class="row">
      <div class="col-md-12">
        <novo-jogo :times="times"></novo-jogo>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md-12">
        <tabela-clubes :times="times"></tabela-clubes>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      timeCasa: null,
      timeFora: null,
      visao: "tabela",
      times: [],
    };
  },
  methods: {
    showTabela() {
      this.visao = "tabela";
    },
    showPlacar({ timeCasa, timeFora }) {
      this.timeCasa = timeCasa;
      this.timeFora = timeFora;

      this.visao = "placar";
    },
  },
};
</script>