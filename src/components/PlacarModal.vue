<template>
  <modal ref="modal">
    <h5 slot="header" class="modal-title">Novo Jogo</h5>
    <form slot="body" class="form-inline">
      <input type="text" class="form-control col-md-1" v-model="golsCasa" />

      <clube :time="timeCasa" invertido="false" v-if="timeCasa"></clube>

      <span
        ><img
          src="https://freepikpsd.com/wp-content/uploads/2019/10/letra-x-png-2-1-Transparent-Images.png"
          width="14"
          height="14"
          alt="X"
      /></span>

      <clube :time="timeFora" invertido="true" v-if="timeFora"></clube>

      <input type="text" class="form-control col-md-1" v-model="golsFora" />
    </form>
    <div slot="footer">
      <button type="button" class="btn btn-secondary" @click="closeModal()">
        Fechar
      </button>
      <button type="button" class="btn btn-primary" @click="fimJogo">
        Fim de Jogo
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  props: ["timeCasa", "timeFora"],
  data() {
    return {
      golsCasa: 0,
      golsFora: 0,
    };
  },
  methods: {
    showModal() {
      console.log(this.$el);
      this.getModal().show();
    },
    closeModal() {
      this.getModal().close();
    },
    getModal() {
      return this.$refs.modal;
    },
    fimJogo() {
      var golsMarcados = parseInt(this.golsCasa);
      var golsSofridos = parseInt(this.golsFora);

      this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);

      this.closeModal();
    },
  },
};
</script>
