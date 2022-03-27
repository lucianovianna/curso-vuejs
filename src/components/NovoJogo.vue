<template>
  <div>
    <button class="btn btn-primary" @click="criarNovoJogo">Novo Jogo</button>
    <placar-modal
      :time-casa="timeCasa"
      :time-fora="timeFora"
      ref="modal"
    ></placar-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeCasa: null,
      timeFora: null,
      times: this.timesColecao,
    };
  },
  inject: ["timesColecao"],
  methods: {
    criarNovoJogo() {
      console.log(this.$refs); // debug
      let indiceCasa = Math.floor(Math.random() * 20);
      let indiceFora = Math.floor(Math.random() * 20);

      this.timeCasa = this.times[indiceCasa];
      this.timeFora = this.times[indiceFora];

      let modal = this.$refs.modal;
      modal.showModal();
    },
  },
};
</script>